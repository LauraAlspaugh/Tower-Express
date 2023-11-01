export class Event{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toLocaleDateString()
        this.isCanceled = data.isCanceled || false
        this.type = data.type
        this.creatorId = data.creatorId
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString()
        this.creator = data.creator
    }
}
// const eventData = {
    
//         "_id": "6541b8872c263086b520a13e",
//         "name": "Big Sports Game",
//         "description": "Will never, ever, be the same, again! Welcome to Raw Is Jericho! Beat me if you can, survive if I let you. That’s the bottom line because Stone Cold said so! Whatcha gonna do when Hulkamania runs wild on you! I am the ayatollah of rock n rolla! I am the best in the world. I am the best there is, the best there was, and the best there ever will be.",
//         "coverImg": "https://images.unsplash.com/photo-1542727934-07691d6ebf0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
//         "location": "At The Social Expo Center",
//         "capacity": 92,
//         "startDate": "2023-11-20T07:00:00.000Z",
//         "isCanceled": false,
//         "type": "sport",
//         "creatorId": "652ef49aff9881f8395eb350",
//         "createdAt": "2023-11-01T02:31:35.207Z",
//         "updatedAt": "2023-11-01T02:31:35.207Z",
//         "__v": 0,
//         "creator": {
//             "_id": "652ef49aff9881f8395eb350",
//             "name": "lauraalspaugh2002",
//             "picture": "https://s.gravatar.com/avatar/adb1a81448fd211a1c2107bc4dbd9772?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fla.png",
//             "id": "652ef49aff9881f8395eb350"
//         },
//         "id": "6541b8872c263086b520a13e"
//     }
