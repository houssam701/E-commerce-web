'use server';
import db from './db';
export async function createUser(email, password) {
  let connection;

    try {
      connection = await db.getConnection();
      const [result] = await connection.execute(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, password]
      );
  
      // Return the inserted row ID
      return { success: true, insertId: result.insertId };
    } catch (error) {
      // Check if the error is due to a duplicate entry
      if (error.code === 'ER_DUP_ENTRY') {
          return {
              success: false,
              error: {
                  code: 'DUPLICATE_ENTRY',
                  message: 'Email is already taken!',
              },
          };
      }

      return { success: false, error };
  }finally {
    if (connection) {
        connection.release();
    }
  }
  }

export async function getUserByEmail(email) {
  let connection;
  try {
      connection = await db.getConnection();

      const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

      // Return the first result (if it exists) or null
      return rows.length > 0 ? rows[0] : null;
  } catch (error) {
      console.error("Error fetching user by email:", error);
      return {
        errors:'Can not login right now, Try Again Later!'
      };
  }finally {
    if (connection) {
        connection.release();
    }
  }
}