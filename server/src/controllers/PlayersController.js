import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { playersService } from "../services/PlayersService.js";

export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .get('', this.getPlayers)
      .get('/:playerId', this.getPlayerById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPlayer)
      .put('/:playerId', this.editPlayer)
  }

  async getPlayers(req, res, next) {
    try {
      const players = await playersService.getPlayers()
      res.send(players)
    }
    catch (error) {
      next(error)
    }
  }

  async getPlayerById(req, res, next) {
    try {
      const playerId = req.params.playerId
      const player = await playersService.getPlayerById(playerId)
      res.send(player)
    }
    catch (error) {
      next(error)
    }
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

  async editPlayer(req, res, next) {
    try {
      const playerData = req.body
      const userId = req.userInfo.id
      const playerId = req.params.playerId
      const player = await playersService.editPlayer(playerData, userId, playerId)
      res.send(player)
    }
    catch (error) {
      next(error)
    }
  }
}