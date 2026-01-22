const User = require('../models/User');
const Post = require('../models/Post'); // Đảm bảo đã import model Post

// 1. Cập nhật thông tin cá nhân
exports.updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    const userId = req.user.id;

    let updateData = {};
    if (fullName) updateData.fullName = fullName;
    
    // Lưu URL từ Cloudinary vào Database
    if (req.file) {
      updateData.avatar = req.file.path; 
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Không có thông tin nào để cập nhật" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

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
    console.error("Lỗi updateProfile:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật profile" });
  }
};

// 2. Lấy thông tin cơ bản của User (Để hiện tên và ảnh trên trang Profile)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'fullName', 'avatar']
    });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    // Trả về object user để Frontend dùng: res.data.user
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Lấy danh sách bài viết của User
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.params.userId },
      include: [{ 
        model: User, 
        attributes: ['fullName', 'avatar'] 
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    console.error("Lỗi getUserPosts:", error);
    res.status(500).json({ error: error.message });
  }
};