const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * RBAC Middleware
 * 
 * Provides role-based access control for routes.
 * Must be used AFTER the protect middleware.
 */

/**
 * Require specific roles
 * Usage: requireRole(['admin', 'manager'])
 */
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required roles: ${allowedRoles.join(', ')}`
            });
        }

        next();
    };
};

/**
 * Check if user owns the resource
 * For recruiters to access only their own candidates
 */
const checkOwnership = (Model, resourceIdParam = 'id') => {
    return async (req, res, next) => {
        try {
            // Admin can access any resource
            if (req.user.role === 'admin') {
                return next();
            }

            // Recruiter must own the resource
            const resourceId = req.params[resourceIdParam];
            const resource = await Model.findById(resourceId);

            if (!resource) {
                return res.status(404).json({
                    success: false,
                    message: 'Resource not found'
                });
            }

            // Check if user owns this resource
            if (resource.referredBy.toString() !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. You can only access your own referrals'
                });
            }

            next();
        } catch (error) {
            console.error('Ownership check error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error during ownership verification'
            });
        }
    };
};

/**
 * Protect routes - verify JWT token
 * Extracts user info including role from token
 */
const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Also attach decoded token data for quick access
            req.tokenData = decoded;

            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token provided'
        });
    }
};

module.exports = {
    protect,
    requireRole,
    checkOwnership
};
