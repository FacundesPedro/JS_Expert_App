import http from 'http'
import { Server } from 'socket.io'
import { constants } from './constants.js'


export default class SocketServer{
    #io
    constructor({ port }){
        this.port = port
        this.namespace = {}
    }

    attachEvents(routeConfig){
        for(const routes of routeConfig){
            for(const [namespace,{events,eventEmitter}] of Object.entries(routes)){
                const namespace_route = this.namespace[namespace] = this.#io.of(`/${namespace}`)
                
                namespace_route.on('connection',socket =>{
                    for(const [fnName,fnValue] of events){
                        socket.on(fnName,(...agrs) => fnValue(socket,...agrs))
                    }  
                    
                    eventEmitter.emit(constants.events.USER_CONNECTED,socket)
                })
            }   
        }
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