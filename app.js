// Require dotenv
require('dotenv').config();

// Externals
const
  express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 5000;

// Internals
const url = process.env.URL;
const key = process.env.KEY;
const limit = process.env.LIMIT;

// Routes
const routes = require('./router');

// 'Imports'
const getData = require('./utils/getData');

// Middleware & Static files
app
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .use(routes);


//______ FILTERING & SORTING DATA ______//
// I originally did this in a separate file
// But that resulted in not being able to stop the data
// From reloading on every connection

// artists I want to filter on
const artists = ['Frans Hals', 'Johannes Vermeer', 'Aelbert Cuyp', 'Rembrandt van Rijn', 'Jan Both', 'Vincent van Gogh']

// filtering
const filterData = async () => {
  const endpoint = `${url}?key=${key}&ps=${limit}`
  const data = await getData(endpoint)
  const filteredData = data.artObjects.filter(artObject => {
    return artists.includes(artObject.principalOrFirstMaker)
  })
  return filteredData
}

filterData()

// sorting
let sortedData;
const sortData = async () => {
  const data = await filterData()
  const sortingData = data.sort(() => .5 - Math.random())

  sortedData = sortingData

  return sortedData
}

sortData()
  .then(() => console.log('loading the data..'))



//______ SOCKET ______//
//___ GENERAL VARIABLES ___//
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
  })


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
          .then(() => console.log('round has ended'))
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
