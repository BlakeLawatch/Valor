import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { matchesService } from "../services/MatchesService.js";

export class MatchesController extends BaseController {
    constructor() {
        super('api/match')
        this.router
            .get('', this.getMatches)
            .get('/tournament/:tournamentId', this.getMatchesByTournament)
            .get('/:matchId', this.getMatchById)
            .get('/player/:playerId', this.getMatchesByPlayer)
            .get('/winner/:winnerId', this.getMatchByWinner)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/tournament/:tournamentId', this.createMatch)
            .put('/:matchId', this.updateMatch)
            .delete('/match/:matchId', this.destroyMatch)
    }
    async getMatches(req, res, next) {
        try {
            const matches = await matchesService.getMatches()
            return res.send(matches)
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
    async getMatchById(req, res, next) {
        try {
            const matchId = req.params.matchId
            const match = await matchesService.getMatchById(matchId)
            return res.send(match)
        } catch (error) {
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
    async getMatchByWinner(req, res, next) {
        try {
            const winnerId = req.params.winnerId
            const matches = await matchesService.getMatchByWinner(winnerId)
            return res.send(matches)
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