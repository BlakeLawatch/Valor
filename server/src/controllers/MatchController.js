import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { matchService } from "../services/MatchService.js";

export class MatchController extends BaseController {
    constructor() {
        super('api/match')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/:tournamentId/tournament', this.createMatch)
            .delete('/:matchId/match', this.destroyMatch)
    }
    async createMatch(req, res, next) {
        try {
            const newMatch = req.body
            const tourneyId = req.params.tournamentId
            newMatch.tournamentId = tourneyId
            const userId = req.userInfo.id
            const createdMatch = await matchService.createMatch(newMatch, userId)
            return res.send(createdMatch)
        } catch (error) {
            next(error)
        }
    }
    async destroyMatch(req, res, next) {
        try {
            const doomedMatchId = req.params.matchId
            const userId = req.userInfo.id
            const destroyedMatch = await matchService.destroyMatch(doomedMatchId, userId)
            return res.send(destroyedMatch)
        } catch (error) {
            next(error)
        }
    }
}