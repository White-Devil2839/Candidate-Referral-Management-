const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication Middleware
 * Protects routes by verifying JWT token
 * Adds user information to request object
 */
const protect = async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header (format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token and decode user ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by ID and attach to request (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            // Continue to next middleware/route handler
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    // If no token found in headers
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token provided'
        });
    }
};

module.exports = { protect };
