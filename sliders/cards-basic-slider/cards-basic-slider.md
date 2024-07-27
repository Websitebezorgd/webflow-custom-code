## Customizable Attributes

You can customize the slider behavior using the following attributes on the swiper container:

- slider-loop: Set to "true" or "false" to enable or disable looping. Default is "true".
- slider-speed: Set the speed of the slider in milliseconds. Default is 300.

## Styling overwrites

To customize the styling of specific sections, use targeted CSS classes. For example, is-featured-blogs.

## Webflow structure

- .slider-main_component (.is-featured-blogs)
  - .slider-main_top-wrapper (.is-featured-blogs)
  - .slider-main_inner-wrapper (.is-featured-blogs)
    - swiper
      - swiper-wrapper
        - swiper-slide
          - [your]\_component
  - .slider-main_bottom-wrapper (.is-featured-blogs)
