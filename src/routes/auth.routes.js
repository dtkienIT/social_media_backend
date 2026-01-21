const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const uploadCloud = require('../middlewares/upload');
const authController = require('../controllers/auth.controller');

router.post('/register', uploadCloud.single('avatar'), authController.register);
router.post('/register', register);
router.post('/login', login);

module.exports = router;