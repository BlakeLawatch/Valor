import axios from 'axios/dist/node/axios.cjs'
import { BadRequest } from '../utils/Errors.js'

const env = {
  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID
}

class TwitchAuthService {
  constructor() {
    this.token = ''
  }
  tokenData = {}
  async getExternalApiResponse(body) {
    let time = new Date().getTime()
    if (!this.token || this.tokenData.expireTime - time >= 600000) {
      await this.getTwitchAuthToken()
    }
    if (!body) {
      throw new BadRequest("need something to search")
    }

    const res = await axios.request('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Client-ID': env.clientId,
        'Authorization': `Bearer ${this.token}`
      },
      data: `search "${body}"; 
fields name, cover.url; 
limit 10;`,
    })
    return res.data
  }


  async getTwitchAuthToken() {
    let time = new Date().getTime()
    if (this.tokenData.expireTime - time >= 600000) {
      return 'use old token'
    }

    const res = await axios.request(`https://id.twitch.tv/oauth2/token?client_id=${env.clientId}&client_secret=${env.clientSecret}&grant_type=client_credentials`, { method: 'POST' })
    res.data.expireTime = time + res.data.expires_in
    this.tokenData = res.data
    // TODO set this.token
    this.token = res.data.access_token
    return 'token made'
  }
}

export const twitchAuthService = new TwitchAuthService()