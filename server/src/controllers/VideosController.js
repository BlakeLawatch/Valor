import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { videosService } from "../services/VideoService.js";

export class VideosController extends BaseController {
    constructor() {
        super('api/videos')
        this.router
            .get('/:accountId/video', this.getVideosByAccount)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createVideo)
    }
    async getVideosByAccount(req, res, next) {
        try {
            const accountId = req.params.accountId
            const videos = await videosService.getVideosByAccount(accountId)
            return res.send(videos)
        } catch (error) {
            next(error)
        }
    }
    async createVideo(req, res, next) {
        try {
            const userId = req.userInfo.id
            const videoData = req.body
            videoData.accountId = userId
            const video = await videosService.createVideo(videoData)
            return res.send(video)
        } catch (error) {
            next(error)
        }
    }
}