// Externals
const express = require('express');
const app = express();
fetch = require('node-fetch');

// Middleware
app.set('view engine', 'ejs');


const index = (req, res) => {

  // const artList = 

  res.render('index', {
    headTwo: 'Who made this artwork?',
    artList: artList
  });
};


module.exports = index;