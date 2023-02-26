const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages')
const chatRoomName = document.querySelector('#room-name')
const chatRoomUsers = document.querySelector('#users')

// 用户名与房间名
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

const socket = io()

// 进入房间通知
socket.emit('joinRoom', { username, room })

// 获取房间用户
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

// 接收消息
socket.on('message', message => {
  outputMessage(message)

  // 消息超出滚动到底部
  chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', e => {
  e.preventDefault()
  const msg = e.target.elements.msg.value

  // 发送消息
  socket.emit('chatMessage', msg)

  // 清空消息框
  e.target.elements.msg.value = ''
  e.target.elements.msg.focus()
})

// 将消息输入到聊天面板
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML =
  `
  <p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.text}</p>
  `

  document.querySelector('.chat-messages').appendChild(div)
}

// 房间名
function outputRoomName(room) {
  chatRoomName.innerHTML = room
}

// 用户列表
function outputUsers(users) {
  chatRoomUsers.innerHTML = ''

  users.forEach((user) => {
    const li = document.createElement('li')
    li.innerText = user.username
    chatRoomUsers.appendChild(li)
  })
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  window.location = '../index.html'
})
