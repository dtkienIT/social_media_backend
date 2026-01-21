const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Bạn cần đăng nhập!' });

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified; // Lưu thông tin user vào request để dùng ở các bước sau
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token không hợp lệ!' });
    }
};

module.exports = verifyToken;