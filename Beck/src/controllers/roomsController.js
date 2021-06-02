import { constants } from "../utils/constants.js"


export default class RoomsController{


    getEvents(){
        const events = Reflect.ownKeys(RoomsController.prototype)
           .filter(fn => fn !== 'constructor')
           .map(func_name => [func_name,this[func_name].bind(this)])

           return new Map(events)
    } 

    onNewConnection(socket,data){
         console.log('Connection Stablished with the Socket ID: ',socket.id)
     }

    joinRoom(socket,data){
        console.log('dados: ',data)
        socket.emit(constants.events.USER_CONNECTED,data)
     }

}