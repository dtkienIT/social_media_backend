const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize với đường dẫn từ .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Tắt log SQL để terminal sạch sẽ hơn
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Bắt buộc phải có để kết nối tới Render PostgreSQL
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối PostgreSQL (Render) thành công!');
  } catch (error) {
    console.error('❌ Lỗi kết nối Database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };