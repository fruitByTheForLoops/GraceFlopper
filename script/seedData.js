const fetch = require('node-fetch')
const TREFLE_TOKEN = process.env.TREFLE_TOKEN

const fetchData = async () => {
  const response = await fetch(
    `https://trefle.io/api/v1/species/search?token=${TREFLE_TOKEN}&q=apple`
  )
  const {data} = await response.json()
  const filteredData = data.map((el) => ({
    common_name: el.common_name,
    image_url: el.image_url,
    links: el.links.self,
  }))
  /* In progress. TODO: fetch detailed data per plant */
  // for (let i = 0; i < filteredData.length; i++) {
  //   const detailedData = await fetch(
  //     `https://trefle.io${filteredData[i].links}?token=${TREFLE_TOKEN}`
  //   )
  //   const {data: detail} = await detailedData.json()
  //   console.log(detail.growth.light)
  // }
  return filteredData
}

module.exports = fetchData
