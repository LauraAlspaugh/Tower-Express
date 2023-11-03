import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
    //     throw new BadRequest('this is not a valid event id ')
    // } return event
    async destroyEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId.toString() != userId) {
            throw new Forbidden('Not your event to cancel!')
        }
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
    async editEvent(eventId, userId, eventData) {
        const eventToBeUpdated = await this.getEventById(eventId)
        if (eventToBeUpdated.creatorId.toString() != userId) {
            throw new BadRequest('do NOT EVEN TRY IT')
        } if (!eventToBeUpdated) {
            throw new BadRequest('this is not a valid event to update!')
        } if (eventToBeUpdated.isCanceled) {

            throw new BadRequest('this is not a valid id!')
        }
        eventToBeUpdated.name = eventData.name || eventToBeUpdated.name
        eventToBeUpdated.description = eventData.description || eventToBeUpdated.description
        await eventToBeUpdated.save()
        return eventToBeUpdated
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator ticketCount', 'name picture')
        if (!event) {
            throw new BadRequest('this is not a valid event id ')
        } return event
        // return event
    }
    async getEvents(query) {
        const events = dbContext.Events.find(query).populate('creator ticketCount', 'name picture')
        return events
    }
    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator ticketCount', 'name picture')
        return event

    }

}

export const eventsService = new EventsService()