// centralized axios api client, calls to the backend
import axios from 'axios';
const apiClient = axios.create ({
    baseURL: 'http://localhost:5000/api', //pointing to the backend
    header: { 'Content-Type': 'application.json' },
});

export default apiClient;