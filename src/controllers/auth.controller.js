const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // 1. Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng!' });
        }

        // 2. Tạo người dùng mới (Password sẽ tự mã hóa nhờ Hook trong Model User.js)
        const newUser = await User.create({
            fullName,
            email,
            password
        });

        // 3. Tạo Token JWT để người dùng đăng nhập ngay sau khi đăng ký
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(201).json({
            message: 'Đăng ký thành công!',
            token,
            user: {
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};