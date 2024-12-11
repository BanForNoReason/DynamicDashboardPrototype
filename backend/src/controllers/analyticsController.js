// We handle the logiv for fetching analytical data here
import pool from '../utils/db.js';

export const getAnalytics = async (req, res) => {
  const { course_id, lecture_id, class_ids } = req.query;

  if (!course_id || !lecture_id) {
    return res.status(400).json({ error: 'Course ID and Lecture ID are required.' });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE attempted) AS attempted_count,
        COUNT(*) FILTER (WHERE NOT attempted) AS not_attempted_count,
        COUNT(*) FILTER (WHERE correct) * 100.0 / COUNT(*) AS correct_percentage,
        COUNT(*) FILTER (WHERE NOT correct) * 100.0 / COUNT(*) AS incorrect_percentage
      FROM module_attempt
      WHERE module_id IN (
        SELECT id FROM module WHERE lecture_id = $1
      )
      AND student_id IN (
        SELECT id FROM student WHERE class_group_id = ANY($2)
      );
      `,
      [lecture_id, class_ids]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
