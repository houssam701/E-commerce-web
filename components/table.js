"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext"; // Adjust the path based on your project structure
import Link from "next/link";

export default function CheckoutTable() {
  const { cart,increaseQuantity, decreaseQuantity, removeItemFromCart } = useCart(); // Use setCart to update the cart state

  

  return (
    <div className="container mx-auto px-4 max-w-6xl mt-[100px]">
      <h2 className="sm:text-4xl text-2xl font-bold mb-4">Checkout</h2>
      <p className="text-gray-600 mb-4">
        Your shopping cart contains: {cart.length} Product(s)
      </p>

      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-[700px] border-collapse border border-gray-200 font-bold">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-200 p-2">SL No.</th>
                <th className="border border-gray-200 p-2">Product</th>
                <th className="border border-gray-200 p-2">Quantity</th>
                <th className="border border-gray-200 p-2">Product Name</th>
                <th className="border border-gray-200 p-2">Price</th>
                <th className="border border-gray-200 p-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-200 p-2">{index + 1}</td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex gap-1"> {item.images && item.images.map((image,index)=>
                      <Image
                        key={index}
                        src={image.image_path || "/default-image.jpg"} // Default fallback image
                        alt='/default-image.jpg'
                        width={80}
                        height={80}
                        className="h-20 w-20"
                      />)
                      }
                    </div>
                  </td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400" onClick={()=>decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"  onClick={()=>increaseQuantity(item.id)}>+</button>
                    </div>
                  </td>
                  <td className="border border-gray-200 p-2">{item.name}</td>
                  <td className="border border-gray-200 p-2">${item.price}</td>
                  <td className="border border-gray-200 p-2">
                    <button
                    onClick={()=>removeItemFromCart(item.id)}
                      className="px-3 py-1 bg-[#ef233c] hover:bg-[#ef233bda] text-white rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full text-end min-w-[700px]">
            <Link href='/checkout'>
             <button href='/checkout' className=" p-3 bg-[#ef233c] rounded-sm mt-3 text-white hover:bg-[#ef233bda]">
              Proceed To Checkout
            </button>
          </Link>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
    </div>
  );
}
