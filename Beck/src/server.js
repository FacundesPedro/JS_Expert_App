import RoomsController from './controllers/roomsController.js'
import SocketServer from './utils/socket.js'
import Event from 'events'
import { constants } from './utils/constants.js'

const roomsController = new RoomsController()
const port = process.env.PORT || 3000
const socket = new SocketServer({ port })
socket.start().then((server) => console.log('Server running on port: ',server.address().port)).catch(e => console.error(e))

const namespaces = {
    room:{controller:roomsController,eventEmitter:new Event()}
}

const routeConfig = Object.entries(namespaces).map(([namespace,{controller,eventEmitter}])=>{
    const controllerEvents = controller.getEvents()
    eventEmitter.on(constants.events.USER_CONNECTED,controller.onNewConnection.bind(controller))
    
    return {
        [namespace]:{events:controllerEvents,eventEmitter}
    }
})

socket.attachEvents(routeConfig)

