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
  },
  {
    path: '/movie/:movieId',
    name: 'Movie',
    meta: {
      layout: 'main'
    },
    props: true,
    component: () => import('../views/Movie.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
