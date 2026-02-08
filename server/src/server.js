const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB database
connectDB();

/**
 * Middleware
 */

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Candidate Referral Management System API is running'
    });
});

// Authentication routes
app.use('/auth', authRoutes);

// Candidate routes
app.use('/candidates', candidateRoutes);

// Analytics routes  
app.use('/analytics', analyticsRoutes);

/**
 * Error handling for undefined routes
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

/**
 * Start server
 */
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
