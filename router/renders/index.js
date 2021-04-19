// Externals
const express = require('express');
const app = express();
fetch = require('node-fetch');

// Middleware
app.set('view engine', 'ejs');

// Internals
const url = process.env.URL;
const key = process.env.KEY;
const limit = process.env.LIMIT;

const index = (req, res) => {
  fetch(`${url}?key=${key}&ps=${limit}`)
    .then(async response => {
      const data = await response.json()
      const artList = data.artObjects

      res.render('index', {
        headTwo: 'Who made this artwork?',
        artList: artList
      });
    });
};

module.exports = index;
