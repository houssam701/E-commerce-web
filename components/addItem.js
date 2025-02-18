'use client';
import { addSectionAction } from "@/actions/admin-Items";
import { useActionState, useEffect, useState } from "react";
import DeleteSectionModal from "./deleteSectionModal";
import { AddItemAction } from "@/actions/admin-items-cloud";
import { toast } from "react-toastify";

export default function AddItemComponent({sections}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [state,formAction] = useActionState(addSectionAction);
  const[status,dispatch] =useActionState(AddItemAction,{});
  useEffect(() => {
    if (state?.success) {
      toast.success("Section has been added successfully!");
    }
    if (status?.success) {
      toast.success("Item has been added successfully!");
      setSelectedImages([]);
    }

  }, [state?.success, state?.errors, status?.success, status?.errors]);

//images
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files.map((file) => file.name));
  };
 
  return (
      <div>
        <h1 className="text-3xl font-bold w-full bg-slate-300 p-4 rounded-sm">
          Add Item
          
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-20 w-full">

        <div className="flex flex-col max-w-[600px] mt-10 w-full ">
            <form
              action={formAction}
              className="flex flex-col max-w-[600px] w-full gap-4 bg-slate-300 p-4"
            >
              <label className="sm:text-xl text-lg">Section Name:</label>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Section Name"
                  className="border-transparent rounded-sm focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
                />
                <input
                  type="file"
                  name="image"
                  placeholder="Choose an image"
                  className="border-transparent rounded-sm bg-white focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
                />
                {state?.errors && (
                  <span className="text-red-600 p-1 mt-1">{state.errors}</span>
                )}
              </div>

         
               
                <button
                  type="submit"
                  className="bg-[#ef233c] text-white font-bold py-2 px-4 rounded-sm hover:bg-red-700 mt-4"
                >
                  Add Section
                </button>
              
            </form>

  {/* Table for Sections */}
  <div className="overflow-x-auto mt-6">
    {sections?.length > 0 ? (
      <table className="table-auto w-full  border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {section.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={section.image_path}
                  alt={section.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
              <DeleteSectionModal className="text-white p-2 bg-[#ef233c] rounded-sm hover:bg-red-700 " sectionId={section.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-gray-600 mt-4">No sections available.</p>
    )}
  </div>
</div>

        {/* end of section form !!! */}
        <form action={dispatch} className="flex flex-col max-w-[600px] w-full mt-10 gap-4 bg-slate-300 p-4">
          <label className="sm:text-xl text-lg">Item Name:</label>
          <div className="flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            className="border-transparent rounded-sm focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
          />
          {status?.errors?.name && <span className=" text-red-600 text-sm pl-1 mt-1">{status.errors.name}</span>}
          </div>
          
          <label className="sm:text-xl text-lg">Description:</label>
          <div className="flex flex-col"><input
            type="text"
            name="description"
            placeholder="Item description"
            className="border-transparent rounded-sm focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
          />
          {status?.errors?.description && <div className=" text-red-600 text-sm pl-1 mt-1">{status.errors.description}</div>}
          </div>
          
          <label className="sm:text-xl text-lg">Quantity:</label>
          <div className="flex flex-col"><input
            type="number"
            name="quantity"
            min={1}
            defaultValue={1}
            placeholder="Item Quantity"
            className="border-transparent rounded-sm p-2 focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
          /> 
          {status?.errors?.quantity && <div className=" text-red-600 text-sm pl-1 mt-1">{status.errors.quantity}</div>}
          </div>
          
          <label className="sm:text-xl text-lg">Item Price:</label>
          <div className="flex flex-col"><input
            type="text"
            name="price"
            placeholder="Price in $"
            className="border-transparent rounded-sm focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none"
          />
          {status?.errors?.price && <div className=" text-red-600 text-sm pl-1 mt-1">{status.errors.price}</div>}

          </div>
          
          <label className="sm:text-xl text-lg">Sections:</label>
          <select name="section" className=" border-transparent rounded-sm focus:border-[#ef233c] focus:bg-white focus:ring-0 focus:outline-none">
           {sections.map((section)=>(
            <option key={section.id} value={section.id}>{section.title}</option>
           ))}
          </select>
          <div className="flex flex-col">
            <label>Gender:</label>
            <div className="flex gap-4">
            <div className="flex items-center gap-1"><input type="radio" name="gender" value="Men"  /> Men</div>
            <div className="flex items-center gap-1"><input type="radio" name="gender" value="Women" /> Women</div>
            </div>
            {status?.errors?.gender && <div className=" text-red-600 text-sm pl-1 mt-1">{status.errors.gender}</div>}

          </div>
          <label className="sm:text-xl text-lg">Item Images:</label>
          <div className="flex flex-col">
             <div className="relative">
            <input
              type="file"
              name="images"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              multiple
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-sm bg-slate-100 h-32 hover:border-[#ef233c] p-2">
              {selectedImages.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {selectedImages.map((image, index) => (
                    <li key={index} className="text-sm">
                      {image}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  Click to upload images or drag and drop
                </p>
              )}
            </div>
          </div>
          {status?.errors?.images && <div className=" text-red-600 text-sm pl-1 mt-1">{status.errors.images}</div>}

          </div>
          <button
            type="submit"
            className="bg-[#ef233c] text-white font-bold py-2 px-4 rounded-sm hover:bg-red-700 mt-4"
          >
            Add Item  
          </button>
          
        </form>
        </div>
        
      </div>
  );
}
