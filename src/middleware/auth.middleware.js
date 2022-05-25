const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { TokenExpiredError, InvalidSignature, hasNotAdminPremisson } = require('../constant/err.type')
const auth = async (ctx, next) => {
  //权限
  const { authorization = '' } = ctx.request.header
  // console.log(authorization)
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token已过期', error)
        return ctx.app.emit('error', TokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', error)
        return ctx.app.emit('error', InvalidSignature, ctx)
    }
  }
  await next()
}
const hasAdminPremisson = async (ctx, next) => {
  const { is_admin } = ctx.state.user
  if (!is_admin) {
    console.error('没有权限')
    return ctx.app.emit('error', hasNotAdminPremisson, ctx)
  }
  await next()
}
module.exports = {
  auth,
  hasAdminPremisson,
}
