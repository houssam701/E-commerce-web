import { getItemsBy10MenAction, getItemsBy10WomenAction, getSectionsLimit4Action } from "@/actions/userItems-action";
import Footer from "@/components/footer";
import ListCart from "@/components/listCart";
import PromoSection from "@/components/promoSection";
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
        <PromoSection/>
        {/* cart items Men section */}
        <SliderItem data={itemsWomen}/>
        <SliderItem data={itemsMen}/>
        <Footer/>

    </>
}