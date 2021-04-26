//___ VARIABLES FOR CHAT ___//
const socket = io()
const form = document.querySelector('#chatForm')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')

//___ VARIABLES FOR API DATA ___//
const picture = document.querySelector('img')
const text = document.querySelector('h2')

//___ VARIABLES FOR DISPLAY NAME ___//
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('name');


//___ USER CONNECTED ___//

socket.emit('userConnected', username);

socket.on('userConnected', (joinMsg) => {

  const joinMessage = document.createElement('p');

  joinMessage.innerText = joinMsg
  messages.appendChild(joinMessage);
})


//___ CHAT 1 ___//
form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (message.value) {
    socket.emit('message', {
      username,
      message: message.value
    })
    message.value = ''
  }
})

//___ CHAT 2 ___//
socket.on('message', ({ message, username }) => {
  const element = document.createElement('li')

  const name = document.createElement('p')
  const messageEl = document.createElement('p')

  name.textContent = username
  messageEl.textContent = message

  element.appendChild(name)
  element.appendChild(messageEl)
  messages.appendChild(element)
  messages.scrollTop = messages.scrollHeight
})


//___ API DATA ___//
socket.on('showData', (artData) => {
  picture.src = artData.image;
  text.textContent = artData.text;
})


//___ DISCONNECT ___//
socket.on('disconnected', (name) => {

  const disconnectMessage = document.createElement('p')
  disconnectMessage.textContent = `${name} has left the game`

  messages.appendChild(disconnectMessage)

})
