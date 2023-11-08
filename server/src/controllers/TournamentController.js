import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tournamentsService } from "../services/TournamentsService.js";

export class TournamentController extends BaseController {
    constructor() {
        super('api/tournaments')
        this.router
            .get('', this.getTournaments)
            .get('/:tournamentId', this.getTournamentById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTournament)
            .put('/:tournamentId', this.editTournament)
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
}