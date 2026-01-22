const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        
        // Khi dùng Cloudinary, req.file.path chính là URL ảnh vĩnh viễn
        const imageUrl = req.file ? req.file.path : null;

        const newPost = await Post.create({
            content,
            image: imageUrl,
            userId: req.user.id 
        });

        // Trả về post kèm thông tin User để Frontend hiển thị được ngay mà không cần F5
        const postWithUser = await Post.findByPk(newPost.id, {
            include: [{ model: User, attributes: ['fullName', 'avatar'] }]
        });

        res.status(201).json({
            message: 'Đăng bài thành công!',
            post: postWithUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['fullName', 'avatar']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });

        const userId = req.user.id; // Lấy từ token xác thực
        let currentLikes = post.likes || [];

        if (currentLikes.includes(userId)) {
            // Đã like rồi -> Unlike
            currentLikes = currentLikes.filter(id => id !== userId);
        } else {
            // Chưa like -> Thêm like
            currentLikes.push(userId);
        }

        await post.update({ likes: currentLikes });
        res.json({ message: "Thành công", likes: currentLikes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });

        // Kiểm tra quyền sở hữu
        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: "Bạn không có quyền xóa bài viết này" });
        }

        await post.destroy();
        res.json({ message: "Xóa bài viết thành công" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

