import { fetchMe } from '@/app/hooks/api/user'
import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  RouteRecordRaw,
} from 'vue-router'
import store from '@/store/modules/user'
import { UserActions } from '@/store/modules/user'
import { tokenExists } from '@/app/hooks/localStorage/auth'
import { UserRole } from '@awooing/backend/src/db/entity/User'

export type VueImport = Promise<typeof import('*.vue')>

const createAuthMiddleware = (
  redirectIfFailed = false,
  role?: UserRole
): NavigationGuardWithThis<unknown> => {
  return async (_, __, next) => {
    let authenticated = tokenExists()

    if (!authenticated) return redirectIfFailed ?? role ? next('/') : next()

    try {
      const me = await fetchMe()
      authenticated = me ? true : false

      store.dispatch(UserActions.setAuthenticated, authenticated)
      store.dispatch(UserActions.setUser, me ? me.data.data.user : null)

      if (!authenticated && (redirectIfFailed ?? role)) return next('/')
      if (role) {
        if (!me) return next('/')
        return me.data.data.user.role === role ? next() : next('/')
      }
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
          import(/* webpackChunkName: "index" */ '../pages/index.vue'),
      },
      {
        path: '/news',
        component: (): VueImport =>
          import(/* webpackChunkName: "news" */ '../pages/news.vue'),
      },
      {
        path: '/council',
        component: (): VueImport =>
          import(/* webpackChunkName: "council" */ '../pages/council.vue'),
      },
      {
        path: '/awoo',
        component: (): VueImport =>
          import(/* webpackChunkName: "awoo" */ '../pages/awoo.vue'),
      },
      {
        path: '/user/:slug',
        component: (): VueImport =>
          import(/* webpackChunkName: "user-view" */ '../pages/user/_slug.vue'),
      },
      {
        path: '/news/article/:slug',
        component: (): VueImport =>
          import(
            /* webpackChunkName: "article-view" */ '../pages/article/_slug.vue'
          ),
        props: true,
      },
      {
        path: '/admin/article/create',
        component: (): VueImport =>
          import(
            /* webpackChunkName: "admin_article-create" */ '../pages/admin/article/create.vue'
          ),
        beforeEnter: createAuthMiddleware(true, 'Admin'),
      },
      {
        path: '/admin/council/create',
        component: (): VueImport =>
          import(
            /* webpackChunkName: "admin_council-create" */ '../pages/admin/council/create.vue'
          ),
        beforeEnter: createAuthMiddleware(true, 'Admin'),
      },
    ],
    beforeEnter: createAuthMiddleware(false),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
