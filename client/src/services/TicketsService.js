
import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService{
async createTicket(eventId){
    
    const eventData = {eventId: eventId}
    const res = await api.post('api/tickets', {eventId})
    logger.log('getting ticket', res.data)
    AppState.tickets.push(new Ticket(res.data))
    
}
async getAttendees(eventId){
const res = await api.get(`api/events/${eventId}/tickets`)
logger.log('getting attendees',res.data)
AppState.tickets = res.data.map((ticket)=> new Ticket(ticket))
}
// async getMytickets(){
//     const res = await api.get('/account/tickets')
//     logger.log('getting my tickets!', res.data)
// }
async destroyTicket(ticketId){
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('deleting ticket!', res.data)
    AppState.myTickets = AppState.myTickets.filter((ticket)=> ticket.id != ticketId)
}
}
export const ticketsService = new TicketsService()