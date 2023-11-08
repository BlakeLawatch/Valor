import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { tournamentsService } from "./TournamentsService.js"

class MatchService {
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
}

export const matchService = new MatchService()