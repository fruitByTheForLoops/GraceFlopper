const router = require('express').Router()
const {User, Cart, FruitySeed} = require('../db/models')
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
  const userId = req.params.userId
  try {
    const carts = await Cart.findAll({
      where: {
        userId,
      },
      include: FruitySeed,
    })

    // TODO: Write test to ensure that this
    // route always returns a non-empty array
    // create an empty cart if the user does not have any
    if (carts.length === 0) {
      const newEmptyCart = await Cart.create({
        checkedOut: false,
        userId,
      })
      carts.push(newEmptyCart)
    }

    res.send(carts)
  } catch (error) {
    next(error)
  }
})
