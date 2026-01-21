const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const uploadCloud = require('../middlewares/upload');
const authController = require('../controllers/auth.controller');


router.post('/login', authController.login);
router.post('/register', uploadCloud.single('avatar'), authController.register);

module.exports = router;