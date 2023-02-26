const users: { id: string, username: string, room: string } [] = []

// 用户加入
export function userJoin(id: string, username: string, room: string) {
  const user = { id, username, room }
  users.push(user)

  return user
}

// 获取当前用户
export function getCurrentUser(id: string) {
  return users.find(user => user.id === id)
}

// 用户离开
export function userLeave(id: string) {
  const index = users.findIndex(user => user.id === id)

  if(index !== -1) {
    return users.splice(index, 1)[0]
  }
}

// 获取房间用户
export function getRoomUsers(room: string) {
  return users.filter(user => user.room === room)
}
