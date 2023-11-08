import { twitchAuthService } from "../services/twitchAuthService.js";
import BaseController from "../utils/BaseController.js";


export class TwitchAuthController extends BaseController {
    constructor() {
        super('api/twitch')
        this.router
            .get('', this.getTwitchAuthToken)
    }

    async getTwitchAuthToken(req, res, next) {
        try {
            const token = await twitchAuthService.getTwitchAuthToken()
            res.send(token)
        } catch (error) {
            next(error)
        }
    }
}