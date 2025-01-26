'use server';

import { getUserId } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { Readable } from 'stream';
import { addItemImagesQuery, addItemQuery, deleteItemImageQuery, deleteItemQuery, getAllItemsQuery, getItemByIdQuery, searchItemQuery, updateItemQuery } from "@/lib/itemQuery";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

//add item action function
const fileSchema = z
  .instanceof(File)
  .refine(file => file.type.startsWith("image/"), {
    message: "Only image files are allowed.",
  })
  .refine(file => file.size > 0, {
    message: "File cannot be empty.",
  })
  .refine(file => file.size <= 5 * 1024 * 1024, {
    message: "File size must not exceed 5MB.",
  });

// Validation for multiple files
const imagesSchema = z
  .array(fileSchema)
  .min(1, { message: "At least one image is required." })
  .max(5, { message: "You can upload a maximum of 5 images." });
const listVal = z.object({
    name: z.string().min(2, "Item name must be at least 2 characters."),
    description: z.string().min(5, "Item description must be at least 5 characters."),
    price: z.number().positive("Item must have a valid price."), // Ensures it's a positive number (decimals allowed)
    price: z
    .string()
    .transform((value) => value.trim()) // Remove extra spaces
    .refine((value) => /^[0-9]+(\.[0-9]+)?$/.test(value), {
      message: "Price must be a valid number.",
    }) // Allow only numbers and decimals
    .transform((value) => parseFloat(value)) // Convert to number
    .refine((value) => value > 0, { message: "Price must be a number." }),
    quantity: z
    .string()
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Quantity must be a whole number.",
    }) // Ensure it's an integer
    .transform((value) => parseInt(value, 10)) // Convert to number
    .refine((value) => value >= 1, { message: "Quantity must be at least 1." }),
    images: imagesSchema, // Validation for image files
    gender: z.string().nullable().refine(
      (value) => {
        return value === "Men" || value === "Women";
      },
      { message: "You must select either 'Man' or 'Woman'." }
    ),

});
  
export async function AddItemAction(prevdata,formData) {
      const sessionCookie = (await cookies()).get("auth_session")?.value;
        const userId = await getUserId(sessionCookie);
        if (!userId) {
            throw new Error("Invalid session.");
        }
        const name = formData.get('name');
        const description = formData.get('description');
        const quantity = formData.get('quantity');
        const price = formData.get('price');
        const images = formData.getAll('images');
        const section=formData.get('section');
        const gender = (formData.get('gender') || "").trim(); // Ensure no leading/trailing spaces

        try{
            listVal.parse({ name, description, price, quantity,section,images,gender});
            const result = await addItemQuery(section,name,description,quantity,price,userId,gender);
            if(!result.success){
                return {
                    errors: result.errors,
                };                
            }
            const itemId = await result.insertId;
            const uploadedImages = [];
            for (const file of images) {
              const stream = file.stream();
              const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  { folder: "shoppyCart" },
                  (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                  }
                );
                Readable.from(stream).pipe(uploadStream);
              });
              uploadedImages.push({
                itemId:itemId,
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
              });
            }
            const values = uploadedImages.map((image) => [image.itemId, image.url, image.public_id]);
            const res = await addItemImagesQuery(values);//must take three things itemId, url, public_id
            if(!res.success){
              return {
                errors: res.errors,
                };
            }
            return { success: true, message: "Item added successfully" };
        }catch (error) {    
            console.log(error);
            if (error instanceof z.ZodError) {
                // Group errors by field name
                const fieldErrors = error.errors.reduce((acc, err) => {
                    if (err.path[0]) {
                        acc[err.path[0]] = err.message;
                    }
                    return acc;
                }, {});
    
                return {
                    errors: fieldErrors, // Structured errors by field
                };
            }
            return {
                errors: error.message || "Something went wrong." ,
            };
        
        }
}
//get all items action function
export async function getItemsAction() {
  const sessionCookie = (await cookies()).get("auth_session")?.value;
  const userId = await getUserId(sessionCookie);
  if (!userId) {
      throw new Error("Invalid session.");
  }
  try{
    const res = await getAllItemsQuery();
      if(!res.success){
        return{
          errors: res.errors,
          }
      }
    return {success:true,data:res.data};
  }catch(error){
    console.log(error);
      return {
        errors:'Failed to load items'
      }
    }
}
//get items action function by id
export async function getItemAction(itemId) {
  const sessionCookie = (await cookies()).get("auth_session")?.value;
  const userId = await getUserId(sessionCookie);
  if (!userId) {
      throw new Error("Invalid session.");
  }
  try{
    const res = await getItemByIdQuery(itemId);
      if(!res.success){
        return{
          errors: res.errors,
          }
      }
    return {success:true,data:res.data};
  }catch(error){
    console.log(error);
      return {
        errors:'Failed to load items'
      }
    }
}
//delete item
export async function deleteItemAction(formData) {
  const sessionCookie = (await cookies()).get("auth_session")?.value;
  const userId = await getUserId(sessionCookie);
  if (!userId) {
      throw new Error("Invalid session.");
  }
  const item_Id = formData.get('item_id');
  const images = formData.get('public_id');
  let imagesArray = [];
  imagesArray = JSON.parse(images);
      try{
          const res = await deleteItemQuery(item_Id);
          if(!res.success){
            return{
              errors: res.errors,
              }
              }
          const deleteResults = [];
            for (const image of imagesArray) {

                const result = await cloudinary.uploader.destroy(image.public_id);
                deleteResults.push({ public_id: image.public_id, result });
            }
          revalidatePath('/viewItems');
          return {success:true, message:res.message};
        }catch(error){
          console.log(error);
          return {
            errors:'Failed to delete items'
            }
        }
}
//update item action function
const listVal2 = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters."),
  description: z.string().min(5, "Item description must be at least 5 characters."),
  price: z.number().positive("Item must have a valid price."), // Ensures it's a positive number (decimals allowed)
  price: z
  .string()
  .transform((value) => value.trim()) // Remove extra spaces
  .refine((value) => /^[0-9]+(\.[0-9]+)?$/.test(value), {
    message: "Price must be a valid number.",
  }) // Allow only numbers and decimals
  .transform((value) => parseFloat(value)) // Convert to number
  .refine((value) => value > 0, { message: "Price must be a number." }),
  discounted_price: z
    .string()
    .transform((value) => value.trim()) // Remove extra spaces
    .refine((value) => /^[0-9]+(\.[0-9]+)?$/.test(value), {
      message: "Price must be a valid number.",
    }) // Ensure it's a valid decimal or integer
    .transform((value) => parseFloat(value)) // Convert to number
    .refine((value) => value >= 0, { message: "Price must be number." }),
  quantity: z
  .string()
  .refine((value) => /^[0-9]+$/.test(value), {
    message: "Quantity must be a whole number.",
  }) // Ensure it's an integer
  .transform((value) => parseInt(value, 10)) // Convert to number
  .refine((value) => value >= 1, { message: "Quantity must be at least 1." }),
  gender: z.string().nullable().refine(
    (value) => {
      return value === "Men" || value === "Women";
    },
    { message: "You must select either 'Man' or 'Woman'." }
  ),
});
export async function updateItemAction(formData) {
  const sessionCookie = (await cookies()).get("auth_session")?.value;
  const userId = await getUserId(sessionCookie);
  if (!userId) {
      throw new Error("Invalid session.");
  }
  const itemId= formData.get('item_id');
  const name = formData.get('name');
  const description = formData.get('description');
  const quantity = formData.get('quantity');
  const price = formData.get('price');
  const discounted_price = formData.get('discounted_price');
  const images = formData.getAll('images');
  const section_id=formData.get('section_id');
  const rawImagesId = formData.get("images_id");
  const gender = formData.get('gender');
try {
  //start of if 
  listVal2.parse({ name, description, price,discounted_price, quantity,gender});

  const resultItem = await updateItemQuery(itemId,name,description,quantity,price,discounted_price,section_id,gender);
  if (!resultItem.success) {
    return {
      errors: resultItem.errors,
      }
    }
  if(images.length>0){
    const images_id = JSON.parse(rawImagesId);
    const publicIds = images_id.map((image) => image.public_id);
    for (const image of publicIds) {
      const result = await cloudinary.uploader.destroy(image);
    }
    const deleteRes = await deleteItemImageQuery(itemId);
  
    const uploadedImages = [];
    for (const file of images) {
      const stream = file.stream();
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "shoppyCart" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(stream).pipe(uploadStream);
      });
      uploadedImages.push({
        itemId:itemId,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    }
    const values = uploadedImages.map((image) => [image.itemId, image.url, image.public_id]);
    const res = await addItemImagesQuery(values);//must take three things itemId, url, public_id
    if(!res.success){
      return {
        errors: res.errors,
        };
    }
    //and of if 
  } 
  revalidatePath('/viewItems');
  return {success:true,message:'Item updated successfully.'}
 

} catch (error) {
  console.log(error);
  if (error instanceof z.ZodError) {
    // Group errors by field name
    const fieldErrors = error.errors.reduce((acc, err) => {
        if (err.path[0]) {
            acc[err.path[0]] = err.message;
        }
        return acc;
    }, {});

    return {
        errors: fieldErrors, // Structured errors by field
    };
}
return {
    errors: error.message || "Something went wrong." ,
};}
}
//search function action
export async function searchItemAction(prevState,formData){
  const sessionCookie = (await cookies()).get("auth_session")?.value;
  const userId = await getUserId(sessionCookie);
  if (!userId) {
      throw new Error("Invalid session.");
  }
  const item_name = formData.get('name');
  try{
    const res = await searchItemQuery(item_name);
    if(!res.success){
      return {
        errors: res.errors,
        };
    }
    return {success:true,itemSearched:res.data};
  }catch(error){
    console.log(error);
    return {errors:'Something went wrong,try again later.'}
  }
}
