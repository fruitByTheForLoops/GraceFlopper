/* Constraints */
// generates a random price given a max and min
// in pennies
// expect all prices to be $n.95
const randomPrice = (min, max) => {
  const randomNum = Math.floor(Math.random() * (max - min) + min) - 5
  return randomNum
}

// generates a random stock quantity given a max and min
// expect to be between min * 10 and max * 10
const randomStock = (min, max) => {
  const randomQuantityInStock =
    Math.floor(Math.random() * (max - min) + min) * 10
  return randomQuantityInStock
}

// given a number of products
// and a minimum price
// and a maximum price
// returns an array of prices
const prices = (numberOfProducts, min, max) =>
  Array(numberOfProducts)
    .fill(1)
    .map((elem) => randomPrice(min, max) * elem)

const quantities = (numberOfProducts, min, max) =>
  Array(numberOfProducts)
    .fill(1)
    .map((elem) => randomStock(min, max) * elem)

console.log(quantities(10, 1, 10))
console.log(prices(10, 1, 30))
module.exports = {prices, quantities}
