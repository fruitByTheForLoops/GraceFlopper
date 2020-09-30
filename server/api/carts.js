const router = require('express').Router()
const {FruitySeed, Cart, CartSeed} = require('../db/models')
const isAdmin = require('../isAdmin')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const carts = await Cart.findAll()
    res.send(carts)
  } catch (error) {
    next(error)
  }
})

router.put('/:cartId/add', async (req, res, next) => {
  try {
    // PROTECTED
    const {userId, prodId, quantity} = req.body
    const requestingUser = req.user || {id: 0}
    const requestedResourceUserId = userId

    if (requestingUser.id !== requestedResourceUserId) {
      const error = new Error('Insufficient Privileges')
      error.status = 401
      throw error
    }

    const cartId = req.params.cartId
    const activeCart = await Cart.findOne({
      where: {
        id: cartId,
        checkedOut: false,
      },
    })

    const product = await FruitySeed.findByPk(prodId)
    await activeCart.addFruityseed(product)

    const cartSeedInstance = await CartSeed.findOne({
      where: {
        cartId,
        fruityseedId: prodId,
      },
    })

    await cartSeedInstance.increment({
      quantity,
    })

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/delete-product/', async (req, res, next) => {
  try {
    const {prodId} = req.body
    const id = req.params.id
    const cart = await Cart.findOne({where: {id}})
    const userId = cart.userId

    // PROTECTED
    const requestingUser = req.user || {id: 0}
    const requestedResourceUserId = userId

    if (requestingUser.id !== requestedResourceUserId) {
      const error = new Error('Insufficient Privileges')
      error.status = 401
      throw error
    }

    // BUSINESS LOGIC
    if (req.user)
      await CartSeed.destroy({
        where: {
          cartId: id,
          fruityseedId: prodId,
        },
      })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  // protect here
  try {
    const id = req.params.id
    const cart = await Cart.findOne({where: {id}})
    const userId = cart.userId

    // PROTECTED
    const requestingUser = req.user || {id: 0}
    const requestedResourceUserId = userId

    if (requestingUser.id !== requestedResourceUserId) {
      const error = new Error('Insufficient Privileges')
      error.status = 401
      throw error
    }

    const [n, updatedCart] = await Cart.update(
      {checkedOut: true},
      {
        where: {
          id,
        },
        returning: true,
      }
    )
    const newActiveCart = await Cart.create()
    await newActiveCart.setUser(userId)
    res.send(newActiveCart)
  } catch (error) {
    next(error)
  }
})
