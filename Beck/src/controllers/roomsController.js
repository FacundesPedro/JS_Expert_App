import Attendee from "../entities/attendee.js";
import { constants } from "../utils/constants.js"

export default class RoomsController{

    
    #users = new Map();

    constructor(){
        this.rooms = new Set();
    }

    #update_global_UserData(userId,userData = {},roomId = ''){
        const current_user = this.#users.get(userId) ?? {}
        const current_room = this.rooms.has(roomId)

        const updatedUserData = new Attendee({
            userId,
            ...current_user,
            ...userData,
            roomId,
            isSpeaker: !current_room //first user to enter the room became the owner
        })
        this.#users.set(userId,updatedUserData)

        return this.#users.get(userId)
    }

    getEvents(){
        const events = Reflect.ownKeys(RoomsController.prototype)
           .filter(fn => fn !== 'constructor')
           .map(func_name => [func_name,this[func_name].bind(this)])

           return new Map(events)
    } 

    onNewConnection(socket){
        const userId = socket.id

        console.log('Connection Stablished with the Socket ID: ',userId)
    }

    joinRoom(socket,{user,room}){
        const userId = user.id = socket.id
        const roomId = room.id 
        
        const updated_user = this.#update_global_UserData(
            userId,
            user,
            roomId
        ) 

        console.log( {updated_user} )
        
        socket.emit(constants.events.USER_CONNECTED,updated_user)
    }




}