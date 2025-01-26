'use server';
import { getUserId } from "@/lib/auth";
import { AddOrderItemQuery, AddOrderQuery, DeleteOrderQuery, searchOrdersQuery } from "@/lib/order";
import { pusher } from "@/lib/pusher";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

// Validate user input schema
const loginSchema = z.object({
    email: z.string().email('Please enter a valid Email address'),
    name: z.string().min(4, 'Please enter a valid name'),
    address: z.string().min(5, 'Please enter a valid address'),
    phone: z.string().min(8, 'Please enter a valid phone number'),
});

export async function orderAction(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const address = formData.get('address');
    const phone = formData.get('phone');
    const cartItems = JSON.parse(formData.get('cartItems'));
    const total_price = formData.get('total_price');
    try {
        if(cartItems.length <= 0 ){
            return { errors: {cart:'Your Cart is Empty'} };
        }
        const user = await loginSchema.parseAsync({ name, email, address, phone });
       
        const result = await AddOrderQuery(name, email, phone, address, total_price);
        if (!result.success) {
            return { success: false, errors: result.errors };
        }

        const orderId = result.insertId;
        for (const item of cartItems) {
            await AddOrderItemQuery(orderId, item.id, item.quantity);
        }
        await pusher.trigger('admin-channel', 'new-order', {
            orderId,
            name,
            email,
            phone,
            address,
            cartItems,
            total_price,
          });
      
        console.log("Order action called"); // Log to ensure the function runs

        return { success: true };
    } catch (error) {
        console.error(error);
        if (error instanceof z.ZodError) {
            // Group errors by field name
            const fieldErrors = error.errors.reduce((acc, err) => {
                if (err.path[0]) {
                    acc[err.path[0]] = err.message;
                }
                return acc;
            }, {});

            return {
                success: false,
                errors: fieldErrors, // Structured errors by field
            };
        }

        return {
            success: false,
            errors: error.message || "Something went wrong.",
        };
    }
}
//delete order function action 
export async function DeleteOrderAction(formData) {
    const sessionCookie = (await cookies()).get("auth_session")?.value;
        const userId = await getUserId(sessionCookie);
        if (!userId) {
            throw new Error("Invalid session.");
            }
    const order_id= formData.get('order_id');
    try{
        const result = await DeleteOrderQuery(order_id);
        if(!result.success){
            return{
                success: false,
                errors: result.errors
            }
        }
        revalidatePath('/viewOrders');
        return { success: true };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                errors: error.message || "Something went wrong.",
            }
    }
}
//search order function
export async function SearchOrderAction(formData) {
    const sessionCookie = (await cookies()).get("auth_session")?.value;
    const userId = await getUserId(sessionCookie);
    if (!userId) {
        throw new Error("Invalid session.");
        }
    const searchQuery = formData.get('searchTerm');   
    try{
        const result = await searchOrdersQuery(searchQuery);
        if(!result.success){
            return{
                success: false,
                errors: result.errors
                }
        }
    return {
        success: true,
        data: result.data
    }
    }catch(error){
        console.error(error);
        return {
            success: false,
            errors: error.message || "Something went wrong.",
            }
    }
    
}