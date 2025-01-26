import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black py-8 px-8 font-[sans-serif] tracking-wide mt-16">
            <div className="relative max-w-screen-xl mx-auto">
              

                {/* Footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-10">
                    {/* About Us */}
                    <div className="lg:col-span-2 max-w-md">
                        <h4 className="text-lg font-semibold mb-6 text-gray-200">About Us</h4>
                        <p className="text-gray-400 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, mi eu pulvinar
                            cursus, sem elit interdum mauris.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-200">Services</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-300 text-base">
                                    Web Development
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-300 text-base">
                                    Mobile App Development
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-300 text-base">
                                    UI/UX Design
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-gray-300 text-base">
                                    Digital Marketing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-200">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="text-gray-400 text-base">123 Main Street</li>
                            <li className="text-gray-400 text-base">City, State, Country</li>
                            <li className="text-gray-400 text-base">contact@example.com</li>
                            <li className="text-gray-400 text-base">+1 234 567 890</li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-200">Follow Us</h4>
                        <ul className="flex flex-wrap gap-4">
                            {/* Social Icons */}
                            <li>
                                <a href="#" className="text-[#ef233c] hover:text-white">
                                    <FaFacebookF className="w-8 h-8" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#ef233c] hover:text-white">
                                    <FaLinkedinIn className="w-8 h-8" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#ef233c] hover:text-white">
                                    <FaInstagram className="w-8 h-8" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#ef233c] hover:text-white">
                                    <FaTwitter className="w-8 h-8" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-gray-900 py-4 px-4 -mx-8 text-center mt-10">
                <p className="text-gray-400 text-base">© <span className='text-[#ef233c]'>SHOPPY</span>CART. All rights reserved.</p>
            </div>
        </footer>
    );
}
