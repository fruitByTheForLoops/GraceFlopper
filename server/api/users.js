const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/carts', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      where: {
        userId: req.params.userId,
      },
      include: Product,
    })
    res.send(carts)
  } catch (error) {
    next(error)
  }
})
