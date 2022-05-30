const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Address = seq.define('zd_address', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    commit: '收货人姓名',
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    commit: '手机号',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    commit: '收货地址',
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: '是否为默认地址',
  },
})
// Address.sync({ force: true })
module.exports = Address
