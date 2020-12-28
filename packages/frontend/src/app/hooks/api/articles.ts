import { hookFetch, req } from '@/app/axios'
import ArticleDto from '@awooing/backend/src/dto/db/ArticleDto'
import * as AS from '@awooing/backend/src/http/schemas/article.schema'
import { API_ENDPOINTS } from '../../utils/constants'

/**
 * GET /article/list (AS.List)
 *
 * @function fetchArticles(querystring)
 * @function hookArticles(querystring)
 */

export interface ArticleListData {
  posts: ArticleDto[]
  pageInfo: AS.ListPageInfo
}

export const fetchArticles = async ({
  perPage = 2,
  currentPage = 1
}: AS.List['Querystring']) => {
  try {
    const res = await req<ArticleListData>({
      method: 'GET',
      url: API_ENDPOINTS.get.articleList(perPage, currentPage)
    })
    return res
  } catch (e) {
    console.log({ e })
    return false
  }
}

export const hookArticles = (params: AS.List['Querystring'], auto = true) =>
  hookFetch(() => fetchArticles(params), auto)
