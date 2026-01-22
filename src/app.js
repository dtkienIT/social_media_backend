require('dotenv').config(); // LUÔN Ở DÒNG 1
const express = require('express');
const { connectDB, sequelize } = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const path = require('path');

const app = express();

// 1. Cấu hình Middlewares
app.use(cors());
app.use(express.json());

// 2. Định nghĩa Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// 3. (Tùy chọn) Bạn có thể giữ dòng này nếu vẫn muốn dùng thư mục uploads cũ cho việc khác
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Kết nối DB
connectDB();
sequelize.sync({ alter: true });

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});