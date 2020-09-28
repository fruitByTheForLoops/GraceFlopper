const router = require('express').Router()
const {User, Cart, FruitySeed} = require('../db/models')
const isAdmin = require('../isAdmin')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
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
    // REMOVE THE CONSOLE LOGS BELOW BEFORE MERGING INTO MAIN
    console.log('is not undefined --> ', req.user.id !== undefined)
    console.log('The User ID --> ', req.user.id)
    console.log('The Params userId -->', req.params.userId)
    console.log('Is Allowed --> ', req.user.id === Number(req.params.userId))
    const requestingUser = req.user.id
    const requestedResourceUserId = Number(req.params.userId)
    if (requestingUser !== requestedResourceUserId) {
      console.log('Do I get here?')
      const error = new Error('Insufficient Privileges')
      error.status = 401
      throw error
    }

    let carts = await Cart.findAll({
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

    carts = carts.map((cart) => {
      cart = cart.toJSON()
      const fruityseeds = {}
      cart.fruityseeds.forEach((fruityseed) => {
        fruityseeds[fruityseed.id] = fruityseed
      })
      cart.fruityseeds = fruityseeds
      return cart
    })
    res.send(carts)
  } catch (error) {
    next(error)
  }
})
