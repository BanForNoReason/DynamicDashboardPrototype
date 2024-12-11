// centralizing database connection logic, which is being done using the pg library
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, //this is the connection string for the database
});

export default pool;