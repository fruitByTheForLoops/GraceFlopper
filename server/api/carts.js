const router = require('express').Router()
const {FruitySeed, Cart, CartSeed} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll()
    res.send(carts)
  } catch (error) {
    next(error)
  }
})

router.put('/add', async (req, res, next) => {
  try {
    const {userId, prodId, quantity} = req.body
    const activeCart = await Cart.findOne({
      where: {
        userId,
        checkedOut: false,
      },
    })
    const product = await FruitySeed.findByPk(prodId)
    await activeCart.addFruityseed(product)
    const cartSeedInstance = await CartSeed.findOne({
      where: {
        cartId: activeCart.id,
        fruityseedId: prodId,
      },
    })

    if (quantity === 1) {
      await cartSeedInstance.increment({
        quantity: quantity,
      })
    } else if (quantity === -1) {
      await cartSeedInstance.increment({
        quantity: quantity,
      })
    }
    //await cartSeedInstance.save()
    //may need to save
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:cartId/delete-product/', async (req, res, next) => {
  try {
    const {prodId} = req.body
    const cartId = req.params.cartId
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
  try {
    const [n, updatedCart] = await Cart.update(
      {checkedOut: true},
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    )
    const userId = updatedCart[0].getDataValue('userId')
    const newActiveCart = await Cart.create()
    await newActiveCart.setUser(userId)
    res.send(newActiveCart)
  } catch (error) {
    next(error)
  }
})
