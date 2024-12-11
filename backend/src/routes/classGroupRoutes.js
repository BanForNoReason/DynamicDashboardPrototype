import express from 'express';
import { getClassGroupsByLectureId } from '../controllers/classGroupController.js';

const router = express.Router();

// Route to get class groups for a specific lecture
router.get('/:lectureId/class-groups', getClassGroupsByLectureId);

export default router;
