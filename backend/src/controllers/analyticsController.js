// We handle the logiv for fetching analytical data here
import pool from '../utils/db.js';

export const getAnalytics = async (req, res) => {
  const { course_id, lecture_id, class_ids } = req.query;

  if (!course_id || !lecture_id || !class_ids) {
    return res.status(400).json({ error: 'Missing required parameters: course_id, lecture_id, or class_ids' });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        COUNT(*) FILTER (WHERE attempted) AS attempted_count,
        COUNT(*) FILTER (WHERE NOT attempted) AS not_attempted_count,
        CASE WHEN COUNT(*) = 0 THEN 0 ELSE COUNT(*) FILTER (WHERE correct) * 100.0 / COUNT(*) END AS correct_percentage,
        CASE WHEN COUNT(*) = 0 THEN 0 ELSE COUNT(*) FILTER (WHERE NOT correct) * 100.0 / COUNT(*) END AS incorrect_percentage
      FROM module_attempt
      WHERE module_id IN (
        SELECT id FROM module WHERE lecture_id = $1
      )
      AND student_id IN (
        SELECT id FROM student WHERE class_group_id = ANY($2::uuid[])
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

