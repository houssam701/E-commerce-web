import Footer from "@/components/footer";
import { getItemByIdAction } from "@/actions/userItems-action";
import ItemDetails from "@/components/ItemDetails";

export default async function ItemPage({params}){
    const itemId = (await params).id;
    const item = await getItemByIdAction(itemId);
    return <>
        {/* intro */}
        <div className="relative w-full h-[300px] mx-auto overflow-hidden parent-container">
                <div className="w-full bg-watch h-[300px] bg-cover bg-center text-white flex justify-center items-center ">
                    <div className="flex justify-between  max-w-[1000px] w-[80%] mt-8">
                        <p className="text-xl">Home &rsaquo; &rsaquo; <span className="text-[#ef233c]">Products</span> </p>
                    </div>
                </div>
            </div>
        {/* product Details */}
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 mt-4">
        <ItemDetails item={item.data}/>
        </div>
        {/* footer */}
        <Footer/>
    </>
}