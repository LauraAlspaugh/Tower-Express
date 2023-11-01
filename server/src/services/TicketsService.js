import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class TicketsService {
    async destroyTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest('not a valid ticket id')
        }
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden('this is not your ticket bro')
        }
        await ticket.delete()
        return "ticket ended!"
    }
    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId })
            .populate('profile', 'name picture')
        return tickets
    }
    async getMyTickets(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId })
            .populate({
                path: 'event',
                populate: {
                    path: 'ticketCount'
                }
            })
        return tickets
    }
    async createTicket(ticketData) {
        const event = await eventsService.getEventById(ticketData.eventId)
        if (event.isCanceled) {
            throw new Forbidden('this Event has been canceled! ')
        }
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile', 'name picture')
        await ticket.populate('event')
        return ticket
    }

}
export const ticketsService = new TicketsService()