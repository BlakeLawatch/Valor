import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TournamentsService{

    async getActiveTournaments(){
        const res = await api.get(`api/tournaments`)
        logger.log('active tournaments', res.data)
    }
}

export const tournamentsService = new TournamentsService()