import { BackendFetchError, hookFetch, req } from '@/app/axios'
import { API_ENDPOINTS } from '@/app/utils/constants'
import { CdnFile } from '@awooing/backend/src/fetchers/cdn.fetcher'
import { SuccessResponse } from '@awooing/backend/src/http/helpers/response.helper'
import { AxiosResponse } from 'axios'

/**
 * GET /awoo
 *
 * @function fetchRandomImage()
 * @function hookRandomImage()
 */

export interface AwooData {
  awoo: CdnFile
}

export const fetchRandomImage = async (): Promise<
  false | AxiosResponse<SuccessResponse<AwooData>>
> => {
  try {
    const res = await req<AwooData>({
      method: 'GET',
      url: API_ENDPOINTS.get.randomAwoo(),
    })

    return res
  } catch (e) {
    if (e instanceof BackendFetchError) throw e
    return false
  }
}

export const hookRandomImage = (auto = true) =>
  hookFetch(fetchRandomImage, auto)
