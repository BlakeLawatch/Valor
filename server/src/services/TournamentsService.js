import { dbContext } from "../db/DbContext.js"

class TournamentsService {

    // TODO come back and populate any methods that need it
    async createTournament(tournamentData) {
        const newTournament = await dbContext.Tournaments.create(tournamentData)
        return newTournament
    }
}

export const tournamentsService = new TournamentsService()