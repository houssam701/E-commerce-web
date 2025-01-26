'use client';
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 left-[0px] transform -translate-y-1/2 text-white hover:text-[#ef233c] cursor-pointer z-10"
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
      className="absolute top-1/2 right-[0px] transform -translate-y-1/2 text-white hover:text-[#ef233c] cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowRight size={24} />
    </div>
  );
};

export default function ImageSingleSlide({ image }) {
  const settings = {
    dots: false, // Remove dots
    infinite: image.length > 1, // Disable infinite loop if only one image
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: image.length > 1, // Enable autoplay only if more than one image
    autoplaySpeed: 1500, // Autoplay interval
    prevArrow: <PrevArrow />, // Custom previous arrow
    nextArrow: <NextArrow />, // Custom next arrow
  };

  return (
    <div className="max-w-600px sm:w-[45%] w-100% h-[500px]">
      <Slider {...settings}>
        {image.map((item, index) => (
          <div className=" h-[500px]" key={index}>
            <Image
              src={item.image_path}
              alt={`Slide ${index + 1}`}
              className="object-cover object-center w-full h-full"
              width={500}
              height={600}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
