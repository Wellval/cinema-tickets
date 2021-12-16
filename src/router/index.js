import { createRouter, createWebHistory } from 'vue-router'

const routes = [
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
  },
  {
    path: '/manage',
    name: 'Manage',
    meta: {
      layout: 'main'
    },
    props: true,
    component: () => import('../views/Manage.vue')
  },
  {
    path: '/tickets/:movieId/:sessionId',
    name: 'Tickets',
    meta: {
      layout: 'main'
    },
    props: true,
    component: () => import('../views/Tickets.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
