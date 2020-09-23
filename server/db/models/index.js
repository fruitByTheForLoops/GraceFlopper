const User = require('./user')
const Cart = require('./cart')
const FruitySeed = require('./fruitySeed')
const CartSeed = require('./cartSeed')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// One to Many
User.hasMany(Cart)
Cart.belongsTo(User)

// Many to Many
Cart.belongsToMany(FruitySeed, {through: CartSeed})
FruitySeed.belongsToMany(Cart, {through: CartSeed})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  FruitySeed,
  CartSeed,
}
