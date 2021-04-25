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

let users = [];

// connection event
io.on('connection', async (socket) => {

  console.log('a user has connected')

  // general variables
  const data = await sortData()
  // let artist = data[0].principalOrFirstMaker

  // userConnected event
  socket.on('userConnected', (userName) => {

    console.log('server user connect')

    io.emit('userConnected', userName)

    users.push({
      username: userName,
      score: 0,

      // every client has their own socket.id
      //  I store this with the name to know who is which user
      id: socket.id
    });
  })



  // showing images
  const artData = {
    text: data[0].title,
    image: data[0].webImage.url
  }
  io.emit('showImage', artData)


  // message event
  socket.on('message', (chatMessage) => {

    let message = chatMessage.message
    let guess = message.toLowerCase();

    let artist = data[0].principalOrFirstMaker
    let correct = artist.toLowerCase();


    if (guess === correct) {

      let user = chatMessage.username

      chatMessage.username = ''
      chatMessage.message = `${user} guessed right! The answer was ${artist}`
    }
    io.emit('message', chatMessage)

  })


  // disconnection event
  socket.on('disconnect', () => {
    console.log('a user has disconnected')
  })

});


// Listen for requests
http.listen(port, () => {
  console.log(`App is launched on http://localhost:${port}`)
});
