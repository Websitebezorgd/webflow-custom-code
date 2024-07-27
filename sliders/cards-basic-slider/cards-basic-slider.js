(function () {
  window.addEventListener("DOMContentLoaded", (event) => {
    $("[slider='cards-basic']").each(function (index) {
      const $this = $(this);
      let myTimeout;
      const sliderLoop = $this.attr("slider-loop") === "true";
      const sliderSpeed = $this.attr("slider-speed")
        ? +$this.attr("slider-speed")
        : 300;
      const filterCriteria = $this.attr("slider-filter-criteria");
      const swiperContainer = $this.find(".swiper")[0];

      filterSwiperSlidesByLocation(swiperContainer, filterCriteria);

      if (!$this.hasClass("script-added")) {
        new Swiper($this.find(".swiper")[0], {
          speed: sliderSpeed,
          loop: sliderLoop,
          centeredSlides: sliderLoop,
          spaceBetween: "2%",
          grabCursor: true,
          a11y: false,
          freeMode: true,
          lazy: true,
          followFinger: true,
          allowTouchMove: true,
          slidesPerView: "auto",
          autoplay: false,
          rewind: false,
          slideActiveClass: "is-active",
          slideDuplicateActiveClass: "is-active",
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          breakpoints: {
            0: { slidesPerView: 1, spaceBetween: "2%" },
            478: { slidesPerView: 1, spaceBetween: "2%" },
            767: { slidesPerView: 2, spaceBetween: "2%" },
            991: { slidesPerView: 2.5, spaceBetween: "2%" },
            1280: { slidesPerView: 3, spaceBetween: "2%" },
            1440: { slidesPerView: 3, spaceBetween: "2%" },
            1920: { slidesPerView: 3, spaceBetween: "2%" },
          },
          pagination: {
            el: $this.find(".swiper-bullet-wrapper")[0],
            bulletActiveClass: "is-active",
            bulletClass: "swiper-bullet",
            bulletElement: "button",
            clickable: true,
          },
          navigation: {
            nextEl: $this.find(".swiper-next")[0],
            prevEl: $this.find(".swiper-prev")[0],
            disabledClass: "is-disabled",
          },
          scrollbar: {
            el: $this.find(".swiper-drag-wrapper")[0],
            draggable: true,
            dragClass: "swiper-drag",
            snapOnRelease: true,
          },
          on: {
            progress: function () {
              clearTimeout(myTimeout);
              document.querySelectorAll(".swiper-slide").forEach((slide) => {
                slide.classList.add("scaled");
              });
              myTimeout = setTimeout(() => {
                document.querySelectorAll(".swiper-slide").forEach((slide) => {
                  slide.classList.remove("scaled");
                });
              }, 100);
            },
          },
        });
        $this.addClass("script-added");
      }
    });
  });
})();
