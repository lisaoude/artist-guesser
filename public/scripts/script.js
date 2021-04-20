// variables for chat
const socket = io()
const form = document.querySelector('form')
const username = form.querySelector('input#name')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')

//variables for images
const picture = document.querySelector('img')
const text = document.querySelector('h2')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (message.value) {
    socket.emit('message', {
      name: username.value,
      message: message.value
    })
    username.style.display = 'none'
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


socket.on('image', (textandimage) => {
  picture.src = textandimage.image;
  text.innerText = textandimage.text;
})