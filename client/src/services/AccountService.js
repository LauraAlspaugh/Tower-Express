import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from '../models/Ticket.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getMyTickets(){
    const res = await api.get('/account/tickets')
    logger.log('getting my tickets!', res.data)
    AppState.myTickets = res.data.map((ticket)=> new Ticket(ticket))
}
async editAccount(accountData) {
  const res = await api.put('/account', accountData)
  logger.log(res.data)
  AppState.account = new Account(res.data)
}
}

export const accountService = new AccountService()
