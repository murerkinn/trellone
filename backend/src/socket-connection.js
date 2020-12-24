const io = require('socket.io')
let socketServer = null

module.exports = (app, server) => {
  if (socketServer) return socketServer

  socketServer = io(server)

  socketServer.on('connection', socket => {
    socket.on('join-panel', panelId => {
      socket.join(panelId)
    })
  })

  return socketServer
}
