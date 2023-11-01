import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId/comments', this.getCommentsByEventId)
            .get('/:eventId/tickets', this.getTicketsByEventId)
            .get('/:eventId', this.getEventById)
            .get('', this.getEvents)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.destroyEvent)
    }
    async getCommentsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentsService.getCommentsByEventById(eventId)
            return response.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketsService.getTicketsByEventId(eventId)
            return response.send(tickets)
        } catch (error) {
            next(error)
        }
    }
    async destroyEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await eventsService.destroyEvent(eventId, userId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const eventData = request.body
            const updatedEvent = await eventsService.editEvent(eventId, userId, eventData)
            return response.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await eventsService.getEventById(eventId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getEvents(request, response, next) {
        try {
            const query = request.query
            const events = await eventsService.getEvents(query)
            return response.send(events)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await eventsService.createEvent(eventData)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
}