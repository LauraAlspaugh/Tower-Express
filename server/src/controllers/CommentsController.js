import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commendId', this.destroyComment)
    }
    async destroyComment(request, response, next) {
        const commentId = request.params.commendId
        const userId = request.userInfo.id
        const message = await commentsService.destroyComment(commentId, userId)
        return response.send(message)
    }
    async createComment(request, response, next) {
        try {
            const commentData = request.body
            const userId = request.userInfo.id
            commentData.creatorId = userId
            const comment = await commentsService.createComment(commentData)
            return response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}