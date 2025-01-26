"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { deleteSectionAction } from "@/actions/admin-Items";

export default function DeleteSectionModal({ className, sectionId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);

  function handleOpen() {
    setIsAnimating(true);
    setIsOpen(true);
  }

  function handleClose() {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
    setValidationErrors(null); // Clear errors on close
  }

  async function handleDelete() {
    try {
      const res = await deleteSectionAction(sectionId);
      if (!res.success) {
        setValidationErrors(res.errors || "An unknown error occurred.");
      }
      if (res.success) {
        handleClose();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      setValidationErrors("Failed to delete the section. Please try again later.");
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <>
      <button type="button" onClick={handleOpen} className={className}>
        Delete
      </button>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={handleClose}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          className="relative mx-auto w-11/12 max-w-md bg-transparent outline-none"
          ariaHideApp={false}
        >
          <motion.div
            className="relative mx-auto w-full max-w-md bg-white rounded-lg shadow-lg p-6"
            variants={modalVariants}
            initial="hidden"
            animate={isAnimating ? "visible" : "hidden"}
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h2 className="text-xl font-semibold mb-5">
              Are you sure you want to delete this Section?
            </h2>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-400 rounded hover:bg-red-600 mr-2"
                type="button"
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
            </div>
            {validationErrors && typeof validationErrors === "string" ? (
              <p className="text-red-500 mt-3">{validationErrors}</p>
            ) : Array.isArray(validationErrors) ? (
              validationErrors.map((error, index) => (
                <p key={index} className="text-red-500 mt-3">{error}</p>
              ))
            ) : null}
          </motion.div>
        </Modal>
      )}
    </>
  );
}
