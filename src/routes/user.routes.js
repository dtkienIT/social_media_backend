const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload');

// Cập nhật thông tin cá nhân (Họ tên, Avatar lên Cloudinary)
router.put('/update', authMiddleware, upload.single('avatar'), userController.updateProfile);

// Lấy thông tin chi tiết của một người dùng (Tên, Avatar) - QUAN TRỌNG ĐỂ HIỆN PROFILE
router.get('/:userId', userController.getUserProfile);

// Lấy danh sách bài viết của một người dùng cụ thể
router.get('/posts/:userId', userController.getUserPosts);

module.exports = router;