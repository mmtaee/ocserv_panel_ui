import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useConfigStore } from '@/stores/config.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('../views/SetupView.vue'),
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: () => import('../views/ErrorView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const configStore = useConfigStore()

  // if (configStore.setup === null && to.path === '/error') {
  //   next('/error')
  // } else
  if (configStore.setup === false && to.path !== '/setup') {
    next('/setup')
  } else {
    next()
  }
})

export default router
