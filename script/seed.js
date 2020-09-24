'use strict'

const db = require('../server/db')
const {User, FruitySeed, Cart} = require('../server/db/models')
const fetchData = require('./seedData')
const {prices, quantities} = require('./randomPricesAndQuantities')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const products = await fetchData()
  const pricesArray = prices(products.length, 100, 3000)
  const quantitiesArray = quantities(products.length, 1, 10)
  const seeds = products.map((product, index) => {
    return {
      ...product,
      pricePerUnit: pricesArray[index],
      stock: quantitiesArray[index],
    }
  })

  const fruitySeeds = await Promise.all(
    seeds.map((aseed) => FruitySeed.create(aseed))
  )

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
  ])

  // await Promise.all(users.map((user) => (user.addCart(
  //     {
  //       checkedOut: false
  //     })
  //   )))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${fruitySeeds.length} seeds`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
