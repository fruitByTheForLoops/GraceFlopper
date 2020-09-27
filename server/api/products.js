const router = require('express').Router()
const {FruitySeed} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const seeds = await FruitySeed.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'name',
        'pricePerUnit',
        'imageUrl',
        'seedsPerUnit',
        'unit',
      ],
    })
    res.json(seeds)
  } catch (err) {
    next(err)
  }
})

router.get('/:prodId', async (req, res, next) => {
  try {
    const product = await FruitySeed.findByPk(req.params.prodId, {
      attributes: [
        'id',
        'name',
        'pricePerUnit',
        'imageUrl',
        'seedsPerUnit',
        'unit',
      ],
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})
