import express, { Express, Request, Response } from 'express'
import path from 'path'
import http from 'http'
import { Server, type Socket } from 'socket.io'
import { formatMessage } from './utils/messages'
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from './utils/users'

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server)
const port = 3002
const sysNoticeName = 'Notice'

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket: Socket) => {
  // 当有人进入
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room)
    socket.join(user.room)

    socket.emit('message', formatMessage(sysNoticeName, 'Welcome to ChatRoom'))
    socket.broadcast.to(user.room).emit('message', formatMessage(sysNoticeName, `${user.username} has joined the ChatRoom`))
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  // 当有人退出
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if(user) {
      io.to(user!.room).emit('message', formatMessage(sysNoticeName, `${user.username} has left the ChatRoom`))
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    }
  })

  // 监听消息
  socket.on('chatMessage', message => {
    const user = getCurrentUser(socket.id)
    io.to(user!.room).emit('message', formatMessage(user!.username, message))
  })
})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})