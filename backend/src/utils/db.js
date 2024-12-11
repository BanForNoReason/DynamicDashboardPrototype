// centralizing database connection logic, which is being done using the pg library
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const { Pool } = pkg;

// Debugging: Log the connection string will obsiouvly remove this in production
console.log('Connecting to DB with:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from .env
});

export default pool;
