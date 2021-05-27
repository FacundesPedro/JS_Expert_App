const socketServer = require('./utils/socket.js');

const port = process.env.PORT || 8001
const socket = new socketServer({ port })
const server = socket.start().then((server) => console.log('Server running on port: ',server.address().port))