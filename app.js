// Require dotenv
require('dotenv').config();


// Externals
const
  express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 5000,
  fetch = require('node-fetch');
;

// 'Imports'
const sortData = require('./utils/filterData');

// Routes
const routes = require('./router/routes');


// Middleware & Static files
app
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .use(routes);


// Socket.io
io.on('connection', async socket => {
  console.log('a user has connected')

  const dataImage = await sortData()

  const textandimage = {
    text: dataImage[0].title,
    image: dataImage[0].webImage.url
  }

  io.emit('image', textandimage)

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

