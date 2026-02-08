const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

/**
 * Authentication Routes
 */

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

module.exports = router;
