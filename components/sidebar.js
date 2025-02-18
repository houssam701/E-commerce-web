"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "@/actions/admin-auth-action";
import { usePathname } from "next/navigation";
export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex overflow-y-hidden relative">
      {/* Gray Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">
            <span className="text-[#ef233c]">SHOPPY</span>CART
          </h1>
          <button className="lg:hidden text-2xl" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                href="/addItems"
                className={path.startsWith('/addItems')?'px-6 py-3 bg-gray-700 block':'px-6 py-3 hover:bg-gray-700 block'}
                onClick={closeSidebar}
              >
                Add Items
              </Link>
            </li>
            <li>
              <Link
                href="/viewItems"
                className={path.startsWith('/viewItems')?'px-6 py-3 bg-gray-700 block':'px-6 py-3 hover:bg-gray-700 block'}
                onClick={closeSidebar}
              >
                View Items
              </Link>
            </li>
            <li>
              <Link
                href="/viewOrders"
                className={path.startsWith('/viewOrders')?'px-6 py-3 bg-gray-700 block':'px-6 py-3 hover:bg-gray-700 block'}
                onClick={closeSidebar}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/viewMessages"
                className={path.startsWith('/viewMessages')?'px-6 py-3 bg-gray-700 block':'px-6 py-3 hover:bg-gray-700 block'}
                onClick={closeSidebar}
              >
                Messages
              </Link>
            </li>
            <li>
              <form action={logout}> 
                <button
                className="px-6 py-3 hover:bg-[#ef233c] block w-full text-left"
                onClick={closeSidebar}
                >
                Logout
              </button>
              </form>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Burger Menu */}
        <button
          className="p-4 text-gray-800 text-2xl lg:hidden"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Children Content Wrapper */}
        <div className="flex-1">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
