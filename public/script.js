const socket = io()
const form = document.querySelector('form')
const username = form.querySelector('input#name')
const message = form.querySelector('input#message')
const messages = document.querySelector('#messages')

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


  // const element = document.createElement('li')
  // const name = document.createElement('p')
  // const message = document.createElement('p')
  // name.innerText = data.name
  // message.innerText = data.message

  // name.classList.add('chat-name')
  // message.classList.add('chat-message')

  // el.classList.add(data.name === username.value ? 'own-message' : 'message')
  // el.appendChild(name)
  // el.appendChild(message)
  // messages.appendChild(element)
  // messages.scrollTop = messages.scrollHeight
})
