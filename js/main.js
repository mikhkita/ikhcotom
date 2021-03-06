$(document).ready(function(){

    var isDesktop = false,
        isTablet = false,
        isMobile = false,
        isMobileSmall = false;

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

        isDesktop = isTablet = isMobile = isMobileSmall = false;
        if( myWidth > 1188 ){
            isDesktop = true;
        }else if( myWidth > 767 ){
            isTablet = true;
        }else{
            isMobile = true;
            if(myWidth < 664){
                isMobileSmall = true;
            }
        }

        if(isMobile){
            if($(".b-product-content .b-product-name").length){
                $(".b-product").prepend($(".b-product-actions-wrap"));
                $(".b-product").prepend($(".b-product-name"));
            }
        }else{
            if(!$(".b-product-content .b-product-name").length){
                $(".b-product-content").prepend($(".b-product-actions-wrap"));
                $(".b-product-content").prepend($(".b-product-name"));
            }
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

    $(".after-load").removeClass("after-load");

    $('.b-product-main').slick({
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.b-product-photo-slider',
        swipe: false
    });

    $('.b-product-photo-slider').slick({
        dots: false,
        arrows: true,
        prevArrow: '<div class="b-product-arrows icon-arrow-left-bold"></div>',
        nextArrow: '<div class="b-product-arrows icon-arrow-right-bold"></div>',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        variableWidth: true,
        asNavFor: '.b-product-main',
        focusOnSelect: true,
        responsive: [
            {
              breakpoint: 1188,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 5
              }
            },
            {
              breakpoint: 665,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 374,
              settings: {
                slidesToShow: 3
              }
            }
        ]
    });

    $('.b-item-cards').slick({
        dots: false,
        arrows: true,
        prevArrow: '<div class="icon-arrow-left" style="cursor: pointer; position: absolute; top: calc(50% - 23px); font-size: 40px; left: -42px;"></div>',
        nextArrow: '<div class="icon-arrow-right" style="cursor: pointer; position: absolute; top: calc(50% - 23px); font-size: 40px; right: -38px;"></div>',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

     $('.b-im-block').slick({
        dots: false,
        arrows: true,
        prevArrow: '<div class="icon-arrow-left" style="cursor: pointer; position: absolute; top: calc(50% - 34px); font-size: 70px; right: calc(100% - 150px); z-index: 100";></div>',
        nextArrow: '<div class="icon-arrow-right" style="cursor: pointer; position: absolute; top: calc(50% - 34px); font-size: 70px; right: calc(0% + 150px);"></div>',
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: false,
        focusOnSelect: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    variableWidth: false,
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    variableWidth: false,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 450,
                settings: {
                    variableWidth: false,
                    slidesToShow: 2
                }
            }
        ]
    });

    $(".b-show-more").click(function(){
        $(this).addClass("hidden");
        $(this).parents('.filter-list').find('.b-more-tabs').addClass("visible");
    });

    $(".b-item-cards.slick-slider").find(".b-item-card").each(function(){
        var $height = $(this).parents(".slick-track").innerHeight();
        $(this).innerHeight($height);
    })
    $('.b-catalog-list').find(".b-item-card").each(function(){
        var $index = $(this).index() + 1,
            $height = $(this).height(),
            $count = $(this).parents('.b-catalog-list').find('.b-item-card').length;

        if ($index == 1) {
            $maxHeight = 0;
        }

        if ($height > $maxHeight) {
            $maxHeight = $height;
        }

        if ($index % 3 == 0) {
            $('.b-catalog-list .b-item-card:nth-child('+$index+')').height($maxHeight);
            $('.b-catalog-list .b-item-card:nth-child('+($index - 1)+')').height($maxHeight);
            $('.b-catalog-list .b-item-card:nth-child('+($index - 2)+')').height($maxHeight);
            $maxHeight = 0;
        } else {
            if (($count - $index) == 0) {
                while($index % 3 != 0){
                    $('.b-catalog-list .b-item-card:nth-child('+$index+')').height($maxHeight);
                    $index = $index - 1;
                }
            }
        }

        // console.log($('.b-catalog-list .b-item-card').length);

    })

    $(".b-item-card .b-card-fav").click(function(e){
    e.preventDefault();
        if ($(this).hasClass("active")){
           $(this).removeClass("active"); 
        }else{
            $(this).addClass("active"); 
        }
    });

    $(".b-main-article").click(function(){
        window.location = $(this).find(".article-link").attr("href");
    });

    $('.b-product-photo-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $(".b-product-main-color a.show").removeClass("show");
        $(".b-product-main-color").removeClass("show");
    });

    function showPhotoColor(id) {
        $(".b-product-main-color a.show").removeClass("show");
        $(".b-product-main-color").addClass("show");
        $(".b-product-main-color a[data-color-id='"+id+"']").addClass("show");
    }

    if($(".colors-select").length){
        $(".colors-select").chosen({
            width: "193px",
            disable_search_threshold: 10000
        });
        $('.colors-select').on('change', function(){
            var id = Number($(this).find(":selected").attr("data-color-id"));
            $(".texture-list img.active").removeClass("active");
            $(".texture-list img[data-color-id='"+id+"']").addClass("active");
            if(id > 10 && !$(".texture-list").hasClass("open")){
                $(".more-colors").click();
            }
            showPhotoColor(id);
        });
    }

    $(".texture-list img").click(function(){
        var id = Number($(this).attr("data-color-id"));
        $(".texture-list img.active").removeClass("active");
        $(this).addClass("active");
        $(".colors-select option[data-color-id='"+id+"']").prop('selected', true);
        $('.colors-select').change().trigger('chosen:updated');
        showPhotoColor(id);
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

    $(".show-more").click(function() {
        var $block = $(this).parents(".b-filter-toggle").find(".b-filter-more");
        if($block.hasClass("open")){
            $block.removeClass("open");
            $(this).text("смотреть больше");
        }else{
            $block.addClass("open");
            $(this).text("скрыть");
        }
        return false;
    });

    var maxBasketCount = 999;
    //увеличить количество
    $('.b-product-quantity .quantity-add').on('click', function(){
        var $input = $('.quantity-input');
        var count = parseInt($input.val()) + 1;
        count = (count > maxBasketCount || isNaN(count) === true) ? maxBasketCount : count;
        $input.val(count).change();
        return false;
    });
    //уменьшить количество
    $('.b-product-quantity .quantity-reduce').on('click', function(){
        var $input = $('.quantity-input');
        var count = parseInt($input.val()) - 1; 
        count = (count < 1 || isNaN(count) === true) ? 1 : count;
        $input.val(count).change();
        return false;
    });

    $('.b-product-quantity .quantity-input').on('change', function(){
        var count = $(this).val()*1;
        count = (count < 1)? 1 : count;
        count = (count > maxBasketCount) ? maxBasketCount : count;
        $(this).val(count);
    });

    //табы
    $(".tab").click(function(){
        var $this = $(this);
        $this.parent().find(".tab.active").removeClass("active");
        $this.addClass("active");
        $(".tabs-content").each(function(){
            $(this).addClass("hide");
        });
        $($this.attr("data-block")).removeClass("hide");
        return false;
    });

    $(".rating").hover(function() {
        $(this).addClass("now-hover");
    }, function() {
        $(this).removeClass("now-hover");
    });

    $(".rating-star").hover(function() {
        $(this).addClass("highlight-h");
        $(this).prevAll(".rating-star").addClass("highlight-h");
    }, function() {
        $(this).removeClass("highlight-h");
        $(this).prevAll(".rating-star").removeClass("highlight-h");
    });

    $(".rating-star").click(function() {
        var $this = $(this);
        //здесь будет ajax-запрос
        $this.parent().find(".rating-star").each(function() {
            $(this).removeClass("highlight");
        });
        $this.addClass("highlight");
        $this.prevAll(".rating-star").addClass("highlight");
    });

    if( typeof autosize == "function" )
        autosize(document.querySelectorAll('textarea'));

    $(".go-tab").click(function() {
        $($(this).attr("data-tab")).click();
        $("body, html").animate({scrollTop : $(".b-detail-tabs").offset().top-20}, 300);
        return false;
    });

    $(".b-filter-item").each(function() {
        if(!$(this).hasClass("open")){
            $(this).children(".b-filter-toggle").slideUp(0);
        }
    });
    $(".b-filter-tab").click(function() {
        if(!$(this).hasClass("sliding")){
            var $this = $(this);
            $this.addClass("sliding");
            if($this.parent().hasClass("open")){
                $this.parent().removeClass("open");
                $this.parents(".b-filter-item").find(".b-filter-toggle").slideUp(300, function(){
                    $this.removeClass("sliding");
                });
            }else{
                $this.parent().addClass("open");
                $this.parents(".b-filter-item").find(".b-filter-toggle").slideDown(300, function(){
                    $this.removeClass("sliding");
                });
            }
        }  
        return false;
    });

    $( function() {
        $(".slider-range").each(function() {
            var $this = $(this),
                from = Number($(this).attr("data-range-from")),
                to = Number($(this).attr("data-range-to"));
            $this.slider({
                range: true,
                min: from,
                max: to,
                values: [from, to],
                slide: function( event, ui ) {
                    $this.parent().find(".range-from").val(ui.values[0]);
                    $this.parent().find(".range-to").val(ui.values[1]);
                }
            });
            $this.parent().find(".range-from").val(from);
            $this.parent().find(".range-to").val(to);
        });
    });

    $('.range-from, .range-to').on('change', function(){
        var count = $(this).val()*1,
            $slider = $(this).parents(".b-filter-item-range").find(".slider-range");
            from = Number($slider.attr("data-range-from"));
            to = Number($slider.attr("data-range-to"));
        if($(this).hasClass("range-from")){
            var inputTo = $(this).siblings(".range-to").val()*1;
            count = (count > inputTo) ? inputTo : count;
        }else{
            var inputFrom = $(this).siblings(".range-from").val()*1;
            count = (count < inputFrom) ? inputFrom : count;
        }
        count = (count < from)? from : count;
        count = (count > to) ? to : count;
        $(this).val(count);
        var valCurrent =  $slider.slider( "option", "values" );
        if($(this).hasClass("range-from")){
            $slider.slider("option", "values", [count, valCurrent[1]]).trigger('slidechange');
        }else{
            $slider.slider("option", "values", [valCurrent[0], count]).trigger('slidechange');
        }
    });

    $('.b-btn-address').on('click', function(){
        if($('.js-order-adress-map-input').val()){
            var room = "",
                postalCode = "";
            if($('#number-room-input').val()){
                room = ", кв. "+$('#number-room-input').val();
            }
            if($('#postal-code').val()){
                postalCode = $('#postal-code').val() + ", ";
            }
            var resString = postalCode + $('.js-order-adress-map-input').val() + room;
            var $address = $("#app-order textarea[name='address']").val(resString);
            var e = new Event("input");
            $address[0].dispatchEvent(e);
            $.fancybox.close(); 
        }else{
            $('.js-order-adress-map-input').addClass("error");
        }
        return false;
    });

    $('.js-order-adress-map-input').on('focus', function(){
        $('.js-order-adress-map-input').removeClass("error");
    });

    $('.fancybox-a').fancybox({'loop': true});
    $('.b-reviews-list .review-more-a').on('click',function(){
        var el = $(this).attr('href');
        var popup = $(el).attr('href');
        var src = $(this).parents('li').find('.review-img').attr('src');
        var name = $(this).parents('li').find('.review-name').text();
        var text = $(this).parents('li').find('.review-text').text();
        $(popup).find('.popup-review-img').attr('src',src);
        $(popup).find('.popup-review-name').text(name);
        $(popup).find('.popup-review-text').text(text);
        $(el).click();
        return false;
    });
    $('.b-detail-review .review-more-a').on('click',function(){
        var el = $(this).attr('href');
        var popup = $(el).attr('href');
        var src = $(this).parents('.b-detail-review').find('.b-detail-review-header img').attr('src');
        var name = $(this).parents('.b-detail-review').find('.b-detail-review-name h3').text();
        var text = $(this).parents('.b-detail-review').find('.b-detail-review-text').text();
        $(popup).find('.popup-review-img').attr('src',src);
        $(popup).find('.popup-review-name').text(name);
        $(popup).find('.popup-review-text').text(text);
        $(el).click();
        return false;
    });
    $('.popup-review-btn').on('click',function(){
        $.fancybox.close();
        return false;
    });

    $('.delivery-methods-list').slick({
        infinite: true,
        prevArrow: '<div class="b-product-arrows icon-arrow-left-bold"></div>',
        nextArrow: '<div class="b-product-arrows icon-arrow-right-bold"></div>',
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.popup-sign-list li a').on('click',function(){
        var el = $(this).attr('href');

        if ( !$(this).hasClass('active') ){
            $('.popup-sign-list li a').removeClass('active');
            $(this).addClass('active');
            $('.popup-sign-form').removeClass('active');
            $(el).addClass('active');
        }
        return false;
    });

    $('.catalog-mobile-filter').on('click',function(){
        if ( $(this).hasClass('active') ){
            $(this).text('Фильтр');
        } else {
            $(this).text('Скрыть фильтр');
        }
        $(this).toggleClass('active');
        $('.b-filter').toggleClass('active');
        $('body').toggleClass('no-scroll');
    });

    $('.mobile-btn').on('click',function(){
        $('.mobile-menu').addClass('active');
        $('.mobile-menu-bg').addClass('active');
        $('body').addClass('no-scroll');
        return false;
    });

    $('.mobile-menu-close-btn').on('click',function(){
        $('.mobile-menu').removeClass('active');
        $('.mobile-menu-bg').removeClass('active');
        $('body').removeClass('no-scroll');
        return false;
    });
    $('.mobile-menu-bg').on('click',function(){
        $('.mobile-menu').removeClass('active');
        $('.mobile-menu-bg').removeClass('active');
        $('body').removeClass('no-scroll');
        return false;
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


    
	// var myPlace = new google.maps.LatLng(56.504379, 84.945910);
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
	//     title: "Моточки-клубочки"
	// });

});