import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      // route level code-splitting
      // this generates a separate chunk (Projects.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ProjectsView.vue'),
    },
    {
      path: '/projects/:id',
      name: 'single-project',
      component: () => import('@/views/SingleProjectView.vue'),
    },
    {
      // will match everything and put it under `route.params.catchAll`
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: h('p', { style: 'color: red;' }, '404 Not Found'),
    },
  ],
})

export default router
