const Koa = require('koa')
const koaBody = require('koa-body')
const errHandler = require('./errHandler')
const useRouter = require('../router/user.route')
const app = new Koa()
app.use(koaBody())
app.use(useRouter.routes())
//统一错误处理
app.on('error', errHandler)
module.exports = app
