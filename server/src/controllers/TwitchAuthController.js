

import { twitchAuthService } from "../services/TwitchAuthService.js";
import BaseController from "../utils/BaseController.js";


export class TwitchAuthController extends BaseController {
    constructor() {
        super('api/twitch')
        this.router
            .get('', this.getTwitchAuthToken)
            .post('', this.getExternalApiResponse)
    }

    async getTwitchAuthToken(req, res, next) {
        try {
            const token = await twitchAuthService.getTwitchAuthToken()
            res.send(token)
        } catch (error) {
            next(error)
        }
    }

    async getExternalApiResponse(req, res, next) {
        try {
            const body = req.body.search
            const games = await twitchAuthService.getExternalApiResponse(body)
            res.send(games)
        } catch (error) {
            next(error)
        }
    }
}