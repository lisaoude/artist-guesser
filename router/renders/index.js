// Externals
const express = require('express');
const app = express();

// Middleware
app.set('view engine', 'ejs');

const index = (req, res) => {
  res.render('index', {
    headTwo: 'hoi head two'
  });
};

module.exports = index;