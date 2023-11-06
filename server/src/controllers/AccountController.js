import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
      .put('', this.editUserAccount)
  }
  async editUserAccount(request, response, next) {
    try {

      const userObj = request.userInfo
      const accountData = request.body
      const account = await accountService.updateAccount(userObj, accountData)
      return response.send(account)
    } catch (error) {
      next(error)

    }
  }
  async getMyTickets(request, response, next) {
    try {
      const userId = request.userInfo.id
      const tickets = await ticketsService.getMyTickets(userId)
      return response.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
