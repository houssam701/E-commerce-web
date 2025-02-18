"use client";
import React, { startTransition, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { updateItemAction } from "@/actions/admin-items-cloud";

export default function EditItemsModal({ button, className, item, sections }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // Saved images
  const [formData, setFormData] = useState({
    item_id:item.id,
    name: item.name,
    price: item.price,
    discounted_price: item.discounted_price,
    description: item.description,
    quantity: item.quantity,
    section_id:item.section_id,
    images_id:item.images,
    gender:item.gender
  });

  const [validationErrors, setValidationErrors] = useState(null); // For validation errors
  function handleOpen() {
    setIsAnimating(true);
    setIsOpen(true);
  }

  function handleClose() {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Array of File objects
    setSelectedImages(files); // Save actual File objects
  };
 ///////////////////////////////////////////////////////////////////
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    // Append all keys from formData
    Object.keys(formData).forEach((key) => {
      if (key === "images_id") {
        // Serialize `images_id` to JSON if it's an array
        const serializedImagesId = JSON.stringify(formData[key]);
        data.append(key, serializedImagesId); // Append as JSON string
      } else {
        data.append(key, formData[key]); // Append other fields as-is
      }
    });
  
    // Append new images (if any)
    selectedImages.forEach((file) => {
      data.append("images", file); // Append each File object to FormData
    });
 
    startTransition(async () => {
      const result = await updateItemAction(data);
      if (result?.success) {
        handleClose(); // Close the modal on success
      } else if (result?.errors) {
        setValidationErrors(result.errors); // Set validation errors
      }
    });
  }
  
  

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <>
      <button onClick={handleOpen} className={className}>
        {button || "Edit Item"}
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={handleClose}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          className="relative mx-auto w-11/12 max-w-md bg-transparent outline-none"
          ariaHideApp={false}
        >
          <motion.form
            className="relative mx-auto w-full max-w-md bg-white rounded-lg shadow-lg p-6 max-h-[85vh] overflow-y-auto modal-scrollable-content"
            variants={modalVariants}
            initial="hidden"
            animate={isAnimating ? "visible" : "hidden"}
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
              />
              {validationErrors?.name && <span className=" text-red-600 text-sm pl-1 mt-1">{validationErrors.name}</span>}

            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Price</label>
              <input
                name="price"
                type="text"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
              />
              {validationErrors?.price && <span className=" text-red-600 text-sm pl-1 mt-1">{validationErrors.price}</span>}

            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Discounted Price</label>
              <input
                name="discounted_price"
                type="text"
                value={formData.discounted_price}
                onChange={handleInputChange}
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
              />
              {validationErrors?.discounted_price && <span className=" text-red-600 text-sm pl-1 mt-1">{validationErrors.discounted_price}</span>}

            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
                rows={3}
              ></textarea>
              {validationErrors?.description && <span className=" text-red-600 text-sm pl-1 mt-1">{validationErrors.description}</span>}
              </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Sections:</label>
              <select name="section"   defaultValue={formData.section_id} className=" w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg">
              {sections.map((section)=>(
                <option key={section.id} value={section.id}>{section.title}</option>
              ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Quantity</label>
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
              />
              {validationErrors?.quantity && <span className=" text-red-600 text-sm pl-1 mt-1">{validationErrors.quantity}</span>}

            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Gender</label>
              <div className="flex gap-4">
              <div className="flex items-center gap-1"><input type="radio" name="gender" value="Men" onChange={handleInputChange}/> Men</div>
              <div className="flex items-center gap-1"><input type="radio" name="gender" value="Women" onChange={handleInputChange}/> Women</div>
            </div>
              {validationErrors?.gender && <span className=" text-red-600 text-sm pl-1 mt-1">{validationErrors.gender}</span>}

            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mb-2 w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
              />
              
            </div>

          

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                type="submit"
              >
                Confirm
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                type="button"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </Modal>
      )}
    </>
  );
}