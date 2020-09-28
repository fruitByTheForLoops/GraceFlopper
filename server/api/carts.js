const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll()
    res.send(carts)
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
