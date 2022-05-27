const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
class cartService {
  async createOrUpdate(user_id, goods_id) {
    try {
      let res = await Cart.findOne({ where: { [Op.and]: { user_id, goods_id } } })
      if (res) {
        await res.increment('number')
        return await res.reload()
      } else {
        return await Cart.create({ user_id, goods_id })
      }
    } catch (error) {
      console.log(error)
    }
  }
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset,
      limit: pageSize * 1,
    })
    return {
      total: count,
      list: rows,
      pageNum,
      pageSize,
    }
  }
}
module.exports = new cartService()
