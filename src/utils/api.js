// centralized axios API client, calls to the backend
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Pointing to the backend
    headers: { 'Content-Type': 'application/json' }, // Fix: 'headers' instead of 'header'
});

export default apiClient;
