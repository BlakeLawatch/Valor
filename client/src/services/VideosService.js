import { AppState } from "../AppState"
import { Video } from "../models/Video"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class VideosService{
async getMyClips(accountId){
    try {
        const res = await api.get(`api/videos/${accountId}/video`)
        AppState.videos = res.data.map((video) => new Video(video))
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
}
}
export const videosService = new VideosService()