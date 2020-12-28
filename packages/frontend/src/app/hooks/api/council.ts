import { hookFetch, req } from '@/app/axios'
import { API_ENDPOINTS } from '@/app/utils/constants'
import { CouncilMemberDto } from '@awooing/backend/src/dto/db/CouncilMemberDto'

/**
 * GET /council
 *
 * @function fetchCouncil()
 * @function hookCouncil()
 */

export interface CouncilData {
  members: CouncilMemberDto
}

export const fetchCouncil = async () => {
  try {
    const res = await req<CouncilData>({
      method: 'GET',
      url: API_ENDPOINTS.get.council()
    })

    return res
  } catch (e) {
    console.log({ e })
    return false
  }
}

export const hookCouncil = (auto = true) => hookFetch(fetchCouncil, auto)
