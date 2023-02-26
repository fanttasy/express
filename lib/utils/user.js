"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.userJoin = void 0;
const users = [];
// 用户加入
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}
exports.userJoin = userJoin;
// 获取当前用户
function getCurrentUser(id) {
    return users.find(item => item.id === id);
}
exports.getCurrentUser = getCurrentUser;
