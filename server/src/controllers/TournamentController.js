import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tournamentsService } from "../services/TournamentsService.js";

export class TournamentController extends BaseController {
    constructor() {
        super('api/tournaments')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTournament)
    }
    async createTournament(req, res, next) {
        try {
            const tournamentData = req.body
            const userId = req.userInfo._id
            tournamentData.creatorId = userId
            const newTournament = await tournamentsService.createTournament(tournamentData)
            return res.send(newTournament)
        } catch (error) {
            next(error)
        }
    }
}