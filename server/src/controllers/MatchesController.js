import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { matchesService } from "../services/MatchesService.js";

export class MatchesController extends BaseController {
    constructor() {
        super('api/match')
        this.router
            .get('/tournament/:tournamentId', this.getMatchesByTournament)
            .get('/:matchId', this.getMatchById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/tournament/:tournamentId', this.createMatch)
            .delete('/match/:matchId', this.destroyMatch)
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
    async getMatchById(req, res, next) {
        try {
            const matchId = req.params.matchId
            const match = await matchesService.getMatchById(matchId)
            return res.send(match)
        } catch (error) {
            next(error)
        }
    }
    async createMatch(req, res, next) {
        try {
            const newMatch = req.body
            const tourneyId = req.params.tournamentId
            newMatch.tournamentId = tourneyId
            const userId = req.userInfo.id
            const createdMatch = await matchesService.createMatch(newMatch, userId)
            return res.send(createdMatch)
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