'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CartItem from './cartItem'; // Adjust the import as per your project structure
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 text-gray-400 hover:text-[#ef233c] cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowLeft size={24} />
    </div>
  );
};

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 text-gray-400 hover:text-[#ef233c] cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowRight size={24} />
    </div>
  );
};

export default function DealsForMen({data}){
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of items visible at once
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // 3 seconds per slide
    nextArrow: <NextArrow />, // Custom Next Arrow
    prevArrow: <PrevArrow />, // Custom Previous Arrow
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // For mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Deals For {data.data.length>0 && data.data[0].gender}</h2>
        <div className="mt-6">
          <Slider {...sliderSettings}>
          {data.success && data.data.map((item) => (
           <div key={item.id} className="px-4"> {/* Add padding for spacing */}
            <CartItem data={item}/>
          </div>  
        ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

