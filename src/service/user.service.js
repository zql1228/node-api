const User = require('../model/user.model')
class UserService {
  async createUser(user_name, password) {
    //todo:写入数据库
    const res = await User.create({ user_name, password })
    return res.dataValues
  }
  async getUserInfo({ id, user_name, is_admin, password }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    is_admin && Object.assign(whereOpt, { is_admin })
    password && Object.assign(whereOpt, { password })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    })
    return res ? res.dataValues : null
  }
  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id }
    const newUser = {}
    console.log(id, password)
    user_name && Object.assign(newUser, { user_name })
    is_admin && Object.assign(newUser, { is_admin })
    password && Object.assign(newUser, { password })
    const res = await User.update(newUser, { where: whereOpt }) //修改密码
    return res[0]
  }
}
module.exports = new UserService()
