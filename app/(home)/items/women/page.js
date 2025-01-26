'use client';

import { useState, useEffect } from 'react';
import { getItemsByWomenAction, getSectionsByGenderAction } from "@/actions/userItems-action";
import CartItem from "@/components/cartItem";
import DropDown from "@/components/dropDown";
import Footer from "@/components/footer";
import { ThreeDot } from 'react-loading-indicators';

export default function MenProductsPage() {
  const [womenItems, setWomenItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const itemsResponse = await getItemsByWomenAction(currentPage);
        const sectionsResponse = await getSectionsByGenderAction('Women');
      if (itemsResponse.success) {
        setWomenItems(itemsResponse.data);
      }
      if (sectionsResponse.success) {
        setSections(sectionsResponse);
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
            <h1 className="sm:text-4xl text-2xl font-bold">Women</h1>
            <p className="text-xl">Home &rsaquo; Products &rsaquo; <span className="text-[#ef233c]">Women</span></p>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-whitesmoke">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between">
            <h2 className="sm:text-4xl text-2xl font-bold tracking-tight text-gray-900">Women Section</h2>
            <DropDown sections={sections || []} href="women" />
            </div>

          {loading ? (
              <div className='w-full  flex justify-center items-center'>
              <ThreeDot variant="bounce" color="#e70026" size="medium" text="" textColor="#f10707" />
              </div>      
            ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {womenItems.length>0 ?womenItems.map(item => (
                <CartItem key={item.id} data={item} />
              )):
              <p className='text-red-500 text-xl ml-2'> No Items Added Yet!</p>}
            </div>
          )}

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
                womenItems.length < 3
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#ef233c] hover:bg-[#ef233bb7]'
              }`}
              disabled={womenItems.length < 5}
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
