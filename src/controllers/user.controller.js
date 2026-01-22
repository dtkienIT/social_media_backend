const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const userId = req.user.id; // Lấy từ auth.middleware

    let updateData = {};
    if (fullName) updateData.fullName = fullName;
    
    // Khi dùng Cloudinary qua multer-storage-cloudinary:
    // req.file.path sẽ chứa URL đầy đủ (ví dụ: https://res.cloudinary.com/...)
    if (req.file) {
      updateData.avatar = req.file.path; 
    }

    // Kiểm tra tính hợp lệ: Nếu không có gì để cập nhật thì báo lỗi nhẹ
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Không có thông tin nào để cập nhật" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Cập nhật vào Database
    await user.update(updateData);

    // Trả về dữ liệu mới nhất
    res.json({
      message: "Cập nhật thành công!",
      user: {
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar // Bây giờ là link https://...
      }
    });
  } catch (error) {
    console.error("Lỗi updateProfile:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật profile" });
  }
};

exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { userId: req.params.userId },
            include: [{ model: User, attributes: ['fullName', 'avatar'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

