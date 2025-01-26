'use client';
import CartItem from "@/components/cartItem";
import Footer from "@/components/footer";
import { useSearch } from "@/contexts/SearchContext";

export default function SearchedPage() {
  const { searchResults } = useSearch();
  console.log(searchResults);
  return (
    <div className="bg-whitesmoke">
       {/* Intro */}
       <div className="relative w-full h-[300px] mx-auto overflow-hidden parent-container">
        <div className="w-full bg-watch h-[300px] bg-cover bg-center text-white flex justify-center items-center">
          <div className="flex justify-between max-w-[1000px] w-[80%] mt-8">
            <h1 className="sm:text-4xl text-2xl font-bold">Searched Items</h1>
            <p className="text-xl">Home &rsaquo; Products &rsaquo; <span className="text-[#ef233c]">Searched Item</span></p>
          </div>
        </div>
      </div>
          {/* Products List */}
            <div className="bg-whitesmoke">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
               

                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {searchResults.length>0 ? searchResults.map(item => (
                      <CartItem key={item.id} data={item} />
                    )):
                    <p className="text-red-500 text-2xl font-bold">No Item Found!</p>}
                  </div>
              </div>
            </div>
            {/* Footer */}
            <Footer />
    </div>
  );
}
