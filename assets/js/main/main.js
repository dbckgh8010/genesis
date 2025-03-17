$(function() {
    //section1 swiper
    let prevIndex = 0;

    const mainSwiper = new Swiper(".mySwiper", {
        grabCursor: true,
        loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
		on: {
			init: function () {
                updateActiveText();
            },
            slideChangeTransitionEnd: function () {
                updateActiveText();
                animateText();
            },         
		}
	});

    const controlBtn = $(".section1 .play-btn");
    let isPlaying = true;

    controlBtn.on('click', function() {
        if (isPlaying) {
            mainSwiper.autoplay.stop();
        } else {
            mainSwiper.autoplay.start();
        }
        
        $(this).toggleClass("playing");
        isPlaying = !isPlaying;
    });

    mainSwiper.emit("init");

	function updateActiveText() {
        const activeSlide = $(".swiper-slide-active");

        if (!activeSlide.length) return;
    
        $(".swiper-txt-top [data-tab], .swiper-txt-bottom [data-tab]").each(function () {
            const tabName = $(this).data("tab");
            const textElement = activeSlide.find(`[data-tab-name="${tabName}"]`);
    
            $(this).text(textElement.length ? textElement.text() : "");  //삼항연산자
        });
        $(".swiper-bottom__link a").each(function () {
            $(this).css("display", "");
        
            if (!$(this).text().trim()) {
                $(this).css("display", "none");
            }
        });
    };

    function updateTextClasses() {
        $(".swiper-txt-top").removeClass("prev-txt active-txt next-txt");

        let activeSlide = $(".swiper-slide-active");
        let nextSlide = activeSlide.next(".swiper-slide").length ? activeSlide.next() : $(".swiper-slide").first();
        let prevSlide = activeSlide.prev(".swiper-slide").length ? activeSlide.prev() : $(".swiper-slide").last();

        activeSlide.find(".swiper-txt-top").addClass("active-txt");
        nextSlide.find(".swiper-txt-top").addClass("next-txt");
        prevSlide.find(".swiper-txt-top").addClass("prev-txt");
    }


    let defaultText = $(".drop-menu-list a").first().text();
    $(".menu-select").text(defaultText);

    $(".drop-menu-list a").click(function (e) {
        e.preventDefault();
        let selectedText = $(this).text();
        $(".menu-select").text(selectedText);
        closeDropdown();
    });

    $(".menu-select").click(function (e) {
        e.stopPropagation();
        let Open = $(this).hasClass("open");

        closeDropdown();

        if (!Open) {
            $(this).addClass("open");
            $(".drop-menu-list").show();
        }
    });

    function closeDropdown() {
        $(".drop-menu-list").hide();
        $(".menu-select").removeClass("open");
    }

    const modelSwiper = new Swiper (".model-swiper", {
        slidesPerView: 3,
        grabCursor: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

    $(".multi-swiper-list .swiper").hide().first().show();

    $(".drop-list").click(function () {
        let index = $(this).index();
    
        $(".multi-swiper-list .swiper").hide();
    
        $(".multi-swiper-list .swiper").eq(index).show();
    });
    $(document).on("mouseover", ".gif-img", function() {
        let $this = $(this);
        let gifSrc = $this.attr("data-gif"); 
        
        $this.attr("src", gifSrc + "?t=" + new Date().getTime());
    });

    const awardBgSwiper = new Swiper (".section4-swiper-bg", {
        slidesPerView: "1",
        speed: 0,
        allowTouchMove: false,
        grabCursor: false,
    });

    const awardSwiper = new Swiper (".section4-swiper-main", {
        slidesPerView: "auto",
        centeredSlides: true,
        grabCursor: true,
        loop: false,
        controller: { control: awardBgSwiper },
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".section4-swiper-control .pagination",
            clickable: true,    
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                progressCircle.style.setProperty("--progress", 1 - progress);
                progressContent.textContent = `${Math.ceil(time / 1000)}s`;
            }
        }
    });

    const playBtn = $(".section4-play-btn .play-btn");
    let Playing = true;

    playBtn.on('click', function() {
        if (Playing) {
            awardSwiper.autoplay.stop();
        } else {
            awardSwiper.autoplay.start();
        }
        
        $(this).toggleClass("play");
        Playing = !Playing;
    });

    awardBgSwiper.controller.control = awardSwiper;
})