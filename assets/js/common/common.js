$(function() {

    
    
    const Search = $(".shortcuts .search-open");
    const Input = $(".shortcuts .input-txt");

    Search.click(function() {
        Input.show();
    });
    Input.blur(function() {
        $(this).hide();
    });
    $(document).click(function(event) {
        if (!$(event.target).closest(".shortcuts").length) {
            Input.hide();
        };
    });

    $(document).ready(function() {
        $(".model-box").first().addClass("active").show();
        $(".model-list__button").on("click", function() {
            $(".model-list__button").removeClass("active");
            $(this).addClass("active");
            
            $(".model-box").removeClass("active").hide();
            let index = $(this).parent().index();
            $(".model-box").eq(index).addClass("active").show();
        });
    });

    $(document).ready(function () {
        $(".menu-model .inner-bottom").css("display", "none");
        const observer = new MutationObserver(function () {
            if ($(".menu-model .box5").hasClass("active")) {
                $(".menu-model .inner-bottom").css("display", "flex");
            } else {
                $(".menu-model .inner-bottom").css("display", "none");
            }
        });
        observer.observe(document.querySelector(".box5"), {
            attributes: true,
            attributeFilter: ["class"],
        });
    });

    $(document).ready(function () {
        $('.list-button').click(function () {
            var tabName = $(this).data('tab');
            var isActive = $(this).hasClass('on');
            var $targetTab = $('[data-tab-name="' + tabName + '"]');
            var $currentOpenTab = $('[data-tab-name]').filter(':visible');
            if (isActive) {
                $(this).removeClass('on');
                $targetTab.slideUp(600);
            } else {
                if ($currentOpenTab.length) {
                    $currentOpenTab.hide();
                    $targetTab.show();
                } else {
                    $targetTab.slideDown(600);
                }
                $('.list-button').removeClass('on');
                $(this).addClass('on');
            }
        });
    });

    $(document).ready(function () {
        $(".menu-btn").click(function () {
            $(this).toggleClass("active");
            $(".menu-hamburger").toggleClass("active");
        });
    });

    const scrollTop = $(".top-btn");

    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 300) {
            scrollTop.addClass("show");
        } else {
            scrollTop.removeClass("show");
        }
    });

    scrollTop.on('click', function() {
        $("html, body").animate({scrollTop: 0}, 500);
    });

    const footerSwiper = new Swiper (".footer-swiper", {
        direction: "vertical",
        slidesPerView: "1",
        autoHeight: true,
        grabCursor: false,
        simulateTouch: false,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-control .next-btn",
            prevEl: ".swiper-control .prev-btn",
        },
    });

    $(".swiper-control .pause-btn").on("click", function() {
        if (footerSwiper.autoplay.running) {
            footerSwiper.autoplay.stop();
            $(this).addClass("stop");
        } else {
            footerSwiper.autoplay.start();
            $(this).removeClass("stop");
        }
    });
})