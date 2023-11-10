import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/all', this.getAllProfiles)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editAccount)
  }

  async getAllProfiles(req, res, next) {
    try {
      const query = req.query
      const accounts = await accountService.getAllProfiles(query)
      res.send(accounts)
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
}
