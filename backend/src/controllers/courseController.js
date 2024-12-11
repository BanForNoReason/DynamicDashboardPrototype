import pool from '../utils/db.js'; // Import the database connection

// Controller to fetch all courses
export const getCourses = async (req, res) => {
    try {
        // Query the database for all courses
        const result = await pool.query('SELECT * FROM course');
        res.status(200).json(result.rows); // Return the rows as JSON
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
