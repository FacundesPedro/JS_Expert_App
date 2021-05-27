const http = require('http')
const {Server} = require('socket.io')


module.exports = class socketServer{
    #io
    constructor({ port }){
        this.port = port
    }

    async start() {
        const server = http.createServer((request, response) => {
            response.writeHead(200,{
                'Acess-Control-Allow-Origin':'*',
                'Acess-Control-Allow-Methods':'OPTIONS,POST,GET'
            })

            response.end('It is Working man, Here take a snack:)')
        })

        this.#io = new Server(server,{
            cors:{
                origin:'*',
                credentials: false
            }
        })

        return new Promise((resolve,reject) =>{
            server.on('error',reject)

            server.listen(this.port,() => resolve(server))
        })
    }

}