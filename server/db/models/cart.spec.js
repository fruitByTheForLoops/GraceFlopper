/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //structure of cart
  describe('structure of cart', () => {
    let cart
    beforeEach(async () => {
      cart = await Cart.create({
        checkedOut: false,
      })
    })
    it('has userId', () => {
      expect(cart.userId).to.be.equal(null)
    })
    it('has checkedOut', () => {
      expect(cart.checkedOut).to.be.equal(false)
    })
  })
})
