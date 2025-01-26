import db from './db';
//create orders
export async function AddOrderQuery(name,email,number,address,total_price) {
    let connection;
    try {
        connection = await db.getConnection();
        const currentDate = new Date();
        // Format the date as YYYY-MM-DD HH:MM:SS
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
      
        const [result] = await connection.query(`INSERT INTO orders (name,email,number,address,date,total_price) VALUES (?, ?, ?, ?, ?, ?)`,
            [name,email,number,address,formattedDate,total_price]);
        return { success: true, insertId: result.insertId };

    }catch(error){
        console.log(error);
        return {
            errors: 'Failed to send order! Try again later.'
        }
    }finally{
        if(connection){
            connection.release();
        }
    }
}
//add order_items
export async function AddOrderItemQuery(orderId, itemId, quantity) {
    let connection;
    try {
        connection = await db.getConnection();

        // Insert the order item into the database
        const query = `
            INSERT INTO order_items (order_id, item_id, quantity)
            VALUES (?, ?, ?)
        `;

        const [result] = await connection.query(query, [orderId, itemId, quantity]);

        // Return success with the inserted ID
        return { success: true, insertId: result.insertId };

    } catch (error) {
        console.error('Failed to add order item:', error);
        return {
            success: false,
            error: 'Failed to add order item! Please try again later.',
        };
    } finally {
        if (connection) {
            connection.release(); // Release the connection back to the pool
        }
    }
}
//get all orders
export async function GetOrdersQuery() {
    let connection;
    try {
        connection = await db.getConnection();
        const query = `
            SELECT 
                o.*, 
                oi.quantity, 
                i.name AS item_name
            FROM 
                orders o
            JOIN 
                order_items oi ON o.id = oi.order_id
            JOIN 
                items i ON oi.item_id = i.id
        `;
        const [rows] = await connection.query(query);
        return {
            success: true,
            data: rows, // Return the enriched rows with order, quantity, and item name
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            errors: 'Failed to get orders! Try again later.',
        };
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
//delete order
export async function DeleteOrderQuery(orderId) {
    let connection;
        try {
            connection = await db.getConnection();
            const query = `
            DELETE FROM orders WHERE id = ?`;
            const result = await connection.query(query, [orderId]);
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
//search order query function
export async function searchOrdersQuery(searchQuery) {
    let connection ;
    try {
        connection = await db.getConnection();
        let query = `
       SELECT 
        o.*, 
        oi.quantity, 
        i.name AS item_name
      FROM 
        orders o
      JOIN 
        order_items oi ON o.id = oi.order_id
      JOIN 
        items i ON oi.item_id = i.id
      WHERE 
        o.id = ? 
        OR o.name LIKE ?
        `;

        const params = [
        isNaN(searchQuery) ? -1 : parseInt(searchQuery), // To ensure `id` is searched only when the input is numeric
        `%${searchQuery}%`, // Partial match for name
        ];

        const [rows] = await connection.execute(query, params);

        return {
            success: true,
            data: rows, // Return the enriched rows with order, quantity, and item name
        };
    } catch (error) {
      console.error('Database query error:', error.message);
      return{
        success: false,
        errors: 'Failed to search orders.',
      }
    } finally {
      connection.release();
    }
  }