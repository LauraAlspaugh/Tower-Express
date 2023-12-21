import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js";

export class FavoritesController extends BaseController {
    constructor() {
        super('api/favorites')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get("/events", this.getMyFavoritedEvents)
            .post("/favorites", this.createFavoritedEvent)
            .delete('/events/:eventId', this.removeFavoritedEvent)
    }
    async removeFavoritedEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const deleteMessage = await favoritesService.removeFavoritedEvent(eventId, userId)
            return response.send(deleteMessage)
        } catch (error) { next(error) }
    }
    async createFavoritedEvent(request, response, next) {
        try {
            const favoritedEventData = request.body
            const userInfo = request.userInfo
            favoritedEventData.creatorId = userInfo.id
            let favoritedEvent = await favoritesService.createFavoritedEvent(favoritedEventData)
            return response.send(favoritedEvent)
        } catch (error) { next(error) }
    }
    async getMyFavoritedEvents(request, response, next) {
        try {
            const favoritedEvents = await favoritesService.getMyFavoritedEvents(request.userInfo.id)
            return response.send(favoritedEvents)
        } catch (error) { next(error) }
    }
}