export class Ticket{
    constructor(data){
        this.id = data.id
        this.event = data.event
        this.eventId = data.eventId
        this._id = data._id
        this.createdAt = new Date(data.createdAt).toLocaleTimeString()
        this.updatedAt = new Date(data.updatedAt).toLocaleTimeString()
        this.profile = data.profile
        this.accountId = data.accountId
        
    }
}
export const ticketData = 
{
    "eventId": "6542bf61fe6f7f42e1c55cf9",
    "accountId": "652ef49aff9881f8395eb350",
    "_id": "654323b0a6f48cc42a4bb6f1",
    "createdAt": "2023-11-02T04:21:04.603Z",
    "updatedAt": "2023-11-02T04:21:04.603Z",
    "__v": 0,
    "event": {
        "_id": "6542bf61fe6f7f42e1c55cf9",
        "name": "Toby Mac Concert",
        "description": "Not one you want to miss. ",
        "coverImg": "https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuZHxlbnwwfHwwfHx8MA%3D%3D",
        "location": "Nashville Tennessee",
        "capacity": 50,
        "startDate": "2024-12-20T07:00:00.000Z",
        "isCanceled": false,
        "type": "concert",
        "creatorId": "652ef49aff9881f8395eb350",
        "createdAt": "2023-11-01T21:13:05.179Z",
        "updatedAt": "2023-11-02T04:05:38.248Z",
        "__v": 0,
        "id": "6542bf61fe6f7f42e1c55cf9"
    },
    "profile": {
        "_id": "652ef49aff9881f8395eb350",
        "name": "lauraalspaugh2002",
        "picture": "https://s.gravatar.com/avatar/adb1a81448fd211a1c2107bc4dbd9772?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fla.png",
        "id": "652ef49aff9881f8395eb350"
    },
    "id": "654323b0a6f48cc42a4bb6f1"
}