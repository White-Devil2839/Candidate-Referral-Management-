import axios from 'axios';

// Base URL for backend API
// Change this if your backend runs on a different port
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add JWT token to requests automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API calls
export const login = (email, password) => {
    return api.post('/auth/login', { email, password });
};

export const register = (name, email, password) => {
    return api.post('/auth/register', { name, email, password });
};

// Candidate API calls
export const getCandidates = () => {
    return api.get('/candidates');
};

export const createCandidate = (candidateData) => {
    return api.post('/candidates', candidateData);
};

export const updateCandidateStatus = (id, status) => {
    return api.put(`/candidates/${id}/status`, { status });
};

export const deleteCandidate = (id) => {
    return api.delete(`/candidates/${id}`);
};

export const getStats = () => {
    return api.get('/candidates/stats');
};

// Analytics API calls
export const getStatusDistribution = () => {
    return api.get('/analytics/status-distribution');
};

export const getRecruiterPerformance = () => {
    return api.get('/analytics/recruiter-performance');
};

export const getMyStats = () => {
    return api.get('/analytics/my-stats');
};

export default api;
