import { AppState } from "../AppState"
import { Tournament } from "../models/Tournament"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TournamentsService{

    async getActiveTournaments(){
        const res = await api.get(`api/tournaments`)
        logger.log('active tournaments', res.data)
    }
    async getMyTournaments(creatorId){
        const res = await api.get(`api/tournaments/creator/${creatorId}`)
        AppState.myTournaments = res.data.map(tournament => new Tournament(tournament))
    }
}

export const tournamentsService = new TournamentsService()