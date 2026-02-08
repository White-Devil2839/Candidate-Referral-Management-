const express = require('express');
const { protect, requireRole, checkOwnership } = require('../middleware/rbac');
const Candidate = require('../models/Candidate');
const {
    createCandidate,
    getCandidates,
    updateCandidateStatus,
    deleteCandidate,
    getCandidateStats
} = require('../controllers/candidateController');

const router = express.Router();

/**
 * RBAC-protected Candidate Routes (Admin vs Recruiter Only)
 * 
 * GET /candidates -> Admin sees all, Recruiter sees own only
 * POST /candidates -> Admin and Recruiter
 * PUT /candidates/:id/status -> Admin and Recruiter (with ownership check)
 * DELETE /candidates/:id -> Admin can delete any, Recruiter only own
 */

// Get all candidates (with role-based filtering in controller)
router.get('/', protect, getCandidates);

// Create candidate (admin and recruiter only)
router.post('/', protect, requireRole(['admin', 'recruiter']), createCandidate);

// Update candidate status (all roles, but recruiters only own candidates)
router.put('/:id/status', protect, checkOwnership(Candidate, 'id'), updateCandidateStatus);

// Delete candidate (admin can delete any, recruiters only their own)
router.delete('/:id', protect, checkOwnership(Candidate, 'id'), deleteCandidate);

module.exports = router;
