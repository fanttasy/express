import express, { Express, Request, Response } from 'express'
import path from 'path'
import http from 'http'
import { Server, type Socket } from 'socket.io'

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server)
const port = 3002

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket: Socket) => {
  socket.emit('message', 'Welcome to ChatRoom')

  // 当有人进入
  socket.broadcast.emit('message', 'A user has joined the ChatRoom')

  // 当有人退出
  socket.on('disconnect', () => {
    io.emit('message', 'A use has left the ChatRoom')
  })

  // 监听消息
  socket.on('chatMessage', message => {
    io.emit('message', message)
  })
})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})