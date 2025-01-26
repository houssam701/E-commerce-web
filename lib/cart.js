'use client';
export async function getCartItems() {

  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
}