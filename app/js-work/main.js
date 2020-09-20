$(document).ready(function(){
    var $page = $('html, body');

    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
    });

    $('.slider').slick({
        infinite: true,
        arrows: false,
        //lazyLoad: 'ondemand',
        
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 700,
        fade: true,
        cssEase: 'linear'
    });

    $('.burger').click(function(){
        $('.burger, .menu-container, .burger__top, .burger__center, .burger__bot ').toggleClass('active');
        $('body').toggleClass('lock');
        $('.banner').toggleClass('hide');
    });
});


