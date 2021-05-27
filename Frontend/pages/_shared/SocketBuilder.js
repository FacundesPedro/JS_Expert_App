import constants from "./constants";

export default class SocketBuilder{
    constructor( { socketUrl,namespace } ){
        this.socketUrl = `${socketUrl}/${namespace}`;
        this.onUserConnected = () => {};
        this.onUserDisconnected = () => {};
    }

    setOnUserConnected(fn){
        this.onUserConnected = fn

        return this
    }

    setOnUserDisconnected(fn){
        this.onUserDisconnected = fn 

        return this
    }

    build(){
        const socket = globalThis.io.connect(this.socketUrl,{
            withCredentials:false
        })

        socket.on(constants.events.CONNECTED,( () => console.log('WS CONNECTED!')))
        socket.on(constants.events.USER_CONNECTED,() => console.log('User Connected'))
        socket.on(constants.events.USER_DISCONNECTED,() => console.log('User Disconnected'))
    }

}