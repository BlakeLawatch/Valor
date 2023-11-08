import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      // .get('/player', this.getTickets)
      .put('', this.editAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async editAccount(req, res, next) {
    try {
      const userData = req.userInfo
      const accountData = req.body
      const editedAccount = await accountService.updateAccount(userData, accountData)
      return res.send(editedAccount)
    } catch (error) {
      next(error)
    }
  }
  // async getTickets(req, res, next) {
  //   try {
  //     const userData = req.userInfo
  //     const tickets = await accountService.getTickets(userData)
  //     return res.send(tickets)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
