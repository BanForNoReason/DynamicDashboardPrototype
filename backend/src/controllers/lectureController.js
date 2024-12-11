import pool from '../utils/db.js';

// Controller to get lectures for a specific course
export const getLecturesByCourseId = async (req, res) => {
    const { courseId } = req.params; // Extract courseId from the URL params

    try {
        const result = await pool.query('SELECT * FROM lecture WHERE course_id = $1', [courseId]);
        res.status(200).json(result.rows); // Return the rows as JSON
    } catch (error) {
        console.error('Error fetching lectures:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
