import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsService {
    async destroyComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('not a valid comment id')
        } if (comment.creatorId.toString() != userId) {
            throw new Forbidden('not your comment to destroy!')
        } await comment.delete()
        return "Comment Destroyed!"
    }
    async getCommentsByEventById(eventId) {
        const comments = await dbContext.Comments.find({ eventId: eventId })
            .populate('creator', 'name picture')
        return comments
    }
    async createComment(commentData) {
        const event = await eventsService.getEventById(commentData.eventId)
        if (event.isCanceled) {
            throw new Forbidden('this event has been canceled!')
        } const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment
    }

}
export const commentsService = new CommentsService()