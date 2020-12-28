import { hookFetch, req } from '@/app/axios'
import UserDto from '@awooing/backend/src/dto/db/UserDto'
import * as AS from '@awooing/backend/src/http/schemas/auth.schema'
import { JwtPayload } from '@awooing/backend/src/http/helpers/jwt.helper'
import { API_ENDPOINTS } from '@/app/utils/constants'
import { AxiosResponse } from 'axios'
import { SuccessResponse } from '@awooing/backend/src/http/helpers/response.helper'

/**
 * POST /auth/login (AS.Login)
 *
 * @function authenticate(body)
 * @function hookLogin(body)
 */

export interface LoginSuccessData {
  token: JwtPayload
  user: UserDto
}

export const authenticate = async ({
  username,
  password
}: AS.Login['Body']): Promise<
  false | AxiosResponse<SuccessResponse<LoginSuccessData>>
> => {
  try {
    const res = await req<LoginSuccessData>({
      method: 'POST',
      url: API_ENDPOINTS.post.login(),
      data: {
        username,
        password
      }
    })

    return res
  } catch (e) {
    return false
  }
}

export const hookLogin = (body: AS.Login['Body'], auto = false) =>
  hookFetch(() => authenticate(body), auto)

/**
 * PUT /auth/register (AS.Login)
 *
 * @function register(body)
 * @function hookRegister(body)
 */

export const register = async ({
  username,
  password,
  repeat
}: AS.Register['Body']): Promise<
  false | AxiosResponse<SuccessResponse<LoginSuccessData>>
> => {
  try {
    const res = await req<LoginSuccessData>({
      method: 'PUT',
      url: API_ENDPOINTS.put.register(),
      data: {
        username,
        password,
        repeat
      }
    })

    return res
  } catch (e) {
    return false
  }
}

export const hookRegister = (body: AS.Register['Body'], auto = false) =>
  hookFetch(() => register(body), auto)
