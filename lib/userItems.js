import db from './db.js';

//get items by max 10 items query for MEN
export async function getItemsQueryby10Men() {
  let connection;
  try {
    // Create a connection
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
          s.title AS section_title, -- Include the section title
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
          i.gender = 'Men' -- Filter items by gender
      GROUP BY 
          i.id, s.title -- Group by item id and section title to avoid ambiguity
      ORDER BY 
          i.id DESC
      LIMIT 10; -- Limit the query to 10 rows
    `);

    // Transform the result to include image objects
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
      errors: 'Failed to get all items, try again later!'
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
//get items by max 10 items query for WOMEN
export async function getItemsQueryby10Women() {
  let connection;
  try {
    // Create a connection
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
          s.title AS section_title, -- Include the section title
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
          i.gender = 'Women' -- Filter items by gender
      GROUP BY 
          i.id, s.title -- Group by item id and section title to avoid ambiguity
      ORDER BY 
          i.id DESC
      LIMIT 10; -- Limit the query to 10 rows
    `);

    // Transform the result to include image objects
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
      errors: 'Failed to get all items, try again later!'
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
//get item By id
export async function getItemById(itemId) {
  let connection;
  try {
      // Create a connection
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
          WHERE 
              i.id = ? -- Filter by the specific item ID
          GROUP BY 
              i.id, s.title -- Group by item id and section title to avoid ambiguity
          LIMIT 1; -- Ensure only one item is fetched
      `, [itemId]);

      if (result.length === 0) {
          return { success: false, errors: "Item not found" };
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
      return {
          success: false,
          errors: 'Failed to get the item, try again later!'
      };
  } finally {
      if (connection) {
          connection.release();
      }
  }
}
//get all items where gender = Men
export async function getItemsQueryMen(limit = 3, offset = 0) {
  let connection;
  try {
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
          s.title AS section_title,
          i.user_id, 
          GROUP_CONCAT(ii.image_path ORDER BY ii.id) AS image_paths,
          GROUP_CONCAT(ii.public_id ORDER BY ii.id) AS public_ids
      FROM 
          items i
      LEFT JOIN 
          item_images ii ON i.id = ii.item_id
      LEFT JOIN 
          sections s ON i.section_id = s.id
      WHERE 
          i.gender = 'Men'
      GROUP BY 
          i.id, s.title
      ORDER BY 
          i.id DESC
      LIMIT ? OFFSET ?;
    `, [limit, offset]);

    const itemsWithImages = result.map(item => ({
      ...item,
      images: (item.image_paths || '').split(',').map((path, index) => ({
        image_path: path,
        public_id: (item.public_ids || '').split(',')[index]
      }))
    }));

    return { success: true, data: itemsWithImages };
  } catch (error) {
    console.error(error);
    return {
      errors: 'Failed to get all items, try again later!'
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

//get all items where gender = Men
export async function getItemsQueryWomen(limit = 3, offset = 0) {
  let connection;
  try {
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
          s.title AS section_title,
          i.user_id, 
          GROUP_CONCAT(ii.image_path ORDER BY ii.id) AS image_paths,
          GROUP_CONCAT(ii.public_id ORDER BY ii.id) AS public_ids
      FROM 
          items i
      LEFT JOIN 
          item_images ii ON i.id = ii.item_id
      LEFT JOIN 
          sections s ON i.section_id = s.id
      WHERE 
          i.gender = 'Women'
      GROUP BY 
          i.id, s.title
      ORDER BY 
          i.id DESC
      LIMIT ? OFFSET ?;
    `, [limit, offset]);

    const itemsWithImages = result.map(item => ({
      ...item,
      images: (item.image_paths || '').split(',').map((path, index) => ({
        image_path: path,
        public_id: (item.public_ids || '').split(',')[index]
      }))
    }));

    return { success: true, data: itemsWithImages };
  } catch (error) {
    console.error(error);
    return {
      errors: 'Failed to get all items, try again later!'
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
//get items depending on there sections
export async function getItemsQueryBySectionAndGender(sectionName, gender) {
  let connection;
  try {
    // Create a connection
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
          s.title AS section_title, -- Include the section title
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
          s.title = ? AND i.gender = ? -- Filter by section name and gender
      GROUP BY 
          i.id, s.title -- Group by item id and section title to avoid ambiguity
      ORDER BY 
          i.id DESC;
    `, [sectionName, gender]); // Use placeholders to prevent SQL injection

    // Transform the result to include image objects
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
      errors: 'Failed to get items by section and gender, try again later!'
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
//get section where item.gender = Men
export async function getSectionsByGender(gender) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query(`
      SELECT DISTINCT 
          s.id, 
          s.title 
      FROM 
          sections s
      INNER JOIN 
          items i ON s.id = i.section_id
      WHERE 
          i.gender = ? -- Filter by gender
      ORDER BY 
          s.id ASC;
    `, [gender]); // Use a placeholder to prevent SQL injection

    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return {
      errors: 'Failed to get sections by gender, try again later!'
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
//get all info of section table
export async function GetSectionsLimit4Query() {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query('SELECT * FROM sections LIMIT 4');
    return { success: true, data: result };
  } catch (error) {
    console.log(error);
    return {
      errors: 'Failed to get sections, try again later!'
    };
  }
}
//get all items
export async function getAllItemsQuerry(limit = 3, offset = 0, section) {
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await connection.query(
      `
      SELECT 
          i.id, 
          i.name, 
          i.description, 
          i.quantity, 
          i.price, 
          i.discounted_price, 
          i.section_id, 
          i.gender,
          s.title AS section_title,
          i.user_id, 
          GROUP_CONCAT(ii.image_path ORDER BY ii.id) AS image_paths,
          GROUP_CONCAT(ii.public_id ORDER BY ii.id) AS public_ids
      FROM 
          items i
      LEFT JOIN 
          item_images ii ON i.id = ii.item_id
      LEFT JOIN 
          sections s ON i.section_id = s.id
      WHERE 
          s.title = ?
      GROUP BY 
          i.id, s.title
      ORDER BY 
          i.id DESC
      LIMIT ? OFFSET ?;
      `,
      [section, limit, offset]
    );

    const itemsWithImages = result.map(item => ({
      ...item,
      images: (item.image_paths || '').split(',').map((path, index) => ({
        image_path: path,
        public_id: (item.public_ids || '').split(',')[index]
      }))
    }));

    return { success: true, data: itemsWithImages };
  } catch (error) {
    console.error(error);
    return {
      errors: 'Failed to get all items, try again later!'
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
