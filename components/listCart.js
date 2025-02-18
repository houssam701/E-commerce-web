import Link from "next/link";

export default function ListCart({section}){
    return   <div className= "relative  max-w-[400px] w-full h-[270px] overflow-hidden rounded-md mr-5 ml-5 mt-4">
    <div 
            style={{ backgroundImage: `url(${section.image_path})` }}
    className="relative w-full h-[350px]  bg-cover bg-center bg-no-repeat hover:scale-105 transition-transform duration-500 group overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
    </div>
    <div className="text-white absolute top-[50%] left-[10%]">
        <h3 className="text-3xl font-bold mb-2">{section.title}</h3>
        <Link href={`/section/${section.title}`}><button className=" text-lg  p-4 rounded-[5px] bg-transparent border-white border-[1px] hover:bg-[#ef233c] duration-300">Shop Now</button></Link>
    </div>
</div>
}