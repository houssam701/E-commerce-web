import CartItem from "@/components/cartItem";
import Footer from "@/components/footer";
import { getItemsQueryBySectionAndGender } from "@/lib/userItems";

export default async function ItemSectionPage({params}){
    const section = (await params).section;
    const womenItems = await getItemsQueryBySectionAndGender(section,'Women');
    return <div className="bg-whitesmoke">
        {/* intro */}
                <div className="relative w-full h-[300px] mx-auto overflow-hidden parent-container">
                    <div className="w-full bg-watch h-[300px] bg-cover bg-center text-white flex justify-center items-center ">
                        <div className="flex justify-between  max-w-[1000px] w-[80%] mt-8">
                            <h1 className="sm:text-4xl text-2xl font-bold">Women</h1>
                            <p className="text-xl">Home &rsaquo; &rsaquo; Products &rsaquo; &rsaquo; Women
                            &rsaquo; &rsaquo;<span className="text-[#ef233c]"> {section}</span> </p>
                        </div>
                    </div>
                </div>
        {/*products list*/}
        <div className="bg-whitesmoke">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex justify-between">
              <h2 className="sm:text-4xl text-2xl font-bold tracking-tight text-gray-900">Women Section</h2>
            </div> 
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {womenItems.success && (womenItems.data.length>0? womenItems.data.map((item) => (
               <CartItem key={item.id} data={item}/>
              ))
            :<p className="text-xl text-red-500 ml-2">Not items Added yet!</p>
              )
              }
              
            </div>
          </div>
        </div>
        {/* footer */}
        <Footer/>
        
        </div>
}