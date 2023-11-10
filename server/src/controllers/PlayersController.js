import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { playersService } from "../services/PlayersService.js";
import { matchesService } from "../services/MatchesService.js";

export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .get('', this.getPlayers)
      .get('/:playerId', this.getPlayerById)
      .get('/:playerId/matches', this.getMatchesByPlayer)
      .get('/account/:accountId', this.getPlayersByAccount)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPlayer)
      .put('/:playerId', this.editPlayer)
      .delete('/:playerId', this.deletePlayerById)
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

  async getMatchesByPlayer(req, res, next) {
    try {
      const playerId = req.params.playerId
      const matches = await matchesService.getMatchesByPlayer(playerId)
      return res.send(matches)
    } catch (error) {
      next(error)
    }
  }

  async getPlayersByAccount(req, res, next) {
    try {
      const accountId = req.params.accountId
      const players = await playersService.getPlayersByAccount(accountId)
      return res.send(players)
    } catch (error) {
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
      const player = await playersService.editPlayer(playerData, playerId)
      res.send(player)
    }
    catch (error) {
      next(error)
    }
  }

  async deletePlayerById(req, res, next) {
    try {
      const playerId = req.params.playerId
      const message = await playersService.deletePlayerById(playerId)
      res.send(message)
    }
    catch (error) {
      next(error)
    }
  }
}