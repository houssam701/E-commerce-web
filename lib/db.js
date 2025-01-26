import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost', // Default XAMPP MySQL host
  user: 'root',      // Default XAMPP MySQL user
  password: '',      // Leave blank for XAMPP
  database: 'e_commerce_next',
  connectionLimit: 200,
});

export default db;
