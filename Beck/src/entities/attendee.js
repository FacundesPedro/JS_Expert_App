export default class Attendee{
    constructor({userId,name,img,isSpeaker,roomId,peerId}){
        this.userId = userId
        this.name = name
        this.img = img
        this.isSpeaker = isSpeaker
        this.roomId = roomId
        this.peerId = peerId
    }
}