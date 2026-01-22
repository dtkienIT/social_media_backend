const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình lưu trữ trực tiếp lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'facebook_clone_uploads', // Tên thư mục trên Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `avatar-${Date.now()}` // Tên file
  },
});

const upload = multer({ storage: storage });
module.exports = upload;