/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const FruitySeed = db.model('fruityseed')

describe('FruitySeed model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('structure of the fruity seeds', () => {
    let aSeed
    beforeEach(async () => {
      aSeed = await FruitySeed.create({
        name: 'Arugula',
        pricePerUnit: 3.95,
        seedsPerUnit: 1000,
        unit: 'Packet',
        imageUrl:
          'https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dwa7e9bcb6/Images/Product%20Images/prod500402/prod500402.jpg?sw=322&sh=380&sm=fit',
        stock: 500,
      })
    })

    it('has name, price, seeds per unit, unit type, image url and stock', () => {
      const {name, pricePerUnit, seedsPerUnit, unit, imageUrl, stock} = aSeed
      expect({
        name,
        pricePerUnit,
        seedsPerUnit,
        unit,
        imageUrl,
        stock,
      }).to.be.deep.equal({
        name: 'Arugula',
        pricePerUnit: 3.95,
        seedsPerUnit: 1000,
        unit: 'Packet',
        imageUrl:
          'https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dwa7e9bcb6/Images/Product%20Images/prod500402/prod500402.jpg?sw=322&sh=380&sm=fit',
        stock: 500,
      })
    })

    it('belongs in a cart', async () => {
      await aSeed.createCart({
        checkedOut: false,
      })

      const associatedCarts = await aSeed.getCarts()
      console.log(associatedCarts)
      // const associatedCart = associatedCarts.pop();
      expect(associatedCarts).to.be.equal({checkedOut: false})
    })
  })
})
