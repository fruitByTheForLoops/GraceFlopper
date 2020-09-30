require('../secrets.js')
const fetch = require('node-fetch')
const TREFLE_TOKEN = process.env.TREFLE_TOKEN

const fetchData = async () => {
  const response = await fetch(
    `https://trefle.io/api/v1/species/search?token=${TREFLE_TOKEN}&q=apple`
  )
  const {data} = await response.json()
  const filteredData = data.map((el) => ({
    name: el.common_name,
    imageUrl: el.image_url,
  }))
  return filteredData
}

module.exports = fetchData
