const fetch = require('node-fetch')

const getData = endpoint => {
  return fetch(endpoint)
    .then(res => res.json())
    .catch(_ => null)
}

module.exports = getData;