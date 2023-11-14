import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { videosService } from "../services/VideoService.js";

export class VideosController extends BaseController {
    constructor() {
        super('api/videos')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/video', this.createVideo)
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