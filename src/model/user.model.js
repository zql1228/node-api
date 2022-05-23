const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = seq.define('zd_user', {
  // 在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    commit: '用户名 唯一',
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false,
    unique: true,
    commit: '密码',
  },
  is_admin: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.BOOLEAN,
    commit: '0 普通管理员 1，超级管理员',
  },
})
// User.sync({ force: true }) //强制同步数据库
module.exports = User
