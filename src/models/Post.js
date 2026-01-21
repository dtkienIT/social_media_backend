const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Post = sequelize.define('Post', {
  content: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING },
  likes: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] }
});

// Thiết lập mối quan hệ: Một User có nhiều Post
const User = require('./User');
User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;