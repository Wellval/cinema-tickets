import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/movies',
    name: 'Movies',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/Movies.vue'),
    alias: '/'
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
