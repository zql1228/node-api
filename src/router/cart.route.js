const Router = require('koa-router')
const router = new Router({ prefix: '/carts' })
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add, findAll, update, remove, selectedAll, unselectedAll } = require('../controller/carts.controller')
router.post(
  '/',
  auth,
  validator({
    goods_id: 'number',
  }),
  add
) //加入购物车
router.get('/list', auth, findAll) //获取购物车列表
router.patch(
  '/:id',
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
  }),
  update
) //更新购物车商品的数量和状态（id是商品的id）
router.delete('/', auth, validator({ ids: { type: 'array' } }), remove) //删除购物车商品
router.post('/selectAll', auth, selectedAll) //全选中
router.post('/unselectAll', auth, unselectedAll) //全不选中
module.exports = router
