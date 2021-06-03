import { constants } from "../../_shared/constants.js";
import SocketBuilder from "../../_shared/SocketBuilder.js";


const socketBuilder = new SocketBuilder({
    socketUrl:constants.socketUrl,
    namespace:constants.socketNamespaces.room
})

const io = socketBuilder //var "io" is the emiting and listing object from socketBuilder instance 
    .setOnUserConnected((user) => console.log('User Connected', user))
    .setOnUserDisconnected((user) => console.log('User Disconnected', user)) 
    .build()

const room = {
    id:1,
    topic:'Why Dogecoin?'
}

const user = {
    img:'',
    name:'PAi_Efi'
}

io.emit(constants.events.JOIN_ROOM,{user,room}) //told ya
io.on(constants.events.USER_CONNECTED, data =>{
    console.log('User Connected!',data)
})