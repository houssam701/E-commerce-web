import Image from "next/image";
import Link from "next/link";

export default  function CartItem({data}){
    const price =
    data.discounted_price > 0 ? (
      <p className="mt-1 text-sm text-gray-500">
        ${data.discounted_price}{" "}
      </p>
    ) : (
      <p className="mt-1 text-sm text-gray-500">
        ${data.price}
      </p>
    );
    return (
    <div  className="group relative">
   <Image
    alt="anything"
    src={data.images?.[0]?.image_path || '/fallback-image.jpg'}
    width={400} // Specify width
    height={400} // Specify height
    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
/>
    <div className="mt-4 pl-1 flex justify-between">
        <div>
            <h3 className="text-sm text-gray-700">
            <Link href={`/item/${data.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {data.name}
            </Link>
            </h3>
            {price}
            </div>
        </div>
    </div>);
}