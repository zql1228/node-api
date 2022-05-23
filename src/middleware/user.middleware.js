const app = require('../app')
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted, userRegisterError } = require('../constant/err.type')
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  if (!user_name && !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const res = await getUserInfo(user_name)
    if (res) {
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (error) {
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}
module.exports = {
  userValidator,
  verifyUser,
}
