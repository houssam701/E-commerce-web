'use client';
import { orderAction } from "@/actions/order-actions";
import Footer from "@/components/footer";
import { useCart } from "@/contexts/CartContext";
import { getCartItems } from "@/lib/cart";
import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckoutPage() {
    const { cart, getTotalPrice, setCart } = useCart();
    const total = getTotalPrice();
    const [state, setState] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmitForm(event) {
        event.preventDefault();
        setSubmitting(true);

        const cartItems = await getCartItems();
        const formData = new FormData(event.target);

        formData.append("cartItems", JSON.stringify(cartItems));
        formData.append("total_price", total);

        startTransition(async () => {
            const response = await orderAction(formData);
            if (response?.success) {
                toast.success("Order has been sent!");
                localStorage.clear();
                setCart([]);
                router.push("/");
            }
            setState(response);
        });
        setSubmitting(false);
    }

    return (
        <>
            {/* intro */}
            <div className="relative w-full h-[300px] mx-auto overflow-hidden parent-container">
                <div className="w-full bg-watch h-[300px] bg-cover bg-center text-white flex justify-center items-center ">
                    <div className="flex justify-between  max-w-[1000px] w-[80%] mt-8">
                        <h1 className="sm:text-4xl text-2xl font-bold">Checkout</h1>
                        <p className="text-xl">
                            Home &rsaquo; &rsaquo; <span className="text-[#ef233c]">Checkout</span>{" "}
                        </p>
                    </div>
                </div>
            </div>
            {/* Receipt Bill */}
            <div className="w-full mt-[70px]">
                <div className="max-w-[600px] w-full mx-auto bg-gray-200 p-4 rounded-lg ">
                    <h2 className="sm:text-4xl text-2xl font-bold ">Check Your Bill</h2>
                    <div className="flex w-full justify-between mt-4 p-1">
                        <p className="text-gray-500 text-lg">Products </p>
                        <p className="text-gray-500 text-lg">Price</p>
                    </div>
                    <hr className="mt-2 mb-1 h-[2px] bg-white" />

                    {cart.map((item) => (
                        <div key={item.id} className="flex w-full justify-between mt-4 p-1">
                            <p className="text-gray-500 text-lg">{item.quantity} {item.name}</p>
                            <p className="text-gray-500 text-lg">${item.price * item.quantity}</p>
                        </div>
                    ))}

                    <hr className="mt-2 mb-1 h-[2px] bg-white" />
                    <div className="flex w-full justify-between mt-4 p-1">
                        <p className="text-gray-500 text-lg">Total</p>
                        <p className="text-gray-500 text-lg">${total}</p>
                    </div>
                </div>
            </div>
            {/* Payment */}
            <div className="w-full mt-[70px]">
                <div className="w-full max-w-[600px] mx-auto  p-4">
                    <h2 className="sm:text-4xl text-2xl font-bold">Your Personnel Details</h2>
                    <form onSubmit={handleSubmitForm} className="w-full flex flex-col mt-4 gap-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="rounded text-lg bg-gray-200 border-transparent focus:border-[1px] focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
                        />
                        {state?.errors && <p className="text-red-500 pl-1">{state.errors.name}</p>}

                        <input
                            type="text"
                            name="email"
                            placeholder="email@example.com"
                            className="rounded text-lg bg-gray-200 border-transparent focus:border-[1px] focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
                        />
                        {state?.errors && <p className="text-red-500 pl-1">{state.errors.email}</p>}
                        <input
                            type="text"
                            name="address"
                            placeholder="Your Full Address"
                            className="rounded text-lg bg-gray-200 border-transparent focus:border-[1px] focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
                        />
                        {state?.errors && <p className="text-red-500 pl-1">{state.errors.address}</p>}
                        <input
                            type="text"
                            name="phone"
                            placeholder="Mobile phone"
                            className="rounded text-lg bg-gray-200 border-transparent focus:border-[1px] focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
                        />
                        {state?.errors && <p className="text-red-500 pl-1">{state.errors.phone}</p>}
                        {state?.success && <p className="text-green-500 pl-1">{state.message}</p>}
                        {state?.errors?.cart && <p className="text-red-500 pl-1">{state.errors.cart}</p>}
                        {!submitting ? (
                            <button type="submit" className=" bg-[#ef233c] text-white p-2 text-xl rounded hover:bg-[#ef233ba9]">Checkout</button>
                        ) : (
                            <button type="button" className=" bg-[#ef233c] text-white p-2 text-xl rounded hover:bg-[#ef233ba9]">sending...</button>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
