import constants from "../../_shared/constants.js";
import SocketBuilder from "../../_shared/SocketBuilder.js";


const socket = new SocketBuilder({
    socketUrl:constants.socketUrl,
    namespace:constants.socketNamespaces
})

socket
    .setOnUserConnected((user) => console.log('User Connected',user))
    .setOnUserDisconnected((user) => console.log('User Disconnected',user)) 
    .build()

const room = {
    id:1,
    topic:'Why Dogecoin?'
}