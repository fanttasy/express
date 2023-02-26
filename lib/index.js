"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const messages_1 = require("./utils/messages");
const users_1 = require("./utils/users");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const port = 3002;
const sysNoticeName = 'Notice';
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
io.on('connection', (socket) => {
    // 当有人进入
    socket.on('joinRoom', ({ username, room }) => {
        const user = (0, users_1.userJoin)(socket.id, username, room);
        socket.join(user.room);
        socket.emit('message', (0, messages_1.formatMessage)(sysNoticeName, 'Welcome to ChatRoom'));
        socket.broadcast.to(user.room).emit('message', (0, messages_1.formatMessage)(sysNoticeName, `${user.username} has joined the ChatRoom`));
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: (0, users_1.getRoomUsers)(user.room)
        });
    });
    // 当有人退出
    socket.on('disconnect', () => {
        const user = (0, users_1.userLeave)(socket.id);
        if (user) {
            io.to(user.room).emit('message', (0, messages_1.formatMessage)(sysNoticeName, `${user.username} has left the ChatRoom`));
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: (0, users_1.getRoomUsers)(user.room)
            });
        }
    });
    // 监听消息
    socket.on('chatMessage', message => {
        const user = (0, users_1.getCurrentUser)(socket.id);
        io.to(user.room).emit('message', (0, messages_1.formatMessage)(user.username, message));
    });
});
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
