import { fetchMe } from '@/app/hooks/api/user'
import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  RouteRecordRaw
} from 'vue-router'
import store from '@/store/modules/user'
import { UserActions } from '@/store/modules/user'

export type VueImport = Promise<typeof import('*.vue')>

const createAuthMiddleware = (
  redirectIfFailed = false
): NavigationGuardWithThis<unknown> => {
  return async (_, __, next) => {
    try {
      const me = await fetchMe()
      store.dispatch(UserActions.setAuthenticated, me ? true : false)
      store.dispatch(UserActions.setUser, me ? me : null)
      if (!me && redirectIfFailed) next('/')
    } catch (_) {
      //
    }
    next()
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: (): VueImport => import('../layouts/default.vue'),
    children: [
      {
        path: '/',
        component: (): VueImport =>
          import(/* webpackChunkName: "index" */ '../pages/index.vue')
      },
      {
        path: '/news',
        component: (): VueImport =>
          import(/* webpackChunkName: "news" */ '../pages/news.vue')
      },
      {
        path: '/council',
        component: (): VueImport =>
          import(/* webpackChunkName: "council" */ '../pages/council.vue')
      },
      {
        path: '/awoo',
        component: (): VueImport =>
          import(/* webpackChunkName: "awoo" */ '../pages/awoo.vue')
      },
      {
        path: '/user/:id',
        component: (): VueImport =>
          import(/* webpackChunkName: "user_view" */ '../pages/user/_id.vue')
      }
    ],
    beforeEnter: createAuthMiddleware(false)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
