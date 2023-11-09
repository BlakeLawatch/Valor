import { logger } from "../utils/Logger"
import { api,} from "./AxiosService"

class GamesService{

    async getTwitchAccessToken(){
        const res = await api.get('api/twitch')
        logger.log('twitch key', res.data)
    }

async homeSearch(value){

}

}

export const gamesService = new GamesService()