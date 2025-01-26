import Footer from "@/components/footer";
import CheckoutTable from "@/components/table";

export default async function CartPage(){
  
    return <>
          {/* intro */}
          <div className="relative w-full h-[300px] mx-auto overflow-hidden parent-container">
                <div className="w-full bg-watch h-[300px] bg-cover bg-center text-white flex justify-center items-center ">
                    <div className="flex justify-between  max-w-[1000px] w-[80%] mt-8">
                        <h1 className="sm:text-4xl text-2xl font-bold">Cart</h1>
                        <p className="text-xl">Home &rsaquo; &rsaquo; <span className="text-[#ef233c]">Products</span> </p>
                    </div>
                </div>
            </div>
            <CheckoutTable/>
            <Footer/>
    </>
}