import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { Tournament } from "../models/Tournament"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TournamentsService{

    async getActiveTournaments(){
        AppState.activeTournaments = []
        const res = await api.get(`api/tournaments`)
        AppState.activeTournaments = res.data.map((pojo) => new Tournament(pojo))
        logger.log('active tournaments', res.data)
    }
    async getMyTournaments(creatorId){
        const res = await api.get(`api/tournaments/creator/${creatorId}`)
        AppState.myTournaments = res.data.map(tournament => new Tournament(tournament))
    }

    async createTournament(body){
        const res = await api.post('api/tournaments', body)
        logger.log('new tournament', res.data)
        return res.data
    }

    async getTournamentById(tournamentId){
      const res = await api.get(`api/tournaments/${tournamentId}`)
      AppState.activeTournament = new Tournament(res.data)
    }
    

    async getTournamentsByGameId(gameId){
        AppState.activeTournaments = []
        const res = await api.get(`api/tournaments/game/${gameId}`)
        logger.log('my tournaments', res.data)
        AppState.activeTournaments = res.data.map(t=> new Tournament(t))

    }

    async editActiveTournament(tournamentData, tournamentId){
        const res = await api.put(`api/tournaments/${tournamentId}`, tournamentData)
        AppState.activeTournament = new Tournament(res.data)

    }

    async searchTournamentsByName(query){
        const res = await api.get(`api/tournaments/query?name=${query.name}`)
        logger.log('searched touneys', res.data)
        AppState.searchedTournaments = res.data.map(t=> new Tournament(t))
    }



}



export const tournamentsService = new TournamentsService()