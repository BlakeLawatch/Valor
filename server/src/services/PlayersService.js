import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PlayersService {

  async getPlayers() {
    const players = await dbContext.Players.find()
      .populate('profile', 'name picture')
      .populate('tournament', 'name gameName')
    return players
  }

  async getPlayerById(playerId) {
    const player = await dbContext.Players.findById(playerId)
      .populate('profile')
      .populate('tournament', 'name, gameName')
    if (!player) {
      throw new BadRequest(`No player found with id of: ${playerId}`)
    }
    return player
  }

  async createPlayer(playerData) {
    const player = await dbContext.Players.create(playerData)
    await player.populate('profile')
    await player.populate('tournament', 'name gameName')
    return player
  }

  async editPlayer(playerData, userId, playerId) {
    const player = await this.getPlayerById(playerId)
    //NOTE NOT SURE IF WE NEED THIS VALIDATION, A PLAYER IS CREATED BY A USER BUT SEED WOULD BE EDITED BY THE TOURNAMENT OWNER...
    // if (userId != player.creatorId) {
    //   throw new Forbidden('You did not create this player object. Cannot make changes.')
    // }

    const keys = Object.keys(playerData)
    keys.forEach(key => player[key] = playerData[key])

    await player.save()
    return player
  }

  async getPlayersByTournamentId(tournamentId) {
    const getPlayers = await dbContext.Players.find({ tournamentId }).populate('profile', 'name picture')

    return getPlayers
  }

  async deletePlayerById(playerId) {
    const player = await dbContext.Players.findById(playerId)
    player.remove()
    return `Player with id: ${playerId} has been deleted`
  }

}

export const playersService = new PlayersService()