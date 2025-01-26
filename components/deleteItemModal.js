"use client";
import React, { startTransition, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { deleteItemAction } from "@/actions/admin-items-cloud";

export default function DeleteItemModal({ button, className, item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [actionState, setActionState] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false); // Track if deletion is in progress

  function handleOpen() {
    setIsAnimating(true);
    setIsOpen(true);
  }

  function handleClose() {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsDeleting(true); // Set deleting state to true when the process starts

    const formData = new FormData(e.target);
    startTransition(async () => {
      const result = await deleteItemAction(formData);

      if (result?.success) {
        setIsDeleting(false); // Reset deleting state when successful
        handleClose(); // Close the modal on success
      } else if (result?.errors) {
        setIsDeleting(false); // Reset deleting state if there are errors
        setValidationErrors(result.errors); // Set validation errors
      }

      setActionState(result); // Save the action result for debugging/logging
    });
  }

  return (
    <>
      <button onClick={handleOpen} className={className}>
        {button ? button : "button"}
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
            <h2 className="sm:text-xl text-lg font-semibold mb-2">
              Are you sure you want to delete this Item?
            </h2>
            <input type="hidden" value={item.id} name="item_id" />
            <input type="hidden" value={JSON.stringify(item.images)} name="public_id" />
            <div className="mt-4 flex justify-end">
              {isDeleting ? (
                <span
                  className="px-4 py-2 bg-red-500 rounded cursor-not-allowed"
                >
                  Deleting...
                </span>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 mr-2"
                    type="submit"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    type="button"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </motion.form>
        </Modal>
      )}
    </>
  );
}
