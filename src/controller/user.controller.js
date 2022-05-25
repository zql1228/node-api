const jwt = require('jsonwebtoken')
const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
  async register(ctx, next) {
    //1.获取数据
    //console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    //2.操作数据库
    try {
      const res = await createUser(user_name, password)
      if (res) {
        ctx.body = {
          code: 0,
          message: '用户注册成功',
          result: {
            id: res.id,
            user_name: res.user_name,
          },
        }
      } else {
        ctx.app.emit('error', userRegisterError, ctx)
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', userRegisterError, ctx)
    }

    //3.返回结果
  }
  async login(ctx, next) {
    console.log('/////////////')
    const { user_name } = ctx.request.body
    // 1.获取用户信息
    try {
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
          userInfo: res,
        },
      }
    } catch (error) {
      console.log(error)
    }
  }
  async changePassword(ctx, next) {
    // 1.获取数据
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    // 2.操作数据库
    const res = await updateById({ id, password })
    // 3.返回结果
    console.log(res)
    res ? (ctx.body = { code: 0, message: '密码修改成功', result: '' }) : (ctx.body = { code: 10007, message: '修改密码失败', result: '' })
  }
}

module.exports = new UserController()
