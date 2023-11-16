import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { playersService } from "./PlayersService.js"
import { tournamentsService } from "./TournamentsService.js"

class MatchesService {
  async createBracketForTournament(tournamentId) {
    const players = await playersService.getPlayersByTournamentId(tournamentId)
    const numOfPlayers = players.length
    const totalRounds = await this.calculateRounds(numOfPlayers)
    const roundOnes = await this.calculateRoundOnes(numOfPlayers)
    const roundTwos = await this.calculateRoundTwos(numOfPlayers)
    return roundTwos.toLocaleString()
  }

  calculateRoundTwos(participants) {
    const originalNum = Math.trunc(Math.log2(participants))
    const num = (2 ** originalNum) * 2
    const roundTwos = num - participants
    return roundTwos
  }

  calculateRoundOnes(participants) {
    const originalNum = Math.trunc(Math.log2(participants))
    const roundOnes = participants - (2 ** originalNum)
    return roundOnes
  }
  calculateRounds(participants) {
    return Math.ceil(Math.log2(participants));
  }
  async getMatches() {
    const matches = await dbContext.Matches.find()
    return matches
  }
  async getMatchesByTournament(tournamentId) {
    const tournament = await tournamentsService.getTournamentById(tournamentId)
    const matches = await dbContext.Matches.find({ tournamentId: tournament.id })
    return matches
  }
  async getMatchById(matchId) {
    const match = await dbContext.Matches.findById(matchId)
    if (!match) {
      throw new BadRequest(`${matchId} is not a valid ID`)
    }
    return match
  }
  async getMatchesByPlayer(playerId) {
    const player = await playersService.getPlayerById(playerId)
    if (!player) {
      throw new BadRequest(`${playerId} is not a valid player id`)
    }
    const matches = await dbContext.Matches.find({ $or: [{ player1Id: playerId }, { player2Id: playerId }] })
    return matches
  }

  async getMatchesByWinnerId(winnerId) {
    const player = playersService.getPlayerById(winnerId)
    if (!player) {
      throw new BadRequest(`${winnerId} is not a valid player id`)
    }
    const matches = await dbContext.Matches.find({ winnerId })
    return matches
  }

  async createMatch(matchData, userId) {
    const tournament = await tournamentsService.getTournamentById(matchData.tournamentId)
    if (tournament.creatorId != userId) {
      throw new Forbidden(`You can't create a match for a tournament you don't own`)
    }
    const newMatch = await dbContext.Matches.create(matchData)
    return newMatch
  }

  async updateMatch(match, userId) {
    const foundMatch = await this.getMatchById(match.id)
    const tournament = await tournamentsService.getTournamentById(foundMatch.tournamentId)
    if (tournament.creatorId != userId) {
      throw new Forbidden(`You cannot edit a match for a tournament you do not own`)
    }
    foundMatch.player1Id = match.player1Id
    foundMatch.player2Id = match.player2Id
    foundMatch.roundNumber = match.roundNumber
    foundMatch.winnerId = match.winnerId
    await foundMatch.save()
    return foundMatch
  }

  async destroyMatch(matchId, userId) {
    const match = await this.getMatchById(matchId)
    const tournament = await tournamentsService.getTournamentById(match.tournamentId)
    if (tournament.creatorId != userId) {
      throw new Forbidden(`You cannot destroy a match on a tournament that does not belong to you`)
    }
    const destroyedMatch = await dbContext.Matches.remove(match)
    return destroyedMatch
  }
}

export const matchesService = new MatchesService()