import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tournamentsService } from "../services/TournamentsService.js";
import { playersService } from "../services/PlayersService.js";
import { matchesService } from "../services/MatchesService.js";

export class TournamentController extends BaseController {
  constructor() {
    super('api/tournaments')
    this.router
      .get('/query', this.getTournamentsByQuery)
      .get('', this.getTournaments)
      .get('/:tournamentId', this.getTournamentById)
      .get('/:tournamentId/players', this.getPlayersByTournamentId)
      .get('/:tournamentId/matches', this.getMatchesByTournament)
      .get('/creator/:creatorId', this.getTournamentsByCreator)
      .get('/game/:gameId', this.getTournamentsByGameId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTournament)
      .put('/:tournamentId', this.editTournament)
      .delete('/:tournamentId', this.cancelTournament)
      .delete('/:tournamentId/delete', this.deleteTournament)


  }

  async getTournamentsByQuery(req, res, next) {
    try {
      const query = req.query
      const tournaments = await tournamentsService.getTournamentsByQuery(query)
      return res.send(tournaments)
    } catch (error) {
      next(error)
    }
  }
  async getTournaments(req, res, next) {
    try {
      const tournaments = await tournamentsService.getTournaments()
      return res.send(tournaments)
    } catch (error) {
      next(error)
    }
  }

  async getTournamentById(req, res, next) {
    try {
      const tournamentId = req.params.tournamentId
      const tournament = await tournamentsService.getTournamentById(tournamentId)
      return res.send(tournament)
    } catch (error) {
      next(error)
    }
  }
  async getPlayersByTournamentId(req, res, next) {
    try {
      const tournamentId = req.params.tournamentId
      const getPlayers = await playersService.getPlayersByTournamentId(tournamentId)
      return res.send(getPlayers)
    } catch (error) {
      next(error)
    }
  }

  async getMatchesByTournament(req, res, next) {
    try {
      const tournamentId = req.params.tournamentId
      const matches = await matchesService.getMatchesByTournament(tournamentId)
      return res.send(matches)
    } catch (error) {
      next(error)
    }
  }
  async getTournamentsByCreator(req, res, next) {
    try {
      const creatorId = req.params.creatorId
      const tournaments = await tournamentsService.getTournamentsbyCreator(creatorId)
      return res.send(tournaments)
    } catch (error) {
      next(error)
    }
  }

  async getTournamentsByGameId(req, res, next) {
    try {
      const gameId = req.params.gameId
      const tournaments = await tournamentsService.getTournamentByGameId(gameId)
      return res.send(tournaments)
    } catch (error) {
      next(error)
    }
  }

  async createTournament(req, res, next) {
    try {
      const tournamentData = req.body
      const userId = req.userInfo.id
      tournamentData.creatorId = userId
      const newTournament = await tournamentsService.createTournament(tournamentData)
      return res.send(newTournament)
    } catch (error) {
      next(error)
    }
  }

  async editTournament(req, res, next) {
    try {

      const tournamentInfo = req.body
      const tournamentId = req.params.tournamentId
      const userId = req.userInfo.id
      const editedTournament = await tournamentsService.editTournament(tournamentInfo, tournamentId, userId)
      return res.send(editedTournament)
    } catch (error) {
      next(error)
    }
  }
  async cancelTournament(req, res, next) {
    try {
      const tournamentId = req.params.tournamentId
      const userId = req.userInfo.id
      const cancelledTournament = await tournamentsService.cancelTournament(tournamentId, userId)
      return res.send(cancelledTournament)
    } catch (error) {
      next(error)
    }
  }


  async deleteTournament(req, res, next) {
    try {
      const tournamentId = req.params.tournamentId
      const userId = req.userInfo.id
      const message = await tournamentsService.deleteTournament(tournamentId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}