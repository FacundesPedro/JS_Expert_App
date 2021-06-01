import http from 'http'
import { Server } from 'socket.io'
import { constants } from './constants.js'


export default class SocketServer{
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

        const room_socket = this.#io.of('/room')

        room_socket.on(constants.events.CONNECTED,socket =>{
            socket.emit(constants.events.USER_CONNECTED,'Seja bem-vindo user com socket id: ',socket.id)

            socket.on(constants.events.JOIN_ROOM,(data) =>{
                console.log('Dados Recebidos pelo servidor: ',data)
            })
        })

        return new Promise((resolve,reject) =>{
            server.on('error',reject)

            server.listen(this.port,() => resolve(server))
        })
    }

}