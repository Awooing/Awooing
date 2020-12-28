import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export type VueImport = Promise<typeof import('*.vue')>

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
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
