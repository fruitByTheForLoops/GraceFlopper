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
      console.log('Do I get here?')
      const error = new Error('Insufficient Privileges')
      error.status = 401
      throw error
    }

    // if user is the correct user, then go on
    const cartId = req.params.cartId
    const activeCart = await Cart.findOne({
      where: {
        id: cartId,
        checkedOut: false,
      },
    })

    const product = await FruitySeed.findByPk(prodId)
    await activeCart.addFruityseed(product)
    // let productId = Number(prodId)
    // const productAlreadyInCart = await activeCart.hasFruityseed(productId)
    // console.log('prodId -->', prodId)
    // console.log('productAlreadyInCart --> ', productAlreadyInCart)
    // let cartSeedInstance
    // if (productAlreadyInCart) {
    //   cartSeedInstance = await activeCart.getFruityseeds(productId)
    // } else {
    //   cartSeedInstance = await activeCart.addFruityseed(productId)
    // }

    // increment appropriately
    const cartSeedInstance = await CartSeed.findOne({
      where: {
        cartId,
        fruityseedId: prodId,
      },
    })

    await cartSeedInstance.increment({
      quantity,
    })

    // if (quantity === 1) {
    //   await cartSeedInstance.increment({
    //     quantity: quantity,
    //   })
    // } else if (quantity === -1) {
    //   await cartSeedInstance.increment({
    //     quantity: quantity,
    //   })
    // }
    //await cartSeedInstance.save()
    //may need to save
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:cartId/delete-product/', async (req, res, next) => {
  // protect here
  try {
    const {prodId} = req.body
    const cartId = req.params.cartId
    const cart = await Cart.findOne({where: {id: cartId}})
    const userId = cart.userId

    // PROTECTED
    const requestingUser = req.user || {id: 0}
    const requestedResourceUserId = userId

    if (requestingUser.id !== requestedResourceUserId) {
      console.log('Do I get here?')
      const error = new Error('Insufficient Privileges')
      error.status = 401
      throw error
    }

    // BUSINESS LOGIC
    if (req.user)
      await CartSeed.destroy({
        where: {
          cartId,
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
    console.log(req.params.id)
    await Cart.update(
      {checkedOut: true},
      {
        where: {
          id: req.params.id,
        },
      }
    )
    let updatedCart = await Cart.findByPk(req.params.id)
    console.log(updatedCart)
    res.send(updatedCart)
  } catch (error) {
    next(error)
  }
})
