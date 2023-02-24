const chatForm = document.querySelector('#chat-form')

const socket = io()

// 接收消息
socket.on('message', message => {
  outputMessage(message) 
})

chatForm.addEventListener('submit', e => {
  e.preventDefault()
  const msg = e.target.elements.msg.value

  // 发送消息
  socket.emit('chatMessage', msg)
})

// 将消息输入到聊天面板
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML =
  `
  <p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">${message}</p>
  `

  document.querySelector('.chat-messages').appendChild(div)
}
