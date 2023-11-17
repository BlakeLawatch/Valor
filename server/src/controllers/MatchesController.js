import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { matchesService } from "../services/MatchesService.js";

export class MatchesController extends BaseController {
  constructor() {
    super('api/matches')
    this.router
      .get('', this.getMatches)
      .get('/:matchId', this.getMatchById)
      // NOTE Not sure this winner id method is needed. Might be handled by front end.
      .get('/:winnerId', this.getMatchesByWinnerId)
      .post('/:tournamentId', this.createBracketForTournament)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMatch)
      .put('/:matchId', this.updateMatch)
      .delete('/:matchId', this.destroyMatch)
  }
  async getMatches(req, res, next) {
    try {
      const matches = await matchesService.getMatches()
      return res.send(matches)
    }
    catch (error) {
      next(error)
    }
  }

  async getMatchById(req, res, next) {
    try {
      const matchId = req.params.matchId
      const match = await matchesService.getMatchById(matchId)
      return res.send(match)
    }
    catch (error) {
      next(error)
    }
  }

  // NOTE We might not need this method.
  async getMatchesByWinnerId(req, res, next) {
    try {
      const winnerId = req.params.winnerId
      const matches = await matchesService.getMatchesByWinnerId(winnerId)
      return res.send(matches)
    } catch (error) {
      next(error)
    }
  }

  async createBracketForTournament(req, res, next) {
    try {
      const tournamentId = req.params.tournamentId
      const bracket = await matchesService.createBracketForTournament(tournamentId)
      return res.send(bracket)
    } catch (error) {
      next(error)
    }
  }

  async createMatch(req, res, next) {
    try {
      const matchData = req.body
      const userId = req.userInfo.id

      const createdMatch = await matchesService.createMatch(matchData, userId)
      return res.send(createdMatch)
    }
    catch (error) {
      next(error)
    }
  }

  async updateMatch(req, res, next) {
    try {
      const userId = req.userInfo.id
      const matchId = req.params.matchId
      const match = req.body
      match.id = matchId
      const updatedMatch = await matchesService.updateMatch(match, userId)
      return res.send(updatedMatch)
    } catch (error) {
      next(error)
    }
  }

  async destroyMatch(req, res, next) {
    try {
      const doomedMatchId = req.params.matchId
      const userId = req.userInfo.id
      const destroyedMatch = await matchesService.destroyMatch(doomedMatchId, userId)
      return res.send(destroyedMatch)
    } catch (error) {
      next(error)
    }
  }
}