
let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin');
	concat = require('gulp-concat');


/**********
 * 
 * 
 *  Подключение live reload,
 *  Подключение слежения
 * 
 * 
 **********/


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function() {
	gulp.watch('app/*.html', gulp.parallel('html'));
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/js-work/**/*.js', gulp.parallel('js'));
});


/**********
 * 
 * 
 *  Рабочие таски
 * 
 * 
 **********/


gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.stream());
});

gulp.task('scss', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))

	.pipe(autoprefixer({
		overrideBrowserslist:['ie >= 8', 'last 4 version']
	}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('libs-js', function() {
	return gulp.src(
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
	)
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src('app/js-work/main.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());
})


/**********
 * 
 * 
 *  Запуск default таска
 *  Запуск prodact таска
 * 
 * 
 **********/
 
gulp.task('default', gulp.parallel('scss', 'libs-js', 'js', 'watch',  'browser-sync'));

gulp.task('prodaction', function(){
	return gulp.src([ // Выбираем нужные файлы
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/img/**/*',
		'app/**/*.html',
		'app/font/**/*',
		'app/svg/**/*'
		], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(gulp.dest('dist')) // Выгружаем в папку с финальной сборкой
});