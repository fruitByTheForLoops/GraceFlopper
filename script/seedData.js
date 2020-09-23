const fetch = require('node-fetch')

const fetchData = async () => {
  const response = await fetch(
    'https://trefle.io/api/v1/species/search?token=t5LZvZ7RSAwz6MMk9joiLdB5osOQ1zyTC2VvvXOvoHk&q=apple'
  )
  const {data} = await response.json()
  const filteredData = data.map((el) => ({
    common_name: el.common_name,
    image_url: el.image_url,
    links: el.links.self,
  }))
  for (let i = 0; i < filteredData.length; i++) {
    const detailedData = await fetch(
      `https://trefle.io${filteredData[i].links}?token=t5LZvZ7RSAwz6MMk9joiLdB5osOQ1zyTC2VvvXOvoHk`
    )
    const {data: detail} = await detailedData.json()
    console.log(detail.growth.light)
  }
}

//     `https://trefle.io${el.links}}?token=t5LZvZ7RSAwz6MMk9joiLdB5osOQ1zyTC2VvvXOvoHk`

fetchData()
