// Externals
const express = require('express');
const router = express.Router();

// Renders
// const index = require('./renders/index');
const index = require('./renders/index');


// Routes
router
  .get('/', index);

module.exports = router;