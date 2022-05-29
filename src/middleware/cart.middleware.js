const { cartFormateError } = require('../constant/err.type')
const validator =(rules)=>{
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (error) {
      console.log(error)
      cartFormateError.error = error
      return ctx.app.emit('error', cartFormateError, ctx)
    }
    await next()
  }
}
 
module.exports = {
  validator,
}
