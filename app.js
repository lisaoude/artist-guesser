// Require dotenv
require('dotenv').config();

// Externals
const
  express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 5000;

// Routes
const routes = require('./router');

// 'Imports'
const sortData = require('./utils/organizeData');


// Middleware & Static files
app
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .use(routes);


// SOCKET
// connection event
io.on('connection', async (socket) => {

  console.log('a user has connected')

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
  io.emit('showImage', textandimage)


  // message event
  socket.on('message', (chatMessage) => {

    if (chatMessage.message === artist) {

      let user = chatMessage.name

      chatMessage.name = ''
      chatMessage.message = `${user} guessed right! The answer was ${artist}`
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
