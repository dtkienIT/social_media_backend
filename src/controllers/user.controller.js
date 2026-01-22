const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const userId = req.user.id; // Lấy từ auth.middleware

    let updateData = {};
    if (fullName) updateData.fullName = fullName;
    
    // Nếu có file ảnh được upload qua middleware upload.js
    if (req.file) {
      // Giả sử bạn lưu ảnh vào thư mục uploads
      updateData.avatar = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    await user.update(updateData);

    res.json({
      message: "Cập nhật thành công!",
      user: {
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};