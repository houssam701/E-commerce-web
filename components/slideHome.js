'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
    const sliderSettings = {
        dots: false, // Disable dots
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 2 seconds
        arrows: true, // Enable arrows
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 768, // Tablet and smaller
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
    <div className="relative w-full h-[600px] mx-auto overflow-hidden parent-container">
  <Slider {...sliderSettings}>
    {/* Slide 1 */}
    <div className="relative w-full h-[600px] bg-watch bg-cover bg-center bg-no-repeat flex justify-center items-center">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20">
        <h3 className="sm:text-2xl text-[#ef233c]">Up To 70% Off Now</h3>
        <h1 className="sm:text-5xl text-3xl text-white font-bold">Mid Season Sales</h1>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="relative w-full h-[600px] bg-image2 bg-cover bg-center flex justify-center items-center">
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20">
        <h3 className="sm:text-2xl text-[#ef233c]">Up To 70% Off Now</h3>
        <h1 className="sm:text-5xl text-3xl text-white font-bold">Mid Season Sales</h1>
      </div>
    </div>

    {/* Slide 3 */}
    <div className="relative w-full h-[600px] bg-image3 bg-cover bg-center flex justify-center items-center">
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20">
        <h3 className="sm:text-2xl text-[#ef233c]">Up To 70% Off Now</h3>
        <h1 className="sm:text-5xl text-3xl text-white font-bold">Mid Season Sales</h1>
      </div>
    </div>
  </Slider>
</div>

      
    );
};

// Custom Previous Arrow
const CustomPrevArrow = ({ onClick }) => (
    <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-600 opacity-30  text-white rounded-sm w-10 h-10 flex items-center justify-center hover:bg-white hover:text-[#ef233c] hover:opacity-100"
        onClick={onClick}
    >
        ←
    </button>
);

// Custom Next Arrow
const CustomNextArrow = ({ onClick }) => (
    <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-600 opacity-30  text-white rounded-sm w-10 h-10 flex items-center justify-center hover:bg-white hover:text-[#ef233c] hover:opacity-100"
        onClick={onClick}
    >
        →
    </button>
);

export default ImageSlider;
