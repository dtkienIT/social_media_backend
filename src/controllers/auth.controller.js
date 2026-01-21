const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Nếu có file gửi lên, lấy URL từ Cloudinary, nếu không dùng ảnh mặc định
    const avatarUrl = req.file ? req.file.path : 'https://bit.ly/default-avatar';

    const newUser = await User.create({
      fullName,
      email,
      password,
      avatar: avatarUrl // Lưu link ảnh vào Postgres
    });

    res.status(201).json({ message: 'Đăng ký thành công!', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Tìm người dùng theo email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại!' });
        }

        // 2. Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng!' });
        }

        // 3. Tạo Token (Thẻ bài xác thực)
        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' } // Token có hạn 7 ngày
        );

        res.json({
            message: 'Đăng nhập thành công!',
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};