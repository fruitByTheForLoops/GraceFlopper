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

    await cartSeedInstance.increment({
      quantity: quantity,
    })
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
