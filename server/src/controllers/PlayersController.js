import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { playersService } from "../services/PlayersService.js";

export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPlayer)
  }

  async createPlayer(req, res, next) {
    try {
      const playerData = req.body
      const player = await playersService.createPlayer(playerData)
      res.send(player)
    }
    catch (error) {
      next(error)
    }
  }
}