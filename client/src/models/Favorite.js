export class Favorite {
    constructor(data) {
        this.id = data.id 
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.event = data.event
        this.isFavorite = data.isFavorite
        this.favoriteId = data.favoriteId
    }
}