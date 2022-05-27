const Router = require('koa-router')
const router = new Router({ prefix: '/carts' })
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
router.post('/', (ctx) => {
  ctx.body = 'ok'
})
module.exports = router
