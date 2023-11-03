import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"

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
}
export const eventsService = new EventsService()