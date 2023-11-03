import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
async getCommentsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('getting comments', res.data)
    AppState.comments = res.data.map((comment)=> new Comment(comment))
}
async createComment(commentData){
    const res = await api.post('api/comments', commentData)
    logger.log('creating comment!', res.data)
    AppState.comments.push(new Comment(res.data))

}
async destroyComment(commentId){
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('deleting comment!', res.data)
    AppState.comments = AppState.comments.filter((comment)=> comment.id != commentId)
}
}
export const commentsService = new CommentsService()