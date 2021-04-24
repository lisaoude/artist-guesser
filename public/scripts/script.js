// variables for chat
const socket = io()
const form = document.querySelector('#chatForm')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')

// variables for display name
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

//variables for images
const picture = document.querySelector('img')
const text = document.querySelector('h2')


form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (message.value) {
    socket.emit('message', {
      name,
      message: message.value
    })
    // username.style.display = 'none'
    message.value = ''
  }
})

socket.on('message', data => {
  const element = document.createElement('li')

  const name = document.createElement('p')
  const message = document.createElement('p')

  name.innerText = data.name
  message.innerText = data.message

  element.appendChild(name)
  element.appendChild(message)
  messages.appendChild(element)
  messages.scrollTop = messages.scrollHeight
})


socket.on('showImage', (textandimage) => {
  picture.src = textandimage.image;
  text.innerText = textandimage.text;
})

