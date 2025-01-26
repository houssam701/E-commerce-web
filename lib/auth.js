import { Lucia } from "lucia";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
import db from "./db"; // Ensure db is your MySQL connection pool instance
import { cookies } from "next/headers";

// MySQL adapter
const adapter = new Mysql2Adapter(db, {
    user: "users",
    session: "sessions",
});

// Configure Lucia
const sessionDuration = 60 * 60 * 1000; // 1 hour in milliseconds
const sessionCookieConfig = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "Strict",
};

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            ...sessionCookieConfig,
        },
    },
});

// Function to create an authentication session
export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {
        expires_at: new Date(Date.now() + sessionDuration), // Explicit session expiration
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    // Override maxAge to 1 hour
    const attributes = {
        ...sessionCookie.attributes,
        maxAge: 60 * 60 * 24, // 1 hour in seconds
    };

    console.log("Updated Session Cookie Attributes:", attributes);

    (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        attributes // Use updated attributes
    );
}


// Function to verify an authentication session
export async function verifyAuth() {
    const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
    if (!sessionCookie) {
        return {
            user: null,
            session: null,
        };
    }

    const sessionId = sessionCookie.value;
    if (!sessionId) {
        return {
            user: null,
            session: null,
        };
    }

    const result = await lucia.validateSession(sessionId);

    try {
        if (result.session && result.session.fresh) {
            const expirationDate = new Date(Date.now() + sessionDuration).toUTCString();
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                {
                    ...sessionCookie.attributes,
                    expires: expirationDate,
                }
            );
        }

        if (!result.session) {
            const blankSessionCookie = lucia.createBlankSessionCookie();
            (await cookies()).set(
                blankSessionCookie.name,
                blankSessionCookie.value,
                blankSessionCookie.attributes
            );
        }
    } catch (error) {
        console.error("Session validation error:", error);
    }

    return result;
}

// Function to destroy an authentication session
export async function destroySession() {
    const { session } = await verifyAuth();
    if (!session) {
        return {
            error: "Unauthorized!",
        };
    }

    await lucia.invalidateSession(session.id); // Delete the session from the database

    // Clear the cookie from the browser
    const blankSessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(
        blankSessionCookie.name,
        blankSessionCookie.value,
        blankSessionCookie.attributes
    );
}

// Function to get user ID by session token
export async function getUserId(sessionToken) {
    let connection;
    try {
        connection = await db.getConnection();
        const query = `
            SELECT user_id 
            FROM sessions 
            WHERE id = ?
        `;
        const [rows] = await connection.query(query, [sessionToken]);

        if (rows.length === 0) {
            return null; // No user found for the given session token
        }

        return rows[0].user_id; // Return the user_id
    } catch (error) {
        console.error("Error retrieving user ID:", error);
        throw new Error("Unable to retrieve user ID.");
    } finally {
        if (connection) {
            // Release the connection back to the pool
            connection.release();
        }
    }
}
