import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/query', this.getAllProfilesByQuery)
      .get('/:accountId', this.getAccountById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editAccount)
      .post('/video', this.createVideo)
  }

  async getAccountById(req, res, next) {
    try {
      const accountId = req.params.accountId
      const account = await accountService.getAccountById(accountId)
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getAllProfilesByQuery(req, res, next) {
    try {
      const query = req.query
      const accounts = await accountService.getAllProfilesByQuery(query)
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
  async createVideo(req, res, next) {
    try {
      const userId = req.userInfo.id
      const videoData = req.body
      videoData.accountId = userId
      const video = await accountService.createVideo(videoData)
      return res.send(video)
    } catch (error) {
      next(error)
    }
  }
}
