import express from 'express';
import { getCourses } from '../controllers/courseController.js';

const router = express.Router();

// Define the /api/courses route
router.get('/courses', getCourses);

export default router;
