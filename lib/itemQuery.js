import db from './db.js';

//add section to section table
export async function AddSectionQuery(title,user_id, publicId, imageUrl){
    let connection;
    try {
        //create a connection
        connection = await db.getConnection();
        const result = await connection.query(`INSERT INTO sections (title,user_id,image_path,public_id) VALUES (?, ?, ?, ?)`, [title,user_id, imageUrl, publicId]);
        //return the result

        return { success: true, insertId: result.insertId };
        } catch (error) {
            console.log(error);
            return {
                errors: 'Failed to add a section, try again later!'
            }
        }finally{
            if(connection){
                connection.release();
            }
        }
} 
//get Sections
export async function getSectionQuery(user_id) {
    let connection;
    try {
        //create a connection
        connection = await db.getConnection();
        const result = await connection.query(`SELECT * FROM sections WHERE user_id = ?`, [user_id]);
            return {sections:result[0], success:true};
        } catch (error) {
        console.log(error);
        return {
            errors: 'Failed to get sections, try again later!'
        }
        }finally{
            if(connection){
                connection.release();
            }
        }
}
//delete section
export async function deleteSectionQuery(id,user_id) {
    let connection;
    try {
        //create a connection
        connection = await db.getConnection();
        const result = await connection.query(`DELETE FROM sections WHERE id = ? AND user_id =?`, [id,user_id]);
        return { success: true };
        } catch (error) {
            console.log(error);
            return {
                errors: 'Failed to delete a section, try again later!'
                }
        }finally{
            if(connection){
                connection.release();
            }
        }
}
//add item
export async function addItemQuery(section_id, item_name, item_description,item_quantity, item_price, user_id,gender){
    let connection;
    try {
        //create a connection
        connection = await db.getConnection();
        const [result] = await connection.query(`INSERT INTO items (user_id, name, description,quantity,price,discounted_price,section_id,gender
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [user_id, item_name, item_description, item_quantity, item_price, 0, section_id,gender]);
                return { success: true, insertId:result.insertId };
                } catch (error) {
                    console.log(error);
                    return {
                        errors: 'Failed to add an item, try again later!'
                        }
                        }finally{
                            if(connection){
                                connection.release();
                            }
                            }
}
//add item images
export async function addItemImagesQuery(values){
    let connection;
    try {
        //create a connection
        connection = await db.getConnection();
        const result = await connection.query(`INSERT INTO item_images (item_id, image_path, public_id)
            VALUES ?`, [values]);
            return { success: true, insertId:result.insertId };
            } catch (error) {
                console.log(error);
                return {
                    errors: 'Failed to add an item image, try again later!'
                    }
            }finally{
                if(connection){
                    connection.release();
                }
            }
}
//get all items with there images
export async function getAllItemsQuery(){
    let connection;
    try {
        //create a connection
        connection = await db.getConnection();
        const [result] = await connection.query(`
            SELECT 
                i.id, 
                i.name, 
                i.description, 
                i.quantity, 
                i.price, 
                i.discounted_price, 
                i.section_id, 
                i.gender,
                s.title, -- Include the section title
                i.user_id, 
                GROUP_CONCAT(ii.image_path ORDER BY ii.id) AS image_paths,
                GROUP_CONCAT(ii.public_id ORDER BY ii.id) AS public_ids
            FROM 
                items i
            LEFT JOIN 
                item_images ii ON i.id = ii.item_id
            LEFT JOIN 
                sections s ON i.section_id = s.id -- Join with the sections table
            GROUP BY 
                i.id, s.title -- Group by item id and section title to avoid ambiguity
            ORDER BY 
                i.id DESC;
            `);
            const itemsWithImages = result.map(item => ({
            ...item,
            images:( item.image_paths || '').split(',').map((path, index) => ({
                image_path: path,
                public_id: (item.public_ids || '').split(',')[index]
            }))
            }));
            return {success:true, data:itemsWithImages};
            } catch (error) {
                console.log(error);
                return {
                    errors: 'Failed to get all items, try again later!'
                    }
            }finally{
                if(connection){
                    connection.release();
                    }
            }
        }
//get all items depending on item_id
export async function getItemByIdQuery(itemId) {
    let connection;
    try {
        // Create a connection
        connection = await db.getConnection();
        const [result] = await connection.query(`
            SELECT i.id, i.name, i.description, i.quantity, i.price, i.discounted_price, 
                    i.section_id, i.user_id, 
                    GROUP_CONCAT(ii.image_path ORDER BY ii.id) AS image_paths,
                    GROUP_CONCAT(ii.public_id ORDER BY ii.id) AS public_ids
            FROM items i
            LEFT JOIN item_images ii ON i.id = ii.item_id
            WHERE i.id = ?
            GROUP BY i.id
        `, [itemId]);
        if (result.length === 0) {
            return { success: false, errors: 'Item not found!' };
        }
        const item = result[0];
        const itemWithImages = {
            ...item,
            images: (item.image_paths || '').split(',').map((path, index) => ({
                image_path: path,
                public_id: (item.public_ids || '').split(',')[index]
            }))
        };
        return { success: true, data: itemWithImages };
    } catch (error) {
        console.error(error);
        return { errors: 'Failed to get item, try again later!' };
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
//delete item
export async function deleteItemQuery(itemId) {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await connection.query('DELETE FROM items WHERE id = ?', [itemId]);
        if (result.affectedRows === 0) {
            return { success: false, message: 'Item not found or already deleted.' };
        }
        return { success: true, message: 'Item successfully deleted.' };
    } catch (error) {
        console.error('Error deleting item:', error);
        return { success: false, errors: 'Failed to delete item, please try again later.' };
    } finally {
        if (connection) {
            connection.release(); // Release the connection back to the pool
        }
    }
}
//update item
export async function updateItemQuery(itemId, name, description, quantity, price, discounted_price, section_id,gender) {
    let connection;
    try {
        connection = await db.getConnection();
        
        // Proper SQL query with SET clause
        const result = await connection.query(
            'UPDATE items SET name = ?, description = ?, quantity = ?, price = ?, discounted_price = ?, section_id = ?, gender=? WHERE id = ?',
            [name, description, quantity, price, discounted_price, section_id, gender, itemId]
        );

        // Check if any rows were updated
        if (result.affectedRows === 0) {
            return { success: false, errors: 'Item not found or no changes were made.' };
        }

        return { success: true, message: 'Item successfully updated.' };
    } catch (error) {
        console.error('Error updating item:', error);
        return { success: false, errors: 'Failed to update item, please try again later.' };
    } finally {
        if (connection) {
            connection.release(); // Release the connection back to the pool
        }
    }
}

//delete item images
export async function deleteItemImageQuery(itemId) {
    let connection;
    try {
        connection = await db.getConnection();
        const result = await connection.query('DELETE FROM item_images WHERE item_id = ?', [itemId]);
        if (result.affectedRows === 0) {
            return { success: false, message: 'Item images not found or already deleted.' };
            }
            return { success: true, message: 'Item images successfully deleted.' };
            } catch (error) {
                console.error('Error deleting item images:', error);
                return { success: false, errors: 'Failed to delete item images, please try again later'
                }
            }
        }
//search item by name query
export async function searchItemQuery(searchTerm) {
    let connection;
    try {
        // Create a connection
        connection = await db.getConnection();

        // Execute the query with the search term
        const [result] = await connection.query(`
            SELECT 
                i.id, 
                i.name, 
                i.description, 
                i.quantity, 
                i.price, 
                i.discounted_price, 
                i.section_id, 
                i.gender,
                s.title, -- Include the section title
                i.user_id, 
                GROUP_CONCAT(ii.image_path ORDER BY ii.id) AS image_paths,
                GROUP_CONCAT(ii.public_id ORDER BY ii.id) AS public_ids
            FROM 
                items i
            LEFT JOIN 
                item_images ii ON i.id = ii.item_id
            LEFT JOIN 
                sections s ON i.section_id = s.id -- Join with the sections table
            WHERE 
                i.name LIKE CONCAT('%', ?, '%') -- Search condition for the item name
            GROUP BY 
                i.id, s.title -- Group by item id and section title to avoid ambiguity
            ORDER BY 
                i.id DESC;
        `, [searchTerm]);

        // Process the result to include images
        const itemsWithImages = result.map(item => ({
            ...item,
            images: (item.image_paths || '').split(',').map((path, index) => ({
                image_path: path,
                public_id: (item.public_ids || '').split(',')[index]
            }))
        }));

        return { success: true, data: itemsWithImages };
    } catch (error) {
        console.log(error);
        return {
            errors: 'Failed to search items, try again later!'
        };
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
