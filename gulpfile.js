
let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin');
	concat = require('gulp-concat');

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

gulp.task('html', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src('app/js/main.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());
})

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

gulp.task('imagemin', function(){
	return gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img-min/'))
});

gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/*.html', gulp.parallel('html'));
	gulp.watch('app/js/**/*.js', gulp.parallel('js'));
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('default', gulp.parallel('scss', 'libs-js', 'browser-sync', 'watch'));