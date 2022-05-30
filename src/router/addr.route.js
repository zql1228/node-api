const Router = require('koa-router')
const router = new Router({ prefix: '/address' })
// 导入中间件
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')
const { create, findAll, update } = require('../controller/addr.controller')
router.post(
  '/',
  auth,
  validator({
    consignee: { type: 'string' },
    phone: { type: 'string', format: /^1\d{10}$/ },
    address: { type: 'string' },
  }),
  create
)
router.get('/', auth, findAll)
router.put('/:id', auth, validator({ consignee: { type: 'string' }, phone: { type: 'string', format: /^1\d{10}$/ }, address: { type: 'string' } }), update)
module.exports = router
