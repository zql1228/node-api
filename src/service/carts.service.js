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
      include:{
        model:Goods,//关联的模型对象
        as:"goods_info",//更改属性名
        attributes:['id','goods_name','goods_price','goods_img']
      }
    })
    return {
      total: count,
      list: rows,
      pageNum,
      pageSize,
    }
  }
  async updateCarts(params){
    const {id,number,selected}=params
    const res=await Cart.findByPk(id)
    if(!res){ return ''}
    number!==undefined? res.number=number:''
    selected!==undefined ?res.selected=selected:''
    return await res.save()
  }
 
}
module.exports = new cartService()
