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
}

export const playersService = new PlayersService