import { AppState } from "../AppState"
import { Video } from "../models/Video"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class VideosService{
async getMyClips(accountId){
    try {
        const res = await api.get(`api/videos/${accountId}/video`)
        logger.log('videos coming from API', res.data)
        AppState.videos = res.data.map((video) => new Video(video))
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
}
async addVideo(editable){
    try {
        const res = await api.post(`api/videos`, editable)
        AppState.videos.push(new Video(res.data))
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
}
async destroyClip(videoId){
    try {
        await api.delete(`api/videos/${videoId}`)
        AppState.videos = AppState.videos.filter(video => video.id != videoId)
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
}
// SECTION sorting clips here
async sortNew(){
    try {
        await AppState.videos.sort((a, b)=>{
            return new Date(a.createdAt) - new Date(b.createdAt) 
        })
    return AppState.videos
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
    
}
async sortOld(){
    try {
        await AppState.videos.sort((a, b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt) 
        })
    return AppState.videos
    } catch (error) {
        Pop.error(error)
        logger.error(error)
    }
    
}
}
export const videosService = new VideosService()