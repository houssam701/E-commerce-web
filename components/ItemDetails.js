"use client"; // Client Component

import { useCart } from "@/contexts/CartContext";
import ImageSingleSlide from "./slideSingleItem";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ItemDetails({ item }) {
  const { addItemToCart } = useCart();
  const handleAddToCart = () => {
    addItemToCart(item);
    toast.success('Item added to the cart !');
  };
  const price =
    item.discounted_price > 0 ? (
      <p className="text-[#ef233c] sm:text-xl text-sm">
        ${item.discounted_price}{" "}
        <del className="text-gray-600">${item.price}</del>{" "}
        <span className="text-gray-400">Free Delivery</span>
      </p>
    ) : (
      <p className="text-[#ef233c] sm:text-xl text-sm">
        ${item.price}
        <span className="text-gray-400"> Free Delivery</span>
      </p>
    );

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Images */}
      <ImageSingleSlide image={item.images} />
      {/* Description */}
      <div className="flex flex-col sm:w-[50%] w-100% sm:p-2 p-1">
        <h1 className="sm:text-4xl text-2xl font-bold">{item.name}</h1>
        <p className="text-gray-500 mt-5">{item.description}</p>
        <div className="flex items-center mt-5 gap-3">
          <h3 className="font-bold text-xl">For:</h3>
          <p className="text-gray-500 text-sm">{item.gender}</p>
        </div>
        <h3 className="mt-5 font-bold text-xl">Services:</h3>
        <p className="mt-2 text-gray-500 text-sm">Cash on Delivery available</p>
        <p className="mt-2 text-gray-500 text-sm">30 Day Return Policy</p>
        <div className="flex justify-between mt-10 items-center">
          {price}
          <div>
          <button
            onClick={handleAddToCart}
            className="p-2 sm:text-lg text-sm bg-[#ef233c] text-white rounded-md hover:bg-[#ef233b89] duration-300"
          >
            Add To Cart
          </button>
       
      </div>
        </div>
      </div>
    </div>
  );
}
