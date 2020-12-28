import { hookFetch, req } from '@/app/axios'
import { API_ENDPOINTS } from '@/app/utils/constants'
import { CdnFile } from '@awooing/backend/src/fetchers/cdn.fetcher'

/**
 * GET /awoo
 *
 * @function fetchRandomImage()
 * @function hookRandomImage()
 */

export interface AwooData {
  awoo: CdnFile
}

export const fetchRandomImage = async () => {
  try {
    const res = await req<AwooData>({
      method: 'GET',
      url: API_ENDPOINTS.get.randomAwoo()
    })

    return res
  } catch (e) {
    console.error('ERROR AWOOO')
    console.log({ e })
    return false
  }
}

export const hookRandomImage = (auto = true) =>
  hookFetch(fetchRandomImage, auto)
