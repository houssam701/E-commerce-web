"use client";

import { searchItemAction } from "@/actions/admin-items-cloud";
import DeleteItemModal from "./deleteItemModal";
import EditItemsModal from "./editItemModal";
import { useActionState } from "react";

export default function ItemsTable({ items, sections }) {
  const [state, formAction] = useActionState(searchItemAction, {});

  // Use `state.itemSearched` if the search was successful; otherwise, use `items`
  const displayedItems = state.success && Array.isArray(state?.itemSearched) && state.itemSearched.length > 0 
    ? state.itemSearched 
    : items.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Items Table</h1>

      {/* Search Input */}
      <form action={formAction} className="mb-4 flex items-center space-x-4">
        <input
          name="name"
          type="text"
          placeholder="Search by item name..."
          className="p-2 border border-gray-300 rounded-md w-1/3"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border-collapse border border-gray-300">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Gender
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Section
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Discounted_Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Images
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(displayedItems) && displayedItems.length > 0 ? (
              displayedItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {item.gender}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {item.price}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {item.discounted_price}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300 overflow-hidden">
                    <div className="flex space-x-1">
                      {item.images?.map((image, index) => (
                        <img
                          key={index}
                          src={image.image_path}
                          alt={`Image ${index + 1}`}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm border border-gray-300">
                    <div className="flex space-x-2">
                      <EditItemsModal sections={sections} item={item} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" button="Edit" />
                      <DeleteItemModal item={item} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" button="Delete" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-sm text-center border border-gray-300">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
