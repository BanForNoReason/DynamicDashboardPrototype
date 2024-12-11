// analytics router file, is responsible for mapping endpoint to the controller functions
import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();
router.get('/', getAnalytics);

export default router;