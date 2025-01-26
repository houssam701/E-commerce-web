'use client';

import { useState, useEffect } from 'react';
import { getallItemsAction, getSectionsByGenderAction } from "@/actions/userItems-action";
import CartItem from "@/components/cartItem";
import Footer from "@/components/footer";
import DropDown2 from './dropDown2';

export default function SectionPageComponent({section}) {
  const [menItems, setMenItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const itemsResponse = await getallItemsAction(currentPage,3,section);
      if (itemsResponse.success) {
        setMenItems(itemsResponse.data);
      }
    
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePreviousPage = () => setCurrentPage(prev => Math.max(1, prev - 1));
  return (
    <div className="bg-whitesmoke">
      {/* Intro */}
      <div className="relative w-full h-[300px] mx-auto overflow-hidden parent-container">
        <div className="w-full bg-watch h-[300px] bg-cover bg-center text-white flex justify-center items-center">
          <div className="flex justify-between max-w-[1000px] w-[80%] mt-8">
            <h1 className="sm:text-4xl text-2xl font-bold">{section}</h1>
            <p className="text-xl">Home &rsaquo; Products &rsaquo; <span className="text-[#ef233c]">{section}</span></p>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-whitesmoke">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h2 className="sm:text-4xl text-2xl font-bold tracking-tight text-gray-900">{section} Section</h2>
            <DropDown2 section={section} href={['men','women']} />
            </div>

       
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {menItems.length>0 ? menItems.map(item => (
                <CartItem key={item.id} data={item} />
              )):           
              <p className="text-xl text-red-500 ml-2">Not items Added yet!</p>
              }
            </div>
    

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              className={`px-6 py-2 text-white rounded-md ${
                currentPage === 1
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#ef233c] hover:bg-[#ef233bc7]'
              }`}
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <button
              className={`px-6 py-2 text-white rounded-md ${
                menItems.length < 3
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#ef233c] hover:bg-[#ef233bb7]'
              }`}
              disabled={menItems.length < 3}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>


        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
