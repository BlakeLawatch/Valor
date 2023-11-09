import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { tournamentsService } from "./TournamentsService.js"

class MatchesService {
    async getMatchesByTournament(tournamentId) {
        const tournament = await tournamentsService.getTournamentById(tournamentId)
        if (!tournament) {
            throw new BadRequest(`${tournamentId} is not a valid ID`)
        }
        const matches = await dbContext.Matches.find({ tournamentID: tournament.id })
        return matches
    }
    async getMatchById(matchId) {
        const match = await dbContext.Matches.findById(matchId)
        if (!match) {
            throw new BadRequest(`${matchId} is not a valid ID`)
        }
        return match
    }
    async createMatch(match, userId) {
        const tournament = await tournamentsService.getTournamentById(match.tournamentId)
        if (tournament.creatorId != userId) {
            throw new Forbidden(`You can't create a match for a tournament you don't own`)
        }
        if (!tournament) {
            throw new BadRequest(`${match.tournamentId} is not a valid id`)
        }
        const newMatch = await dbContext.Matches.create(match)
        return newMatch
    }
    async destroyMatch(matchId, userId) {
        return 'This method has not been fully implemented yet, come back when get functions are done'
    }
}

export const matchesService = new MatchesService()