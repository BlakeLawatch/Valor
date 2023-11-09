import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TournamentsService {
  async getTournaments() {
    const tournaments = dbContext.Tournaments.find().populate('game')
    return tournaments
  }

  async getTournamentById(tournamentId) {
    const tournament = (await dbContext.Tournaments.findById(tournamentId)).populate('game')
    if (!tournament) {
      throw new BadRequest(`No tournament exists with id: ${tournamentId}`)
    }
    return tournament
  }

  async createTournament(tournamentData) {
    const newTournament = await dbContext.Tournaments.create(tournamentData)
    await newTournament.populate('game')
    return newTournament
  }
  async editTournament(tournamentInfo, tournamentId, userId) {
    const editedTournament = await dbContext.Tournaments.findById(tournamentId)
    if (editedTournament.creatorId != userId) {
      throw new Forbidden('Not yours to edit')
    }
    const keys = Object.keys(tournamentInfo)
    keys.forEach(key => {
      if (key == 'isCancelled') {
        return
      }
      editedTournament[key] = tournamentInfo[key]
    })

    await editedTournament.save()
    editedTournament.populate('game')
    return editedTournament
  }

  async cancelTournament(tournamentId, userId) {
    const cancelledTournament = await this.getTournamentById(tournamentId)
    if (cancelledTournament.creatorId != userId) {
      throw new Forbidden('Not yours to cancel')
    }
    cancelledTournament.isCancelled = !cancelledTournament.isCancelled
    cancelledTournament.save()
    return cancelledTournament
  }
}

export const tournamentsService = new TournamentsService()