const { cartFormateError } = require('../constant/err.type.js')
const { createOrUpdate, findCarts,updateCarts } = require('../service/carts.service.js')
class CartsController {
  async add(ctx) {
    // 1.解析user_id goods_id
    const user_id = ctx.state.user.id
    const goods_id = ctx.request.body.goods_id
    const res = await createOrUpdate(user_id, goods_id)
    ctx.body = {
      code: 0,
      message: '添加购物车成功',
      result: res,
    }
  }
  async findAll(ctx) {
    //获取购物车列表
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findCarts(pageNum, pageSize)
    ctx.body = {
      code: 0,
      message: '获取购物车列表成功',
      result: res,
    }
  }
  async update(ctx) {
    //获取购物车列表
    const {id} = ctx.request.params
    const {number,selected}=ctx.request.body
   if(number===undefined && selected===undefined){
     cartFormateError.message="number和selected不能同时为空"
     return ctx.app.emit('error',cartFormateError,ctx)
   }
  //  2.操作数据库
  const res=await updateCarts({id,number,selected})
    ctx.body = {
      code: 0,
      message: '获取购物车列表成功',
      result: res,
    }
  }
}
module.exports = new CartsController()
