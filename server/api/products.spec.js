/*
Test specs for API/PRODUCTS

when access to correct path / address
we should be able to see data

1)
[x] expect length of response array (json)
or
[x] expect the response is an array

2)
[x] expect attributes


*/
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const FruitySeed = db.model('fruityseed')

describe('all products route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    beforeEach(() => {
      return FruitySeed.create({
        name: 'Arugula',
        pricePerUnit: 395,
        seedsPerUnit: 1000,
        unit: 'Packet',
        imageUrl:
          'https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dwa7e9bcb6/Images/Product%20Images/prod500402/prod500402.jpg?sw=322&sh=380&sm=fit',
        stock: 500,
      })
    })
    it('GET /api/products', async () => {
      const res = await request(app).get('/api/products').expect(200)

      expect(res.body.length).to.be.equal(1)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Arugula')
      expect(res.body[0].pricePerUnit).to.be.equal(395)
    })
  })
})
