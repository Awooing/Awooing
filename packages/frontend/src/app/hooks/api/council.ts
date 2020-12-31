import { hookFetch, req } from '@/app/axios'
import { API_ENDPOINTS } from '@/app/utils/constants'
import { CouncilMemberDto } from '@awooing/backend/src/dto/db/CouncilMemberDto'
import { SuccessResponse } from '@awooing/backend/src/http/helpers/response.helper'
import { AxiosResponse } from 'axios'
import * as CS from '@awooing/backend/src/http/schemas/council.schema'

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

/**
 * PUT /council/create
 *
 * @function createMember()
 * @function hookCreateMember()
 */

export interface CouncilCreatedData {
  message: 'Created'
}

export const createMember = async ({
  name,
  description,
  role
}: CS.Create['Body']): Promise<
  false | AxiosResponse<SuccessResponse<CouncilCreatedData>>
> => {
  try {
    const res = await req<CouncilCreatedData>({
      method: 'PUT',
      url: API_ENDPOINTS.put.councilCreate(),
      data: {
        name,
        description,
        role
      }
    })

    return res
  } catch (e) {
    return false
  }
}

export const hookCreateMember = (body: CS.Create['Body'], auto = false) =>
  hookFetch(() => createMember(body), auto)
