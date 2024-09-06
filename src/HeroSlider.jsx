import React from 'react';
import Slider from 'react-slick';
import './HeroSlider.css'; // Create this CSS file for slider-specific styling

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Slider {...settings} className="hero-slider">
      <div>
        <img src="/images/hero/slide1.jpg" alt="Slide 1" className="hero-image" />
      </div>
      <div>
        <img src="/images/hero/slide2.jpg" alt="Slide 2" className="hero-image" />
      </div>
      <div>
        <img src="/images/hero/slide3.jpg" alt="Slide 3" className="hero-image" />
      </div>
    </Slider>
  );
};

export default HeroSlider;