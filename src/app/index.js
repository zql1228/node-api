const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')
const errHandler = require('./errHandler')
// const useRouter = require('../router/user.route')
const router = require('../router')
const app = new Koa()
app.use(
  koaBody({
    multipart: true, //支持文件上传，默认false
    formidable: {
      // options里的相对路径不是相对于当前文件，相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'), //保存位置
      keepExtensions: true, //是否保留文件扩展名
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
)
app.use(koaStatic(path.join(__dirname, '../upload')))
app.use(router.routes())
app.use(parameter(app))
//统一错误处理
app.on('error', errHandler)
module.exports = app
