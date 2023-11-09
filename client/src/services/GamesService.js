import { AppState } from "../AppState"
import { Game } from "../models/Game"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GamesService{

    async getTwitchAccessToken(){
        const res = await api.get('api/twitch')
        logger.log('twitch key', res.data)
    }

async homeSearch(body){
    const res = await api.post('api/twitch', body)
    logger.log("game", res.data)
    AppState.games = res.data.map(g=> new Game(g))
    logger.log(AppState.games)

}

}

export const gamesService = new GamesService()