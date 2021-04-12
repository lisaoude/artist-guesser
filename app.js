// Externals
const
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),

  socket = require('socket.io'),
  io = socket(server),

  fetch = require('node-fetch');
;

require('dotenv').config();


// Middleware & Static files
app
  .use(express.static('public'));
// .set('view engine', 'ejs');


// Internals
const PORT = process.env.PORT || 5000;


// Socket.io
io.on('connection', socket => {
  socket.on('chat', data => {
    io.emit('chat', data)
  })
})


// Listen for requests
app.listen(PORT, () => {
  console.log(`App is launched on http://localhost:${PORT}`)
})