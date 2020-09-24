const Sequelize = require('sequelize')
const db = require('../db')

const CartSeed = db.define('cartSeed', {
  quantity: {
    type: Sequelize.INTEGER,
  },
})

module.exports = CartSeed
