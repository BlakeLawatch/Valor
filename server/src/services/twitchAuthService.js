import axios from 'axios/dist/node/axios.cjs'


class TwitchAuthService {

    async getTwitchAuthToken() {
        const env = {
            clientSecret: process.env.client_secret,
            clientId: process.env.client_id
        }
        const res = await axios.request(`https://id.twitch.tv/oauth2/token?client_id=${env.clientId}&client_secret=${env.clientSecret}&grant_type=client_credentials`, { method: 'POST' })
        return res.data
    }
}

export const twitchAuthService = new TwitchAuthService()