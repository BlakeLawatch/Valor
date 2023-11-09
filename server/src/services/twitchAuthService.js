import axios from 'axios/dist/node/axios.cjs'


class TwitchAuthService {

    constructor() {
    }
    tokenData = {}
    async getTwitchAuthToken() {
        let time = new Date().getTime()
        if (this.tokenData.expireTime - time >= 600000) {
            return this.tokenData
        }

        const env = {
            clientSecret: process.env.client_secret,
            clientId: process.env.client_id
        }
        const res = await axios.request(`https://id.twitch.tv/oauth2/token?client_id=${env.clientId}&client_secret=${env.clientSecret}&grant_type=client_credentials`, { method: 'POST' })
        res.data.expireTime = time + res.data.expires_in
        this.tokenData = res.data
        return this.tokenData
    }
}

export const twitchAuthService = new TwitchAuthService()