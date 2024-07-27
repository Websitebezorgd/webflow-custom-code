This guide explains how to implement a smooth scrolling logo slider on a Webflow site using a custom JavaScript function. Follow the steps below to set up the slider:

## Customizable Attributes

You can customize the slider behavior using the following attributes on the swiper container:

slider-loop: Set to "true" or "false" to enable or disable looping. Default is "true".
slider-speed: Set the speed of the slider in milliseconds. Default is 5000.

## Styling Overwrites

To customize the styling of specific sections, use targeted CSS classes. For example, is-featured-logos.

## webflow structure

- .slider-main_component (.is-featured-logos)
  - .slider-main_top-wrapper (.is-featured-logos)
  - .slider-main_inner-wrapper (.is-featured-logos)
    - swiper
      - swiper-wrapper
        - swiper-slide
          - [your]\_component
  - .slider-main_bottom-wrapper (.is-featured-logos)

