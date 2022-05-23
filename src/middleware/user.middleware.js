const app = require('../app')
const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted, userLoginError } = require('../constant/err.type')
const bcrypt = require('bcryptjs')
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
    const res = await getUserInfo({ user_name })
    console.log(res)
    if (res) {
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (error) {
    console.log(error)
    return
  }
  await next()
}
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt) //密文
  ctx.request.body.password = hash
  await next()
}
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 1判断用户是否存在
  try {
    const res = getUserInfo({ user_name })
    if (!res) {
      console.log('error')
      return ctx.app.emit('error', userLoginError, ctx)
    }
  } catch (error) {
    console.log(error)
  }

  // 判断密码是否匹配
  await next()
}
module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
}
