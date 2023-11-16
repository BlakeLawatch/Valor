import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TournamentsService {
  async getTournamentsByQuery(query) {
    const tournaments = await dbContext.Tournaments.find({ name: { $regex: `${query.name}`, $options: 'i' } },)
    return tournaments
  }
  getTournamentByGameId(gameId) {
    const newGameId = Number(gameId)
    const tournaments = dbContext.Tournaments.find({ gameId: newGameId }).populate('playerCount')
    return tournaments
  }
  async getTournaments() {
    const tournaments = dbContext.Tournaments.find().populate('playerCount')
    return tournaments
  }

  // async getActiveTournaments() {
  //   const tournaments = dbContext.Tournaments.find({ startDate: { $gt: new Date().getUTCDate() } }).limit(10)
  //   return tournaments
  // }

  async getTournamentById(tournamentId) {
    const tournament = (await dbContext.Tournaments.findById(tournamentId)).populate('playerCount')
    if (!tournament) {
      throw new BadRequest(`No tournament exists with id: ${tournamentId}`)
    }
    return tournament
  }
  async getTournamentsbyCreator(creatorId) {
    const tournaments = await dbContext.Tournaments.find({ creatorId: creatorId }).populate('playerCount')
    if (tournaments == []) {
      return
    }
    return tournaments
  }

  async createTournament(tournamentData) {
    const newTournament = await dbContext.Tournaments.create(tournamentData)
    await newTournament.populate('playerCount')
    return newTournament
  }
  async editTournament(tournamentInfo, tournamentId, userId) {
    const editedTournament = await dbContext.Tournaments.findById(tournamentId).populate('playerCount')
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
  async deleteTournament(tournamentId, userId) {
    const tournament = await this.getTournamentById(tournamentId)

    if (tournament.creatorId.toString() != userId) {
      throw new Forbidden('NOT YOUR DATA')
    }

    await tournament.delete()
    return "TOURNAMENT DELETED"
  }
}

export const tournamentsService = new TournamentsService()