// 'import' getData
const getData = require('./getData')

// Internals
const url = process.env.URL;
const key = process.env.KEY;
const limit = process.env.LIMIT;

// artists I want to filter on
const artists = ['Johannes Vermeer', 'Rembrandt van Rijn', 'Vincent van Gogh', 'Karel Appel']

// filtering
const filterData = async () => {
  const endpoint = `${url}?key=${key}&ps=${limit}`
  const data = await getData(endpoint)
  const filteredData = data.artObjects.filter(artObject => {
    return artists.includes(artObject.principalOrFirstMaker)
  })
  return filteredData
}

filterData()

const sortData = async () => {
  const data = await filterData()
  const sortedData = data.sort(() => .5 - Math.random())
  return sortedData
}

sortData()

module.exports = sortData;