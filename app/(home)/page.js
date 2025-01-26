import { getItemsBy10MenAction, getItemsBy10WomenAction, getSectionsLimit4Action } from "@/actions/userItems-action";
import Footer from "@/components/footer";
import ListCart from "@/components/listCart";
import ImageSlider from "@/components/slideHome";
import SliderItem from "@/components/sliderItem";
import { FaShippingFast } from "react-icons/fa";


export default async function HomePage(){
    const itemsMen = await getItemsBy10MenAction();
    const itemsWomen = await getItemsBy10WomenAction();
    const sections = await getSectionsLimit4Action();
    return <>
        <ImageSlider/>
        <div className="w-full flex justify-center text-2xl mt-10 items-center gap-3">
            <p className="font-bold sm:text-[25px] text-[20px]">Free Sheeping All Over Lebanon </p>
            <FaShippingFast className="text-3xl text-black" />
        </div>
        {/* list cart */}
       <div className="w-full flex justify-center mt-10 pt-[100px] pb-[100px] flex-wrap bg-white">
       {sections.data.length>0? 
       sections.data.map((section)=>  <ListCart key={section.id} section={section}/>

    ):
        <p>No Section Are Added Yet.</p>
    }
        </div>
        {/* break part */}
        <div className="relative w-full h-[400px] mx-auto overflow-hidden parent-container">
            <div className="relative w-full h-[400px] bg-image5 bg-cover bg-center bg-no-repeat flex justify-center items-center">
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20">
                    <h3 className="sm:text-2xl text-[#ef233c]">Up To 70% Off Now</h3>
                    <h1 className="sm:text-5xl text-3xl text-white font-bold">Mid Season Sales</h1>
                </div>
            </div>
        </div>
        {/* cart items Men section */}
        <SliderItem data={itemsWomen}/>
        <SliderItem data={itemsMen}/>
        <Footer/>

    </>
}