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
        lazyLoad: 'ondemand',
        
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 700,
        fade: true,
        cssEase: 'linear'
    });
});


