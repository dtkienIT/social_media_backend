require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
// Kết nối và đồng bộ Database
connectDB();
sequelize.sync({ alter: true }) // alter: true giúp cập nhật bảng nếu bạn thay đổi Model sau này
  .then(() => console.log('✅ Database & Tables đã đồng bộ!'))
  .catch(err => console.log('❌ Lỗi đồng bộ:', err));

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});