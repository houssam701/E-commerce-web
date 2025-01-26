"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Create the Cart Context
const CartContext = createContext();

// Provide the Cart Context
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts (browser only)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // Set up interval to clear cart after one day
    const interval = setInterval(() => {
      localStorage.removeItem("cart");
      setCart([]);
    }, 24 * 60 * 60 * 1000); // 1 day in milliseconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const addItemToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map((cartItem) => 
      cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map((cartItem) => 
      cartItem.id === itemId && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addItemToCart, increaseQuantity, decreaseQuantity, removeItemFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart Context
export function useCart() {
  return useContext(CartContext);
}
