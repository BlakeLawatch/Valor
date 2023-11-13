import { AppState } from "../AppState"
import { Player } from "../models/Player"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class PlayersService{
async getParticipatedIn(accountId){
    try {
        const res = await api.get(`api/players/account/${accountId}`)
        AppState.tournamentsParticipatedIn = res.data.map(player => new Player(player))
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
}

async getPlayersByTournamentId(tournamentId){
  const res = await api.get(`api/tournaments/${tournamentId}/players`)
  const players = res.data.map(obj => new Player(obj))
  logger.log('[PLAYERS SERVICE] got players in active tournaments', players)
  AppState.playersInActiveTournament = players
}

changeActiveDev(dev){
    AppState.activeDev = dev
}
}

export const playersService = new PlayersService