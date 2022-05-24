const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { userValidator, verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login, changePassword } = require('../controller/user.controller')
//注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)
//登录接口
router.post('/login', userValidator, verifyLogin, login)
router.patch('/', auth, crpytPassword, changePassword)
module.exports = router
