import axios from 'axios'
import awoo from '..'
import { botToken } from '../config'
import { dc, frmt } from '../console'

export class DiscordFetcher {
  url = (discordId: string, avatarId: string) =>
    `https://cdn.discordapp.com/avatars/${discordId}/${avatarId}`

  userById = async (discordId: string) => {
    try {
      awoo.logger().info(frmt(dc(), 'Fetch User Request for User', discordId))
      const res = await axios.request({
        method: 'GET',
        url: `https://discord.com/api/v8/users/${discordId}`,
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      })

      return res.data
    } catch (_) {
      return null
    }
  }

  avatarUrlById = async (discordId: string) => {
    try {
      return this.url(discordId, (await this.userById(discordId)).avatar)
    } catch (e) {
      return null
    }
  }
}

export default DiscordFetcher
