const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/rbac');
const {
    getStatusDistribution,
    getRecruiterPerformance,
    getMyStats
} = require('../controllers/analyticsController');

/**
 * Analytics Routes (Admin & Recruiter Only - No Manager)
 * 
 * Simplified RBAC:
 * - Admin: All analytics endpoints
 * - Recruiter: Personal stats + status distribution only
 */

// Status distribution (all authenticated users)
router.get('/status-distribution', protect, getStatusDistribution);

// Recruiter performance (admin only)
router.get('/recruiter-performance', protect, requireRole(['admin']), getRecruiterPerformance);

// Personal stats (all users)
router.get('/my-stats', protect, getMyStats);

module.exports = router;
