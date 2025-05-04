import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export const connectToDatabase = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('Connected to the database pool');
  }
  return pool;
};

const getUsers = async () => {
  try {
    const conn = await connectToDatabase();
    const [rows] = await conn.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

const getUserById = async (id) => {
  const conn = await connectToDatabase();
  const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const createUser = async (user) => {
  const conn = await connectToDatabase();
  const [result] = await conn.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [user.name, user.email, user.password]
  );
  return result.insertId;
};

const updateUser = async (id, user) => {
  const conn = await connectToDatabase();
  await conn.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, id]);
};

const deleteUser = async (id) => {
  const conn = await connectToDatabase();
  await conn.query('DELETE FROM users WHERE id = ?', [id]);
};

const getUserByEmail = async (email) => {
  const conn = await connectToDatabase();
  const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const getUserByName = async (name) => {
  const conn = await connectToDatabase();
  const [rows] = await conn.query('SELECT * FROM users WHERE name = ?', [name]);
  return rows[0];
};

const getUserByIdAndEmail = async (id, email) => {
  const conn = await connectToDatabase();
  const [rows] = await conn.query('SELECT * FROM users WHERE id = ? AND email = ?', [id, email]);
  return rows[0];
};

const testDatabaseConnection = async () => {
  const conn = await connectToDatabase();
  const [rows] = await conn.query('SELECT 1');
  console.log('Database connection test successful:', rows);
};

// testDatabaseConnection();