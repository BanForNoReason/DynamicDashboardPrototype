import pool from '../utils/db.js';

// Controller to get class groups for a specific lecture
export const getClassGroupsByLectureId = async (req, res) => {
    const { lectureId } = req.params; // Extract lectureId from the URL params

    try {
        const result = await pool.query(
            `SELECT DISTINCT class_group.* 
             FROM class_group
             JOIN student ON class_group.id = student.class_group_id
             JOIN module_attempt ON student.id = module_attempt.student_id
             JOIN module ON module_attempt.module_id = module.id
             WHERE module.lecture_id = $1`,
            [lectureId]
        );
        res.status(200).json(result.rows); // Return the rows as JSON
    } catch (error) {
        console.error('Error fetching class groups:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
