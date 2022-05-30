const { addrFormateError } = require('../constant/err.type')
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      await ctx.verifyParams(rules)
    } catch (error) {
      console.log(error)
      addrFormateError.error = error
      ctx.app.emit('error', addrFormateError, ctx)
    }
    await next()
  }
}
module.exports = { validator }
