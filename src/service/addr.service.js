const Address = require('../model/addr.model.js')
class addrService {
  async createAddr(addrs) {
    const res = await Address.create(addrs)
    return res
  }
  async findAllAddr(user_id) {
    const res = await Address.findAll({
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: { user_id },
    })
    return res
  }
  async updateAddr(id, addr) {
    const res = await Address.update(addr, { where: { id } })
    return res[0] ? true : false
  }
}
module.exports = new addrService()
