const Koa = require('koa')
const useRouter = require('../router/user.route')
const app = new Koa()
app.use(useRouter.routes())
module.exports = app
