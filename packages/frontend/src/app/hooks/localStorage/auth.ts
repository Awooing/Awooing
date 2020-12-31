import { STORAGE_NAMES } from '@/app/utils/constants'
import { UserActions } from '@/store/modules/user'
import { JwtCreate } from '@awooing/backend/src/http/helpers/jwt.helper'
import { useStore } from 'vuex'
import {
  exists as storageExists,
  remove as storageDelete,
  retrieve as storageRetrieve,
  set as store,
} from '.'

const { AUTH_BEARER_TOKEN } = STORAGE_NAMES

/**
 * Checks if the auth token exists
 */
export const tokenExists = () => storageExists(AUTH_BEARER_TOKEN)

/**
 * Gets the current auth token
 */
export const retrieveToken = () => {
  const token = storageRetrieve<JwtCreate>(AUTH_BEARER_TOKEN)

  /**
   * Stored the old way as a plain string
   */
  if (typeof token === 'string') {
    storageDelete(AUTH_BEARER_TOKEN)
    return store<JwtCreate>(AUTH_BEARER_TOKEN, { token, validUntil: null })
  }

  return token
}

/**
 * Remove the token
 *
 * @param {boolean} logout Logout the user?
 */
export const removeToken = (logout: boolean) => {
  storageDelete(AUTH_BEARER_TOKEN)
  if (logout) window.history.go()
}

/**
 * Store the token
 *
 * @param {boolean} refresh Refresh page (needed for any authenticated requests)
 */
export const storeToken = (jwt: JwtCreate, refresh: boolean) => {
  const token = store<JwtCreate>(AUTH_BEARER_TOKEN, jwt)
  if (refresh) window.history.go()

  return token
}
