$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    $('.b-main-slider').slick({
        dots: true,
        dotsClass: "my-dots",
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000
    });

    $(".b-btn-tab").click(function() {
        var $this = $(this);
        $(".b-btn-tab.active").removeClass("active");
        $this.addClass("active");
        $(".b-cabinet-orders").each(function(){
            $(this).addClass("hide");
        });
        $($this.attr("data-block")).removeClass("hide");
        return false;
    });

    $('.b-product-photo-slider').slick({
        dots: false,
        arrows: true,
        prevArrow: '<div class="b-product-arrows icon-arrow-left"></div>',
        nextArrow: '<div class="b-product-arrows icon-arrow-right"></div>',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true
    });

    $(".colors-select").chosen({
        width: "193px",
        disable_search_threshold: 10000
    });

    $(".more-colors").click(function() {
        if($(".texture-list").hasClass("open")){
            $(".texture-list").removeClass("open");
            $(this).text("Другие цвета");
        }else{
            $(".texture-list").addClass("open");
            $(this).text("Скрыть");
        }
        return false;
    });

    var maxBasketCount = 99;
    //увеличить количество
    $('.quantity-add').on('click', function(){
        var $input = $('.quantity-input');
        var count = parseInt($input.val()) + 1;
            count = (count > maxBasketCount || isNaN(count) === true) ? maxBasketCount : count;
        $input.val(count).change();
        return false;
    });
    //уменьшить количество
    $('.quantity-reduce').on('click', function(){
        var $input = $('.quantity-input');
        var count = parseInt($input.val()) - 1; 
            count = (count < 1 || isNaN(count) === true) ? 1 : count;
        $input.val(count).change();
        return false;
    });
    $('.quantity-input').on('change', function(){
        var count = $(this).val()*1;
        count = (count < 1)? 1 : count;
        count = (count > maxBasketCount) ? maxBasketCount : count;
        $(this).val(count);
    });

    // $(".b-card-top").height($(".b-card-top").width());


    // $(".b-step-slider").slick({
    //     dots: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     infinite: true,
    //     cssEase: 'ease', 
    //     speed: 500,
    //     arrows: true,
    //     prevArrow: '<button type="button" class="slick-prev slick-arrow icon-arrow-left"></button>',
    //     nextArrow: '<button type="button" class="slick-next slick-arrow icon-arrow-right"></button>',
    //     touchThreshold: 100
    // });

    // // Первая анимация элементов в слайде
    // $(".b-step-slide[data-slick-index='0'] .slider-anim").addClass("show");

    // // Кастомные переключатели (тумблеры)
    // $(".b-step-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //     $(".b-step-tabs li.active").removeClass("active");
    //     $(".b-step-tabs li").eq(nextSlide).addClass("active");
    // });

    // // Анимация элементов в слайде
    // $(".b-step-slider").on('afterChange', function(event, slick, currentSlide, nextSlide){
    //     $(".b-step-slide .slider-anim").removeClass("show");
    //     $(".b-step-slide[data-slick-index='"+currentSlide+"'] .slider-anim").addClass("show");
    // });


    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

});