import { BackendEndpoints } from '@awooing/backend/src/http/helpers/response.helper'
import { TopbarSettings } from '../topbar'

/**
 * LocalStorage Item Prefix
 *
 * This is the prefix for localStorage item keys
 * eg. item "token" is gonna be `${STORAGE_PREFIX}token`
 */
export const STORAGE_PREFIX = 'awooing_'

/**
 *
 */
export const STORAGE_NAMES = {
  AUTH_BEARER_TOKEN: 'auth_bearerToken'
}

/**
 * Default Page Title
 *
 * This is the default page title on "/" (and default hero title)
 */
export const DEFAULT_PAGE_TITLE = 'The Awooing Place'

/**
 * Page Title
 *
 * This is the domain part of the title on routes other than "/",
 * Example: "Articles | Awooing.moe" where "Awooing.moe" is Page Title
 */
export const PAGE_TITLE = 'Awooing.moe'

/**
 * Topbar Settings
 */
export const TOPBAR_SETTINGS: TopbarSettings = {
  barColors: {
    0: '#281483',
    0.3: '#8f6ed5',
    1.0: '#d782d9'
  }
}

/**
 * Primary Color
 */
export const PRIMARY_COLOR = 'rgb(139, 92, 246)'

/**
 * API
 * ------------------
 *
 * All API related constants
 */

/**
 * Backend Endpoints
 */
export const API_ENDPOINTS = BackendEndpoints

/**
 * Development API Endpoint
 */
export const DEV_API_ENDPOINT = 'http://localhost:8000'

/**
 * Staging API Endpoint
 */
export const STAGING_API_ENDPOINT = 'http://staging-api.awooing.moe/v2'

/**
 * Production API Endpoint
 */
export const PROD_API_ENDPOINT = 'http://api.awooing.moe/v2'

/**
 * Other
 * ------------------
 *
 * Some other miscellaneous stuff
 */

/**
 * Awooing Stops image used in the AwooingStopsCard
 */
export const AWOOING_STOPS_IMAGE =
  'https://media.discordapp.net/attachments/206530953391243275/720323844656594975/FB_IMG_1591808894267.jpg'

/**
 * Temp: Awoo Emotes
 * TODO: remove
 */
export const AWOO_EMOTES = {
  awooo: 'https://cdn.discordapp.com/emojis/322522663304036352.png'
}

/**
 * Wolkeh Discord
 */
export const AWOO_DISCORD = {
  id: '206530953391243275',
  invite: 'https://discord.gg/wolke'
}
