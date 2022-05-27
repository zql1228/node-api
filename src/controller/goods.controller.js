const path = require('path')
const { fileUploadError, unSupportedFileType, uploadGoodsError, updateGoodsError, invalidGoodsID } = require('../constant/err.type')
const { createGoods, updateGoods, removeGoods, restoreGoods, getGoodsList } = require('../service/goods.service.js')
class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files
    const fileTypes = ['image/jpeg', 'image/png']
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '图片上传成功',
        result: {
          goods_img: path.basename(file.filepath),
        },
      }
    } else {
      ctx.app.emit('error', fileUploadError, ctx)
    }
  }
  async create(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res,
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', uploadGoodsError, ctx)
    }
  }
  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.request.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidGoodsID, ctx)
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', updateGoodsError, ctx)
    }
  }
  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.request.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '下架商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', updateGoodsError, ctx)
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', updateGoodsError, ctx)
    }
  }
  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.request.params.id)
      if (res) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
          result: '',
        }
      } else {
        return ctx.app.emit('error', updateGoodsError, ctx)
      }
    } catch (error) {
      console.log(error)
      return ctx.app.emit('error', updateGoodsError, ctx)
    }
  }
  async goodsList(ctx) {
    //获取商品列表
    const { pageSize = 10, pageNum = 1 } = ctx.request.query
    const res = await getGoodsList(pageNum, pageSize)
    console.log(res)
    ctx.body = res
  }
}
module.exports = new GoodsController()
