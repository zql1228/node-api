const Router = require('koa-router')
const router = new Router({ prefix: '/goods' })
const { auth, hasAdminPremisson } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const { upload } = require('../controller/goods.controller')

router.post('/upload', auth, hasAdminPremisson, upload) //商品图片上传
router.post('/', auth, hasAdminPremisson, validator, (ctx, cext) => {
  ctx.body = '////'
}) //商品图片上传
module.exports = router
