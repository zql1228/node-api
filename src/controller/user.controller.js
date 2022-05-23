const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
class UserController {
  async register(ctx, next) {
    //1.获取数据
    //console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body
    //合法性
    // if (!user_name && !password) {
    //   console.error('用户名或密码为空', ctx.request.body)
    //   ctx.status = 400
    //   ctx.body = {
    //     code: '10001',
    //     messge: '用户名或密码为空',
    //     result: '',
    //   }
    //   return
    // }
    //合理性
    // if (await getUserInfo(user_name)) {
    //   ctx.status = 409
    //   ctx.body = {
    //     code: '10002',
    //     messge: '用户已存在',
    //     result: '',
    //   }
    //   return
    // }

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
    const { user_name } = ctx.require.body
    ctx.body = '登录成功'
  }
}
module.exports = new UserController()
