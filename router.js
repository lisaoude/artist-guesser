// Externals
const express = require('express');
const router = express.Router();


// Import routes
const index = require('./routes/indexRoute')
const game = require('./routes/gameRoute')

// Routes
router
  .get('/', index)
  .get('/game', game)


module.exports = router;