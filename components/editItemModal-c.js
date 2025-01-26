"use client";
import React, { startTransition, useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { updateItemAction } from "@/actions/admin-items-cloud";


export default function EditItemsModal({ button, className, item, sections }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  

  function handleOpen() {
    setIsAnimating(true);
    setIsOpen(true);
  }

  function handleClose() {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  }

  const [selectedImages, setSelectedImages] = useState([]);
  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Load initial images from data (assumed to be an array of image URLs)
    if (item) {
      setSelectedImages(
        item.images.map((image) => ({
          image_path: image.image_path,
          isNew: false,
        }))
      );
    }
  }, [item]);
//////////////////////////////////////////////////////
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        image_path: URL.createObjectURL(file),
        isNew: true,
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };
//////////////////////////////////////////////////////////////////////
  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
////////////////////////////////////////////////////////////////////
   async function handleSubmit(e){
    e.preventDefault();

    // Separate new images from old images
    const newImages = selectedImages.filter((img) => img.isNew);
    const formData = new FormData();
    console.log('newImages are'+newImages);
    newImages.forEach((img) => {
      formData.append("images[]", img.file);
    });
        startTransition(async () => {
          const result = await updateItemAction(formData);
        })
    // Submit formData to your backend
    console.log("Submitting formData", formData);
  };
///////////////////////////////////////////////////////////////////////
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
            className="relative mx-auto w-full max-w-md bg-white rounded-lg shadow-lg p-6"
            variants={modalVariants}
            initial="hidden"
            animate={isAnimating ? "visible" : "hidden"}
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold mb-4">Edit Item</h2>

            <label className="block font-medium mb-1">Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="mb-2 w-full p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
      />
      <div
        className="flex flex-wrap gap-2 overflow-y-scroll"
        style={{ maxHeight: "100px" }}
      >
        {selectedImages.map((img, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={img.image_path}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
            >
              X
            </button>
          </div>
        ))}
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
