(function () {
  document.addEventListener("DOMContentLoaded", (event) => {
    $("[slider='logo-smooth-scroll']").each(function (index) {
      const $this = $(this);
      const loopMode = $this.attr("slider-loop") !== "false";
      const sliderSpeed = $this.attr("slider-speed")
        ? +$this.attr("slider-speed")
        : 5000;
      const spaceBetweenDefault = "4%";
      const filterCriteria = $this.attr("slider-filter-criteria");
      const swiperContainer = $this.find(".swiper")[0];

      filterSwiperSlidesByLocation(swiperContainer, filterCriteria);

      if (!$this.hasClass("script-added")) {
        const swiper = new Swiper($this.find(".swiper")[0], {
          spaceBetween: spaceBetweenDefault,
          grabCursor: false,
          a11y: false,
          freeMode: true,
          speed: sliderSpeed,
          loop: loopMode,
          lazy: true,
          allowTouchMove: false,
          slidesPerView: "auto",
          autoplay: { delay: 1, disableOnInteraction: false },
          keyboard: { enabled: false },
          slideActiveClass: "is-active",
          slideDuplicateActiveClass: "is-active",
          breakpoints: {
            0: { slidesPerView: 2, spaceBetween: "3%" },
            478: { slidesPerView: 3, spaceBetween: "3%" },
            767: { slidesPerView: 4, spaceBetween: "3%" },
            991: { slidesPerView: 5, spaceBetween: spaceBetweenDefault },
            1280: { slidesPerView: 5.5, spaceBetween: spaceBetweenDefault },
            1440: { slidesPerView: 5, spaceBetween: spaceBetweenDefault },
            1920: { slidesPerView: 5, spaceBetween: spaceBetweenDefault },
          },
        });
        $this.addClass("script-added");
      }
    });
  });
})();