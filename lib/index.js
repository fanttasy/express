"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const port = 3002;
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
io.on('connection', (socket) => {
    socket.emit('message', 'Welcome to ChatRoom');
    // 当有人进入
    socket.broadcast.emit('message', 'A user has joined the ChatRoom');
    // 当有人退出
    socket.on('disconnect', () => {
        io.emit('message', 'A use has left the ChatRoom');
    });
    // 监听消息
    socket.on('chatMessage', message => {
        io.emit('message', message);
    });
});
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
