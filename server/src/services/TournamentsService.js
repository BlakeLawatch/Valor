import { dbContext } from "../db/DbContext.js"

class TournamentsService {
    async getTournaments() {
        const tournaments = dbContext.Tournaments.find()
        return tournaments
    }

    async getTournamentById(tournamentId) {
        const tournament = (await dbContext.Tournaments.findById(tournamentId)).populate('game')
        return tournament
    }

    // TODO come back and populate any methods that need it
    async createTournament(tournamentData) {
        const newTournament = await dbContext.Tournaments.create(tournamentData)
        return newTournament
    }
}

export const tournamentsService = new TournamentsService()