import { BackendFetchError, hookFetch, req } from '@/app/axios'
import { API_ENDPOINTS } from '@/app/utils/constants'
import UserDto from '@awooing/backend/src/dto/db/UserDto'
import { SuccessResponse } from '@awooing/backend/src/http/helpers/response.helper'
import { AxiosResponse } from 'axios'

export interface UserSuccessData {
  user: UserDto
}

export const fetchMe = async (): Promise<
  false | AxiosResponse<SuccessResponse<UserSuccessData>>
> => {
  try {
    const res = await req<UserSuccessData>({
      method: 'GET',
      url: API_ENDPOINTS.get.currentUser(),
    })

    return res
  } catch (e) {
    if (e instanceof BackendFetchError) throw e
    return false
  }
}

export const hookMe = (auto = true) => hookFetch(fetchMe, auto)
