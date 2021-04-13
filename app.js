// Externals
const
  express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 5000,
  fetch = require('node-fetch');
;

require('dotenv').config();


// Routes
const routes = require('./router/routes');


// Middleware & Static files
app
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .use(routes);


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