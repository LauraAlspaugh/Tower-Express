import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class FavoritesService {
    async removeFavoritedEvent(eventId, creatorId) {
        const favoriteToDelete = await dbContext.FavoriteEvents.findOne({ eventId, creatorId })
        if (!favoriteToDelete) {
            throw new BadRequest(`Could not find by Event ID ${eventId}`)
        }
        if (favoriteToDelete.creatorId != creatorId) {
            throw new Forbidden(`You are not the one who liked this event`)
        }
        const results = (await favoriteToDelete.remove())
        return 'Successfully removed favorite: ' + results
    }

    async createFavoritedEvent(favoritedEventData) {
        const favoritedEvent = await dbContext.FavoriteEvents.create(favoritedEventData)
        await favoritedEvent.populate("creator")
        await favoritedEvent.populate("routine")
        return favoritedEvent
    }
    async getMyFavoritedEvents(userId) {
        const myFavoritedEvents = await dbContext.FavoriteEvents.find({ creatorId: userId })
            .populate({
                path: "routine", populate: { path: "creator", select: "name picture" }
            })
        return myFavoritedEvents
    }

}
export const favoritesService = new FavoritesService()