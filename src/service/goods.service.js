const Goods = require('../model/goods.model')
class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dateValues
  }
  async updateGoods(id, goods) {
    try {
      const res = await Goods.update(goods, { where: { id } })
      // console.log(res)
      return res[0]
    } catch (error) {
      console.log(error)
    }

    return res.dateValues[0]
  }
  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } })
    return res
  }
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } })
    return res
  }
  async getGoodsList(pageNum, pageSize) {
    // 1.获取总数
    const count = await Goods.count()
    // 2.获取分页
    const offset = (pageNum - 1) * pageSize
    const rows = await Goods.findAll({ offset, limit: pageSize * 1 })
    // const {count, rows} = await Goods.findAndCountAll({ offset, limit: pageSize * 1 })

    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    }
  }
}
module.exports = new GoodsService()
