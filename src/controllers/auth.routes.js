const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Đường dẫn sẽ là: /api/auth/register
router.post('/register', authController.register);

module.exports = router;