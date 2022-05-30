const { createAddr, findAllAddr, updateAddr } = require('../service/addr.service')
class addrController {
  async create(ctx) {
    //添加地址
    const user_id = ctx.state.user.id
    const { consignee, phone, address } = ctx.request.body
    const res = await createAddr({
      user_id,
      consignee,
      phone,
      address,
    })
    ctx.body = {
      code: 0,
      message: '添加地址成功',
      result: res,
    }
  }
  async findAll(ctx) {
    const res = await findAllAddr(ctx.state.user.id)
    ctx.body = {
      code: 0,
      message: '获取列表成功',
      result: {
        list: res,
      },
    }
  }
  async update(ctx) {
    try {
      const res = await updateAddr(ctx.request.params.id, ctx.request.body)
      res ? (ctx.body = { code: 0, message: '修改地址成功', result: '' }) : (ctx.body = { code: 0, message: '修改地址是失败', result: '' })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new addrController()
