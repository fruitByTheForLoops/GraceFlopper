const Sequelize = require('sequelize')
const db = require('../db')

//pricePerUnit in pennies
const FruitySeed = db.define('fruityseed', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true},
  },
  pricePerUnit: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  seedsPerUnit: {
    type: Sequelize.INTEGER,
    defaultValue: 500,
  },
  unit: {
    type: Sequelize.STRING,
    defaultValue: 'Packet',
  },
  imageUrl: {
    type: Sequelize.TEXT,
    validate: {isUrl: true},
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = FruitySeed
