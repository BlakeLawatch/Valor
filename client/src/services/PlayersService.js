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
  const players = res.data.map(p=> new Player(p))
  AppState.playersInActiveTournament = players
  AppState.filteredPlayers = players
}

filterParticipants(input){
    if(input == ''){
AppState.filteredPlayers = AppState.playersInActiveTournament
    }else{
AppState.filteredPlayers = AppState.playersInActiveTournament.filter(p=> p.profile.name.toLowerCase().includes(input.toLowerCase()))
    }
}

changeActiveDev(dev){
    AppState.activeDev = dev
}
}

export const playersService = new PlayersService