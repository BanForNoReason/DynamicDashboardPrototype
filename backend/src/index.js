import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import analyticsRoutes from './routes/analyticsRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import lectureRoutes from './routes/lectureRoutes.js'; // Add lecture routes
import classGroupRoutes from './routes/classGroupRoutes.js'; // Add class group routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// mounted routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api', courseRoutes);
app.use('/api/courses', lectureRoutes);
app.use('/api/lectures', classGroupRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



// test curl command outline: curl -X GET "http://localhost:5000/api/analytics?course_id=<course_uuid>&lecture_id=<lecture_uuid>&class_ids[]=<class_group_uuid>"
// an actual test, for History, World War 1, Class 1 A: 
//curl -X GET "http://localhost:5000/api/analytics?course_id=0dd52d7e-ca5f-4279-b9c1-cf90f036d860&lecture_id=f9ab078f-454b-4a80-b8b0-fcb1617e054b&class_ids[]=71d959bc-c5dd-413d-9f97-3b4b2b5f0c35"
