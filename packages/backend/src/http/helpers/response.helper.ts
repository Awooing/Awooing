import { FastifyReply } from 'fastify'

/**
 * Temporarily placed in here
 * TODO: find a better place
 */
export const BackendEndpoints = {
  get: {
    articleList: (perPage: number, currentPage: number): string =>
      `/article/list?perPage=${perPage}&currentPage=${currentPage}`,
    articleById: (id: string): string => `/article/id/${id}`,
    articleBySlug: (slug: string): string => `/article/slug/${slug}`,
    randomAwoo: (): string => '/awoo',
    council: (): string => '/council',
    currentUser: (): string => '/user',
    userById: (id: string): string => `/user/id/${id}`,
    userBySlug: (slug: string): string => `/user/slug/${slug}`,
  },
  post: {
    updateArticle: (): string => '/article/update',
    login: (): string => '/auth/login',
  },
  put: {
    createArticle: (): string => '/article/create',
    register: (): string => '/auth/register',
  },
}
export interface ErrorDescription {
  kind: string
  message: string
}

export interface BaseResponse<D = unknown, E = ErrorDescription> {
  success: boolean
  error?: E
  data?: D
}

export const ErrorKinds = {
  USER_INPUT: 'user_input',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  INTERNAL: 'internal',
}

export const CommonErrorResponses = {
  INVALID_OBJECTID: {
    kind: ErrorKinds.USER_INPUT,
    message: 'Invalid ObjectId',
  },
  ACCOUNT_UNAUTHORIZED: {
    kind: ErrorKinds.UNAUTHORIZED,
    message: 'Account not privileged to perform this action',
  },
  INTERNAL: {
    kind: ErrorKinds.INTERNAL,
    message: 'Internal Server Error',
  },
}

export interface SuccessResponse<Data extends BaseResponse['data']>
  extends BaseResponse {
  success: true
  data: Data
}

export interface ErrorResponse<Error extends BaseResponse['error']>
  extends BaseResponse {
  success: false
  error: Error
}

export const successRes = <Data extends BaseResponse['data']>(
  data: Data,
  reply: FastifyReply | null = null,
  status = 200
): SuccessResponse<Data> => {
  const res: SuccessResponse<Data> = {
    success: true,
    data,
  }

  if (reply) reply.status(status).send(res)
  return res
}

export const errorRes = <Error extends BaseResponse['error']>(
  error: Error,
  reply: FastifyReply | null = null,
  status = 200
): ErrorResponse<Error> => {
  const res: ErrorResponse<Error> = {
    success: false,
    error,
  }

  if (reply) reply.status(status).send(res)
  return res
}
