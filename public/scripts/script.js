// variables for chat
const socket = io()
const form = document.querySelector('#chatForm')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')

// variables for display name
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('name');

//variables for images
const picture = document.querySelector('img')
const text = document.querySelector('h2')


form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (message.value) {
    socket.emit('message', {
      username,
      message: message.value
    })
    // username.style.display = 'none'
    message.value = ''
  }
})


// send username to server
socket.emit('userConnected', username);

socket.on('userConnected', (username) => {

  console.log('hallo??????')

  const joinMessage = document.createElement('p');

  joinMessage.innerText = `${username} has joined the game`;
  messages.appendChild(joinMessage);
})



socket.on('message', ({ message, username }) => {
  const element = document.createElement('li')

  const name = document.createElement('p')
  const messageEl = document.createElement('p')

  name.innerText = username
  messageEl.innerText = message

  element.appendChild(name)
  element.appendChild(messageEl)
  messages.appendChild(element)
  messages.scrollTop = messages.scrollHeight
})


socket.on('showImage', (artData) => {
  picture.src = artData.image;
  text.innerText = artData.text;
})
