import { dbContext } from "../db/DbContext.js"

class VideosService {
    async createVideo(videoData) {
        const newVideo = await dbContext.Videos.create(videoData)
        return newVideo
    }
}

export const videosService = new VideosService()