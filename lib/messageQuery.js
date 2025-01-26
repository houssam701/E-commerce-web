import db from "./db";
//add message query 
export async function AddMessageQuery(name, email, phone, message) {
    let connection;
    try {
        connection = await db.getConnection();
        const query = `
            INSERT INTO users_messages (name, email, phone, message) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await connection.execute(query, [name, email, phone, message]);
        return { success: true, messageId: result.insertId };
    } catch (error) {
        console.error("Error adding message:", error);
        return { success: false, errors: 'Failed To Send Your Message, try again later!' };
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
//get all messages info
export async function GetMessageQuery() {
    let connection;
    try {
        connection = await db.getConnection(); // Get the database connection

        const [rows] = await connection.query(`
            SELECT * FROM users_messages
        `); // Query to fetch all records from the user_messages table

        return { success: true, data: rows }; // Return success and the fetched data
    } catch (error) {
        console.error("Error fetching messages:", error);
        return { success: false, error: "Failed to fetch messages" }; // Return an error message if something goes wrong
    } finally {
        if (connection) {
            connection.release(); // Ensure the connection is released back to the pool
        }
    }
}
//delete message query
export async function DeleteMessageQuery(message_id) {
    let connection;
    try {
        connection = await db.getConnection();
        const query = `
        DELETE FROM users_messages WHERE id = ?`;
        const result = await connection.query(query, [message_id]);
        return {
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            errors: 'Failed to do the order.',
        };
    } finally {
        if (connection) {
            connection.release();
        }
    }
}