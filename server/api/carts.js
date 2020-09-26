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
