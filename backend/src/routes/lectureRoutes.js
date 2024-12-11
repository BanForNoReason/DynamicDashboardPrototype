import express from 'express';
import { getLecturesByCourseId } from '../controllers/lectureController.js';

const router = express.Router();

// Route to get lectures for a specific course
router.get('/:courseId/lectures', getLecturesByCourseId);

export default router;
