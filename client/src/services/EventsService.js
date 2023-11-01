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
}
export const eventsService = new EventsService()