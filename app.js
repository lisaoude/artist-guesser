// Require dotenv
require('dotenv').config();

// Externals
const
  express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 5000;

// 'Imports'
const sortData = require('./utils/filterData');

// Routes
const routes = require('./router/routes');

// Middleware & Static files
app
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .use(routes);


// SOCKET

// connection event
io.on('connection', async (socket) => {

  // general variables
  const data = await sortData()
  const artist = data[0].principalOrFirstMaker


  // userConnected event
  socket.on('userConnected', (username) => {
    io.emit('userConnected', username);
  })


  // showing images
  const textandimage = {
    text: data[0].title,
    image: data[0].webImage.url
  }
  io.emit('image', textandimage)


  // message event
  socket.on('message', (chatMessage) => {
    io.emit('message', chatMessage)

    if (chatMessage.message === artist) {

      const user = chatMessage.name
      chatMessage.name = ''
      chatMessage.message = `${user} guessed right!`
    }
    io.emit('message', chatMessage)
  })


  // disconnection event
  socket.on('disconnection', () => {
    console.log('a user has disconnected')
  })
})


// Listen for requests
http.listen(port, () => {
  console.log(`App is launched on http://localhost:${port}`)
})

