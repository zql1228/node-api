const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Goods = seq.define(
  'zd_goods',
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      commit: '商品名称',
    },
    goods_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      unique: true,
      commit: '商品价格',
    },
    goods_num: {
      allowNull: false,
      type: DataTypes.INTEGER,
      commit: '商品数量',
    },
    goods_img: {
      allowNull: false,
      type: DataTypes.STRING,
      commit: '商品图片url',
    },
  },
  {
    paranoid: true, //软删除
  }
)
//  Goods.sync({ force: true }) //强制同步数据库
module.exports = Goods
