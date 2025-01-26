'use server';

import { getUserByEmail } from "@/lib/admin-auth";
import { createAuthSession, destroySession } from "@/lib/auth";
import { verifyPassword } from "@/lib/hash";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email('Please enter a valid Email address'), // Email validation
    password: z.string().min(4,'Enter a valid password') // Password validation
});
export async function login(prevState, formData) {
    // Extract email and password from the form data
    const email = formData.get('email');
    const password = formData.get('password');

    // Validate the form data using `zod`
    try {
        loginSchema.parse({ email, password }); // Validate inputs
 
        const existingUser = await getUserByEmail(email);
        if(existingUser?.errors){
            return{
                errors: {general:existingUser.errors} 
            }
        }
        if (!existingUser) {
            return {
                formData: { email }, // Preserve the entered email
                errors: { email: 'This email is not valid.' },
            };
        }

        // Verify the password
        const isValidPassword = verifyPassword(existingUser.password, password);
        if (!isValidPassword) {
            return {
                formData: { email }, 
                errors: { password: 'The password is incorrect.' },
            };
        }
        // Create an authentication session and redirect
        await createAuthSession(existingUser.id);
        redirect('/viewOrders');
    } catch (error) {
        // Handle zod validation errors
        if (error instanceof z.ZodError) {
            const errors = error.errors.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message; // Map errors to their respective fields
                return acc;
            }, {});
            return {
                formData: { email }, // Preserve the entered email
                errors,
            };
        }
        throw error;
    }
}
export async function logout() {
    // Clear the authentication session
    await destroySession();
    redirect('/login');
    }