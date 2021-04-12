// Externals
const
  express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  path = require('path'),

  io = require('socket.io')(http),
  port = process.env.PORT || 5000,

  fetch = require('node-fetch');
;

require('dotenv').config();


// Middleware & Static files
app
  .use(express.static('public'));
// .set('view engine', 'ejs');


// Socket.io
io.on('connection', socket => {
  console.log('a user has connected')

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('a user had disconnected')
  })
})


// Listen for requests
http.listen(port, () => {
  console.log(`App is launched on http://localhost:${port}`)
})