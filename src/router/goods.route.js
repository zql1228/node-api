const Router = require('koa-router')
const router = new Router({ prefix: '/goods' })
const { auth, hasAdminPremisson } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const { upload, create, update, remove, restore, goodsList } = require('../controller/goods.controller')

router.post('/upload', auth, hasAdminPremisson, upload) //商品图片上传
router.post('/', auth, hasAdminPremisson, validator, create) //商品上传
router.put('/:id', auth, hasAdminPremisson, validator, update) //商品修改
router.post('/:id/off', auth, hasAdminPremisson, remove) //商品下架
router.post('/:id/on', auth, hasAdminPremisson, restore) //商品上架
router.get('/list', auth, hasAdminPremisson, goodsList) //商品列表
module.exports = router
