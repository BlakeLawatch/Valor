import { dbContext } from "../db/DbContext.js"

class VideosService {
    async getVideosByAccount(accountId) {
        const foundVideos = await dbContext.Videos.find({ accountId })
        return foundVideos
    }
    async createVideo(videoData) {
        const newVideo = await dbContext.Videos.create(videoData)
        return newVideo
    }
}

export const videosService = new VideosService()