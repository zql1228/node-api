const { invalidGoodsID } = require('../constant/err.type')
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: 'number',
    })
  } catch (error) {
    console.log(error)
    invalidGoodsID.error = error
    return ctx.app.emit('error', invalidGoodsID, ctx)
  }
  await next()
}
module.exports = {
  validator,
}
