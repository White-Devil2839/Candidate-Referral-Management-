const Candidate = require('../models/Candidate');

/**
 * Analytics Controller
 * Provides data for charts and visualization
 */

/**
 * Get status distribution
 * GET /analytics/status-distribution
 * Returns: { Pending: count, Reviewed: count, Hired: count }
 */
const getStatusDistribution = async (req, res) => {
    try {
        let query = {};

        // Recruiters see only their own candidates' stats
        if (req.user.role === 'recruiter') {
            query.referredBy = req.user._id;
        }

        const distribution = await Candidate.aggregate([
            { $match: query },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format response
        const result = {
            Pending: 0,
            Reviewed: 0,
            Hired: 0
        };

        distribution.forEach(item => {
            result[item._id] = item.count;
        });

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Status distribution error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching status distribution'
        });
    }
};

/**
 * Get recruiter performance
 * GET /analytics/recruiter-performance
 * Admin only - No manager role
 * Returns: Array of { recruiterName, candidateCount }
 */
const getRecruiterPerformance = async (req, res) => {
    try {
        // This endpoint is protected by requireRole(['admin']) middleware
        const performance = await Candidate.aggregate([
            {
                $group: {
                    _id: '$referredBy',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'recruiter'
                }
            },
            {
                $unwind: '$recruiter'
            },
            {
                $project: {
                    recruiterName: '$recruiter.name',
                    recruiterId: '$recruiter._id',
                    candidateCount: '$count'
                }
            },
            {
                $sort: { candidateCount: -1 }
            }
        ]);

        res.json({
            success: true,
            data: performance
        });
    } catch (error) {
        console.error('Recruiter performance error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching recruiter performance'
        });
    }
};

/**
 * Get personal stats (for recruiters)
 * GET /analytics/my-stats
 * Returns personal statistics for the logged-in recruiter
 */
const getMyStats = async (req, res) => {
    try {
        const stats = await Candidate.aggregate([
            { $match: { referredBy: req.user._id } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format response
        const result = {
            total: 0,
            pending: 0,
            reviewed: 0,
            hired: 0
        };

        stats.forEach(item => {
            result.total += item.count;
            result[item._id.toLowerCase()] = item.count;
        });

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('My stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching personal stats'
        });
    }
};

module.exports = {
    getStatusDistribution,
    getRecruiterPerformance,
    getMyStats
};
