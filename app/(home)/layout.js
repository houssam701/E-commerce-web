"use client";

import { CartProvider } from "@/contexts/CartContext";
import { SearchProvider } from "@/contexts/SearchContext";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <SearchProvider>
        <Navbar />
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar
          style={{ top: "100px" }}
        />
        {children}
      </SearchProvider>
    </CartProvider>
  );
}
