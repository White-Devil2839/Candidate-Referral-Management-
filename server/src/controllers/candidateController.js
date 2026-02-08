const Candidate = require('../models/Candidate');

/**
 * Validate email format
 * Simple regex check for basic email validation
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number
 * Basic check: must be at least 10 digits
 */
const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
};

/**
 * Create a new candidate
 * POST /candidates
 */
const createCandidate = async (req, res) => {
    try {
        const { name, email, phone, jobTitle } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !jobTitle) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, email, phone, jobTitle'
            });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Validate phone number
        if (!isValidPhone(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid phone number (at least 10 digits)'
            });
        }

        // Create new candidate with referredBy set to current logged-in user
        const candidate = await Candidate.create({
            name,
            email,
            phone,
            jobTitle,
            referredBy: req.user._id // From auth middleware
        });

        res.status(201).json({
            success: true,
            data: candidate
        });
    } catch (error) {
        console.error('Create candidate error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating candidate'
        });
    }
};

/**
 * Get all candidates
 * GET /candidates
 * Role-based filtering:
 * - Recruiter: Only their own candidates
 * - Admin: All candidates
 */
const getCandidates = async (req, res) => {
    try {
        let query = {};

        // Recruiters can only see their own candidates
        if (req.user.role === 'recruiter') {
            query.referredBy = req.user._id;
        }
        // Admin can see all candidates (empty query)

        const candidates = await Candidate.find(query)
            .populate('referredBy', 'name email role') // Include referrer info
            .sort({ createdAt: -1 }); // Sort by newest first

        res.json({
            success: true,
            count: candidates.length,
            data: candidates
        });
    } catch (error) {
        console.error('Get candidates error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching candidates'
        });
    }
};

/**
 * Update candidate status
 * PUT /candidates/:id/status
 * Ownership verified by checkOwnership middleware
 */
const updateCandidateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status value
        const validStatuses = ['Pending', 'Reviewed', 'Hired'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status must be one of: Pending, Reviewed, Hired'
            });
        }

        // Find and update candidate (ownership already checked by middleware)
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        // Update status
        candidate.status = status;
        await candidate.save();

        // Populate referrer info for response
        await candidate.populate('referredBy', 'name email role');

        res.json({
            success: true,
            data: candidate
        });
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating candidate status'
        });
    }
};

/**
 * Delete a candidate
 * DELETE /candidates/:id
 */
const deleteCandidate = async (req, res) => {
    try {
        // Find and delete candidate by ID (only if it belongs to logged-in user)
        const candidate = await Candidate.findOneAndDelete({
            _id: req.params.id,
            referredBy: req.user._id
        });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        res.json({
            success: true,
            message: 'Candidate deleted successfully'
        });
    } catch (error) {
        console.error('Delete candidate error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting candidate'
        });
    }
};

/**
 * Get candidate statistics
 * GET /candidates/stats
 */
const getCandidateStats = async (req, res) => {
    try {
        // Get all candidates for the logged-in user
        const candidates = await Candidate.find({ referredBy: req.user._id });

        // Calculate statistics
        const stats = {
            total: candidates.length,
            pending: candidates.filter(c => c.status === 'Pending').length,
            reviewed: candidates.filter(c => c.status === 'Reviewed').length,
            hired: candidates.filter(c => c.status === 'Hired').length
        };

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching statistics'
        });
    }
};

module.exports = {
    createCandidate,
    getCandidates,
    updateCandidateStatus,
    deleteCandidate,
    getCandidateStats
};
