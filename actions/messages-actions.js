'use server'
import { z } from "zod";
import { AddMessageQuery, DeleteMessageQuery, GetMessageQuery } from "@/lib/messageQuery";
import { cookies } from "next/headers";
import { getUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Zod schema for input validation
const messageSchema = z.object({
    name: z.string().min(4, { message: "Name is required" }).max(50, { message: "Name must not exceed 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters long" })
    .regex(/^\d[\d\s]*$/, { message: "Phone number must contain only numbers" }),

    message: z.string().min(1, { message: "Message is required" }).max(500, { message: "Message must not exceed 500 characters" }),
});

// Add message action function
export async function addMessageAction(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    const inputData = { name, email, phone, message };
    const validationResult = messageSchema.safeParse(inputData);

    if (!validationResult.success) {
        const errors = validationResult.error.format();
        // Transform errors to return them by field name
        const formattedErrors = Object.fromEntries(
            Object.entries(errors).map(([field, error]) => {
                const errorMessage = Array.isArray(error._errors) && error._errors.length > 0
                    ? error._errors[0]
                    : "Invalid input";
                return [field, errorMessage];
            })
        );
        return { errors: formattedErrors };
    }

    try {
        const result = await AddMessageQuery(name, email, phone, message);
        if (!result.success) {
            return {
                errors: { general: result.error },
            };
        }
        return { success: true };
    } catch (error) {
        console.error("Error adding message:", error);
        return {
            errors: { general: "An unexpected error occurred. Please try again later." },
        };
    }
}
//get messages info action function
export async function getMessageAction() {
    const sessionCookie = (await cookies()).get("auth_session")?.value;
      const userId = await getUserId(sessionCookie);
      if (!userId) {
        throw new Error("Invalid session.");
      }
      try{
        const result = await GetMessageQuery();
        if(!result.success){
            return {
                sucess:false
            }
        }
        return {success:true,data:result.data}
      }catch(error){
        console.error(error.message);
      }
}
//delete message
export async function DeleteMessageAction(formData) {
    const sessionCookie = (await cookies()).get("auth_session")?.value;
        const userId = await getUserId(sessionCookie);
        if (!userId) {
            throw new Error("Invalid session.");
            }
    const message_id= formData.get('message_id');
    try{
        const result = await DeleteMessageQuery(message_id);
        if(!result.success){
            return{
                success: false,
                errors: result.errors
            }
        }
        revalidatePath('/viewMessages');
        return { success: true };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                errors: error.message || "Something went wrong.",
            }
    }
}