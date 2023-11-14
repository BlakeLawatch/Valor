import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class VideosService {
    async getVideosByAccount(accountId) {
        const foundVideos = await dbContext.Videos.find({ accountId })
        return foundVideos
    }
    async getVideosById(videoId) {
        const video = await dbContext.Videos.findById(videoId)
        if (!video) {
            throw new BadRequest(`${videoId} is not a valid ID`)
        }
        return video
    }
    async createVideo(videoData) {
        const newVideo = await dbContext.Videos.create(videoData)
        return newVideo
    }
    async destroyVideo(videoId, userId) {
        const video = await this.getVideosById(videoId)
        if (userId != video.accountId) {
            throw new Forbidden(`This is not your video to delete`)
        }
        const destroyedVideo = await dbContext.Videos.remove(video)
        return destroyedVideo
    }
}

export const videosService = new VideosService()