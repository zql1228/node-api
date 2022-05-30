const { cartFormateError } = require('../constant/err.type.js')
const { createOrUpdate, findCarts, updateCarts, removeCarts, selectedAllCarts, unselectedAllCarts } = require('../service/carts.service.js')
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
    const { id } = ctx.request.params
    const { number, selected } = ctx.request.body
    if (number === undefined && selected === undefined) {
      cartFormateError.message = 'number和selected不能同时为空'
      return ctx.app.emit('error', cartFormateError, ctx)
    }
    //  2.操作数据库
    const res = await updateCarts({ id, number, selected })
    if (!res) {
      cartFormateError.message = '无效的id'
      return ctx.app.emit('error', cartFormateError, ctx)
    }
    ctx.body = {
      code: 0,
      message: '更新购物车列表成功',
      result: res,
    }
  }
  async remove(ctx) {
    const res = await removeCarts(ctx.request.body.ids)
    ctx.body = {
      code: 0,
      message: '删除成功',
      result: '',
    }
  }
  async selectedAll(ctx) {
    const res = await selectedAllCarts(ctx.state.user.id)
    ctx.body = {
      code: 0,
      message: '全选成功',
      result: '',
    }
  }
  async unselectedAll(ctx) {
    const res = await unselectedAllCarts(ctx.state.user.id)
    ctx.body = {
      code: 0,
      message: '取消全选成功',
      result: '',
    }
  }
}
module.exports = new CartsController()
