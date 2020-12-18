const io = require('socket.io')
let socketServer = null

module.exports = (app, server) => {
  if (socketServer) return socketServer

  socketServer = io(server)

  return socketServer
}
