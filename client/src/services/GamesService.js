import { AppState } from "../AppState"
import { Game } from "../models/Game"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class GamesService{

    async getGameOptions(body){
        logger.log('body', body)
        const newBody = {search: body}
        const res = await api.post('api/twitch', newBody)
logger.log('searched games', res.data)
AppState.createFormGames = res.data.map(g => new Game(g))
    }

    async getTwitchAccessToken(){
        await api.get('api/twitch')
        // logger.log('twitch key', res.data)
    }

async homeSearch(body){
    const res = await api.post('api/twitch', body)
    // logger.log("game", res.data)
    AppState.games = res.data.map(g=> new Game(g))
    // logger.log(AppState.games)

}

async getGameById(gameId){
    AppState.activeTournaments = []
    AppState.activeGame = {}
    const res = await api.get(`api/twitch/${gameId}`)
    AppState.activeGame = new Game(res.data[0])
}

}

export const gamesService = new GamesService()