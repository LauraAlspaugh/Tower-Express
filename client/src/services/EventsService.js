import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"
import { Favorite } from "../models/Favorite.js"

class EventsService{
async getEvents(){
const res = await api.get('api/events')
logger.log('getting events!', res.data)
AppState.events = res.data.map(pojo => new Event(pojo))
}
async getEventById(eventId){
AppState.activeEvent = null
const res = await api.get(`api/events/${eventId}`)
logger.log('getting album by id', res.data)
AppState.activeEvent = new Event(res.data)

}
async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    logger.log('creating event!', res.data)
    const newEvent = new Event(res.data)
    AppState.events.push(newEvent)
    return newEvent
}
async cancelEvent(eventId){
    const res = await api.delete(`api/events/${eventId}`)
    logger.log('canceling event', res.data)
 AppState.activeEvent = new Event(res.data)
}
async favoriteEvent(eventId) {
    logger.log(`creating a favorite with ${eventId}`)
    const res = await api.post('api/favorites', { eventId });
    logger.log('this is what we are getting back from the favorite post', res.data)
    AppState.favorites.push(new Favorite(res.data));
    AppState.myFavoriteEvents.push(new Favorite(res.data))
    // const recipe = AppState.recipes.find(recipe => recipe.id == recipeId);
    // recipe.favoriteCount++
}

async unfavoriteEvent(favoriteId) {
    logger.log('trying to unfavorite this.')
    const res = await api.delete(`api/favorites/${favoriteId}`);
    AppState.myFavoriteEvents = AppState.myFavoriteEvents.filter(event => event.favoriteId != favoriteId);

    return res.data


}
}
export const eventsService = new EventsService()