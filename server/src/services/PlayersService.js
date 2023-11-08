import { dbContext } from "../db/DbContext.js"

class PlayersService {

  async createPlayer(playerData) {
    const player = await dbContext.Players.create(playerData)
    await player.populate('profile', 'name picture')
    await player.populate('tournament', 'name gameName')
    return player
  }

  async getPlayersByTournamentId(tournamentId) {
    const getPlayers = await dbContext.Players.find({ tournamentId }).populate('profile', 'name picture')

    return getPlayers
  }

}

export const playersService = new PlayersService()