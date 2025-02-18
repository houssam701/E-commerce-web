'use client';
import Link from "next/link";
import React, { useState, useEffect, startTransition } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";
import { searchItemAction } from "@/actions/userItems-action";
import { useSearch } from "@/contexts/SearchContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { setSearchResults } = useSearch();
  const router = useRouter();
  const path = usePathname();
  const { cart } = useCart();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  ///
  async function handleSubmitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("searchTerm", searchQuery);
        startTransition(async () => {
          const response = await searchItemAction(formData);
          if(response.success){
            setSearchResults(response.data); // Pass the fetched data to the context
            setSearchQuery('');
            router.push("/searchedItem"); // Navigate to the searched page
          }
        });
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50  duration-700 p-2 ${
        isScrolled ? "bg-white text-black" : "bg-transparent text-white p-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold "><span className="text-[#ef233c]">SHOPPY</span>CART</h1>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className={path===('/') ? 'text-[#ef233c]':'hover:text-[#ef233c]'}>
              Home
            </Link>
           
            {/* Services Dropdown */}
            <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={path.startsWith('/items') ? 'text-[#ef233c] flex items-center':'hover:text-[#ef233c] flex items-center'}
            >
              Sections
              <motion.svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                  <Link 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  href="/items/men" 
                  className="block px-4 py-2 hover:bg-[#ef233c] hover:text-white">
                    Men Section
                  </Link>
                  <Link
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  href="/items/women" className="block px-4 py-2 hover:bg-[#ef233c] hover:text-white">
                    Women Section
                  </Link>
                </div>
              )}
            </div>
            <Link href="/cart" className={path.startsWith('/cart') ? 'text-[#ef233c]':'hover:text-[#ef233c]'}>
              Cart
            </Link>
            <Link href="/contact" className={path.startsWith('/contact') ? 'text-[#ef233c]':'hover:text-[#ef233c]'}>
              Contact
            </Link>
            {/* Search Feature */}
              <form onSubmit={handleSubmitForm} className={`flex items-center bg-gray-700 rounded px-2 py-1 gap-2 ${
            isScrolled ? "bg-transparent text-black" : "bg-transparent text-black p-2"
            }`}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-transparent ${isScrolled ? 'text-black ':'text-white '} px-2 focus:border-[#ef233c] focus:ring-0 focus:outline-none`}
              />
              <button className="focus:outline-none">
                <FaSearch className={`${isScrolled ? 'text-black ':'text-white '} w-6 h-6 hover:text-[#ef233c]`} />
              </button>
              </form>
            

            {/* Cart Icon */}
            <div className="flex items-center space-x-2">
              <FaShoppingCart className={`${isScrolled ? 'text-black ':'text-white '} w-6 h-6`} />
              <span className="text-sm">{cart.length}</span>
            </div>
          </div>

          {/* Burger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16  "
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black">
          <Link 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          href="/" className="block px-4 py-4 hover:bg-gray-400">
            Home
          </Link>
          <Link
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          href="/" className="block px-4 py-4 hover:bg-gray-400">
            About
          </Link>
          {/* Services Dropdown for Mobile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className=" flex items-center w-full text-left px-4 py-4 hover:bg-gray-400 "
            >
              Sections
              <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
            </button>
            {isDropdownOpen && (
              <div className="bg-gray-200">
                <Link
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                href="/items/men" className="block px-4 py-2 hover:bg-gray-400">
                  Men Section
                </Link>
                <Link 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                href="/items/women" className="block px-4 py-2 hover:bg-gray-400">
                  Women Section
                </Link>
  
              </div>
            )}
          </div>
          <Link 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          href="/cart" className="block px-4 py-4 hover:bg-gray-400">
            Cart
          </Link>
          <Link 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          href="/contact" className="block px-4 py-4 hover:bg-gray-400">
            Contact
          </Link>
          {/* Search Feature for Mobile */}
          <form onSubmit={handleSubmitForm} className="flex gap-4  items-center bg-white text-black rounded px-4 py-4 mt-2">
            <button className="focus:outline-none">
              <FaSearch className="text-black w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-black p-1 rounded-sm w-full focus:border-[#ef233c] focus:ring-0 focus:outline-none "
            />
            
          </form>

       
        </div>
      )}
    </nav>
  );
}
