'use server';
import { getUserId } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { AddSectionQuery, deleteSectionQuery, getSectionQuery } from "@/lib/itemQuery";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";



//add a section
const listVal = z.object({
    title: z.string().min(2, "Title must be at least 2 characters."),
    image: z
      .any()
      .refine(
        (file) => file && file instanceof File && file.type.startsWith("image/"),
        "Image file is required and must be a valid image format."
      ),
  });

export async function addSectionAction(prevData, formData) {
  const sessionCookie = (await cookies()).get("auth_session")?.value;
  const userId = await getUserId(sessionCookie);
  if (!userId) {
    throw new Error("Invalid session.");
  }

  const title = formData.get("title");
  const image = formData.get("image");

  try {
    // Validate the inputs
    listVal.parse({ title, image });

    if (!image || !(image instanceof File)) {
      throw new Error("Invalid image file.");
    }

    // Convert the File to a Buffer
    const buffer = Buffer.from(await image.arrayBuffer());


    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "your_folder_name" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      stream.end(buffer);
    });

    const { public_id: publicId, secure_url: imageUrl } = await uploadPromise;

    // Call AddSectionQuery with all parameters
    const result = await AddSectionQuery(title, userId, publicId, imageUrl);

    if (!result.success) {
      return {
        errors: result.errors,
      };
    }  
    revalidatePath("/addItems");
    return{
      success:true
    }
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return {
        errors: error.errors.map((e) => e.message).join(", "),
      };
    }
    return {
      errors: error.message || "Something went wrong.",
    };
  }

}


//get all from section
export async function getSectionsAction() {
    const sessionCookie = (await cookies()).get("auth_session")?.value;
    const userId = await getUserId(sessionCookie);
    if (!userId) {
        throw new Error("Invalid session.");
        }
    try{
        const result = await getSectionQuery(userId);
        if (!result.success) {
            return {
                errors: result.errors,
            };
        }
        return result.sections;
    }
    catch (error) {
        console.log(error);
        return {
                errors:'Failed to load Sections'
            }
    }
}
//delete section action
export async function deleteSectionAction(sectionId) {
        const sessionCookie = (await cookies()).get("auth_session")?.value;
        const userId = await getUserId(sessionCookie);
        if (!userId) {
            throw new new Error("Invalid session.");
            }
        try{
            const result = await deleteSectionQuery(sectionId, userId);
            if (!result.success) {
                return {
                    errors: result.errors,
                };
            }
            revalidatePath('/addItems')
            return {sections:result.sections ,success:true};
        }
        catch (error) {
            console.log(error);
            return {
                errors:'Failed to delete Section'
            }
        }
}