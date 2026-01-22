const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload');

// 1. Route cập nhật 
router.put('/update', authMiddleware, upload.single('avatar'), userController.updateProfile);

// 2. Route lấy bài viết (Phải đặt TRƯỚC route lấy profile nếu có trùng lặp cấu trúc)
router.get('/posts/:userId', userController.getUserPosts);

// 3. Route lấy profile (Dùng cho giao diện Profile)
router.get('/profile/:userId', userController.getUserProfile);

module.exports = router;