import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { Tournament } from "../models/Tournament"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TournamentsService{

    async getActiveTournaments(){
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
    
    async getMyTournamentById(tournamentId){
        
    }
}

export const tournamentsService = new TournamentsService()