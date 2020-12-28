import { hookFetch, req } from '@/app/axios'
import { API_ENDPOINTS } from '@/app/utils/constants'
import { CouncilMemberDto } from '@awooing/backend/src/dto/db/CouncilMemberDto'
import { SuccessResponse } from '@awooing/backend/src/http/helpers/response.helper'
import { AxiosResponse } from 'axios'

/**
 * GET /council
 *
 * @function fetchCouncil()
 * @function hookCouncil()
 */

export interface CouncilData {
  members: CouncilMemberDto
}

export const fetchCouncil = async (): Promise<
  false | AxiosResponse<SuccessResponse<CouncilData>>
> => {
  try {
    const res = await req<CouncilData>({
      method: 'GET',
      url: API_ENDPOINTS.get.council()
    })

    return res
  } catch (e) {
    return false
  }
}

export const hookCouncil = (auto = true) => hookFetch(fetchCouncil, auto)
