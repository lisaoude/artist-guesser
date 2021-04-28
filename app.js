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


//______ SOCKET ______//
//___ GENERAL VARIABLES ___//
let sortedData;
let users = [];
let round = 0;

//___ CONNECTION ___//
io.on('connection', async (socket) => {

  //___ USER CONNECTED ___//
  socket.on('userConnected', (userName) => {

    const connectMsg = `${userName} has joined the game`

    io.emit('userConnected', connectMsg);

    // storing user data to acces when someone disconnects
    users.push({
      username: userName,

      // each client has their own socket.id
      // I store this with the name, so I know who is leaving
      id: socket.id
    });

    // io.emit('scoreBoard', users);
  })


  sortedData = await sortData()

  //___ API DATA ___//
  let artData = {
    text: sortedData[round].title,
    image: sortedData[round].webImage.url
  }
  io.emit('showData', artData)


  //___ CHAT ___//
  socket.on('message', (chatMessage) => {

    io.emit('message', chatMessage)

    let message = chatMessage.message
    let guess = message.toLowerCase();

    let artist = sortedData[round].principalOrFirstMaker
    let correct = artist.toLowerCase();


    //___ CORRECT GUESS ___//
    if (guess.includes(correct)) {

      let user = chatMessage.username

      chatMessage.username = ''
      chatMessage.message = `${user} guessed right! The answer was ${artist}`

      io.emit('message', chatMessage)


      //___ SHOW NEXT ARTWORK ___//
      if (round >= sortedData.length - 1) {
        round = 0;

        sortData()
          .then(() => console.log('next artwork'))
          .catch((err) => console.log(err))

      } else {
        // add +1 to round
        round = round + 1;
      }

      let artData = {
        text: sortedData[round].title,
        image: sortedData[round].webImage.url
      }
      io.emit('showData', artData)
    }
  })


  //___ DISCONNECTION ___//
  socket.on('disconnect', () => {
    let name = '';

    // getting name for feedback
    users.forEach(user => {
      if (user.id == socket.id) {
        name = user.username;

        // delete user 
        users = users.filter(user => user.id != socket.id);
      }
    });

    io.emit('disconnected', name)

  })

});


// Listen for requests
http.listen(port, () => {
  console.log(`App is launched on http://localhost:${port}`)
});
