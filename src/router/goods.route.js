const Router = require('koa-router')
const router = new Router({ prefix: '/goods' })
const { auth, hasAdminPremisson } = require('../middleware/auth.middleware')
const { upload } = require('../controller/goods.controller')

router.post('/upload', auth, hasAdminPremisson, upload)
