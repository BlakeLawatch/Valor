import axios from "axios"


class TwitchAuthService {

    async getTwitchAuthToken() {
        const env = {
            clientSecret: process.env.client_secret,
            clientId: process.env.client_id
        }
        const res = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${env.clientId}&client_secret=${env.clientSecret}&grant_type=client_credentials`)

        return res
    }
}

export const twitchAuthService = new TwitchAuthService()