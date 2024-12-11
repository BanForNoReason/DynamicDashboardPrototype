import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import analyticicsRoutes from './routes/analyticsRoutes.js'; //where the routes are defined

//The entry point for the backend server

dotenv.config();

const app = express();
app.use(cors()); //allows requests from frontend
app.use(express.json()); //we parse JSON requests

// the mounting routes
app.use('/api/analytics', analyticicsRoutes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// test curl command outline: curl -X GET "http://localhost:5000/api/analytics?course_id=<course_uuid>&lecture_id=<lecture_uuid>&class_ids[]=<class_group_uuid>"
// an actual test, for History, World War 1, Class 1 A: 
//curl -X GET "http://localhost:5000/api/analytics?course_id=<0dd52d7e-ca5f-4279-b9c1-cf90f036d860>&lecture_id=<f9ab078f-454b-4a80-b8b0-fcb1617e054b>&class_ids[]=<71d959bc-c5dd-413d-9f97-3b4b2b5f0c35>"
