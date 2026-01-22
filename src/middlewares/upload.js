const multer = require('multer');
const path = require('path'); // THÊM DÒNG NÀY VÀO ĐẦU FILE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Đảm bảo thư mục này tồn tại
    cb(null, 'uploads/facebook_clone_uploads/');
  },
  filename: (req, file, cb) => {
    // Bây giờ path.extname sẽ hoạt động vì đã được khai báo
    const ext = path.extname(file.originalname); 
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });
module.exports = upload;