import SocketServer from './utils/socket.js'

const port = process.env.PORT || 3000
const socket = new SocketServer({ port })
const server = socket.start().then((server) => console.log('Server running on port: ',server.address().port)).catch(e => console.error(e))