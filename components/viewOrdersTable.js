'use client';

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { SearchOrderAction } from "@/actions/order-actions";
import DoneOrderModal from "./doneOrderModal";
import { toast } from "react-toastify";

export default function OrdersTable({ data }) {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Group initial data by order ID
    const groupedOrders = Object.values(
      data.reduce((acc, order) => {
        if (!acc[order.id]) {
          acc[order.id] = {
            ...order,
            items: [],
          };
        }
        acc[order.id].items.push({
          name: order.item_name,
          quantity: parseInt(order.quantity, 10),
        });
        return acc;
      }, {})
    );
    setOrders(groupedOrders);
  }, [data]);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe("admin-channel");
    channel.bind("new-order", (newOrderData) => {
      console.log(newOrderData);

      const formattedOrder = {
        id: newOrderData.orderId,
        name: newOrderData.name,
        email: newOrderData.email,
        phone: newOrderData.phone,
        address: newOrderData.address,
        date: new Date().toISOString(),
        total_price: newOrderData.total_price,
        items: newOrderData.cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        })),
      };
      toast.success("New order has been added!");

      setOrders((prevOrders) => [formattedOrder, ...prevOrders]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  // Handle form submission for search
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Execute the action and await its result
      const response = await SearchOrderAction(new FormData(e.target));

      if (response.success) {
        // Group the data and update state
        const groupedOrders = Object.values(
          response.data.reduce((acc, order) => {
            if (!acc[order.id]) {
              acc[order.id] = {
                ...order,
                items: [],
              };
            }
            acc[order.id].items.push({
              name: order.item_name,
              quantity: parseInt(order.quantity, 10),
            });
            return acc;
          }, {})
        );

        setOrders(groupedOrders);
      } else {
        setError(response.errors || "An error occurred while searching.");
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Table</h1>

      {/* Search Form */}
      <form className="mb-4 flex items-center space-x-4" onSubmit={handleSubmit}>
        <input
          id="searchInput"
          type="text"
          name="searchTerm"
          placeholder="Search by order Name or by ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full border-collapse border border-gray-300">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Order Id
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Address
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Items
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Total Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
               Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2 text-sm border border-gray-300">
                  {order.id}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  {order.name}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  {order.email}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  {order.address}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  {new Date(order.date).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  {order.items
                    .map((item) => `${item.name} (${item.quantity})`)
                    .join(" / ")}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  ${order.total_price}
                </td>
                <td className="px-4 py-2 text-sm border border-gray-300">
                  <div className="flex space-x-2">
                    <DoneOrderModal className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" order={order} button='Done'/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
