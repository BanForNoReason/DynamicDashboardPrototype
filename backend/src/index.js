import express from 'express';
import cors from 'cors'; 
import dotenv from 'dorenv';
import analyticicsRoutes from './routes/analyticicsRoutes.js'; //where the routes are defined

//The entry point for the backend server

dotenv.config();

const app = express();
app.use(cors()); //allows requests from frontend
app.use(express.json()); //we parse JSON requests

// the mounting routes
app.use('/api/analytics', analyticicsRoutes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port ${PORT}'));