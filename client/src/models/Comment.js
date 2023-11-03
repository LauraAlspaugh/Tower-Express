export class Comment{
    constructor(data){
        this.id = data.id || data._id
        this.body = data.body
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.isAttending = data.isAttending
        this.createdAt = new Date(data.createdAt).toLocaleTimeString()
        this.updatedAt = new Date(data.updatedAt).toLocaleTimeString()
        this.creator = data.creator
    }
}
export const commentData = {
    
        "_id": "65429c9dfe6f7f42e1c55bcd",
        "creatorId": "652ef49aff9881f8395eb350",
        "eventId": "65429c9cfe6f7f42e1c55bc7",
        "body": "You gotta fly with the eagles into a whole other world into a whole other video game domain. You gotta have the rhythm of a sleazy 70s muscle man combined with the ruthlessness of a 1990s video game killer in the online gaming community. I'm a 6 foot 8 gaming powerhouse like I've said many many many times.",
        "isAttending": false,
        "createdAt": "2023-11-01T18:44:45.659Z",
        "updatedAt": "2023-11-01T18:44:45.659Z",
        "__v": 0,
        "creator": {
            "_id": "652ef49aff9881f8395eb350",
            "name": "lauraalspaugh2002",
            "picture": "https://s.gravatar.com/avatar/adb1a81448fd211a1c2107bc4dbd9772?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fla.png",
            "id": "652ef49aff9881f8395eb350"
        },
        "id": "65429c9dfe6f7f42e1c55bcd"
    }
