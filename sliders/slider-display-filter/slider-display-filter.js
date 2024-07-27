function filterSwiperSlidesByLocation(swiperContainer, filterCriteria) {
  if (
    !swiperContainer ||
    !filterCriteria ||
    filterCriteria.toLowerCase() === "all"
  ) {
    console.error("swiperContainer is required");
    return;
  }

  const criteriaArray = filterCriteria.toLowerCase().split(/\s*,\s*/);
  const swiperSlides = swiperContainer.querySelectorAll(".swiper-slide");

  swiperSlides.forEach((slide) => {
    const slideLocation = slide.getAttribute("slider-display-locations");

    if (!filterCriteria || filterCriteria.toLowerCase() === "all") {
      slide.style.display = "";
    } else if (slideLocation) {
      const locationsArray = slideLocation.toLowerCase().split(/\s*,\s*/);
      const matchFound = criteriaArray.some((criteria) =>
        locationsArray.includes(criteria)
      );
      slide.style.display = matchFound ? "" : "none";
    } else {
      slide.style.display = "none";
    }
  });
}
