import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useConfigStore } from '@/stores/config.js'
import { useUserStore } from '@/stores/user.js'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView,
  },
  {
    path: '/setup',
    name: 'SetupPage',
    component: () => import('../views/SetupView.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginView.vue'),
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

router.beforeEach(async (to, from, next) => {
  const configStore = useConfigStore()
  const userStore = useUserStore()

  // if (configStore.setup === null && to.path !== '/error') {
  //   next('/error')
  // } else if (configStore.setup === false && to.path !== '/setup') {
  //   next('/setup')
  // } else if (configStore.setup && localStorage.getItem('token') == null && to.path !== '/login') {
  //   console.log('******************')
  //   next('/login')
  // } else {
  //   console.log('%%%%%%%%%%%%%%%%%%%')
  //   next()
  // }
  //

  // if (configStore.setup === null && to.path !== '/error') {
  //   next('/error')
  // } else
  if (!configStore.setup && to.path !== '/setup') {
    next('/setup')
  } else {
    let token = localStorage.getItem('token') || null
    if (to.path !== '/setup' && token === null && to.path !== '/login') {
      next('/login')
      return
    }
    // if (
    //   to.path !== '/setup' &&
    //   to.path !== '/login' &&
    //   to.path !== '/error' &&
    //   localStorage.getItem('token') === null
    // ) {
    //   next('/login')
    // } else {
    //   console.log('gggggggggggg')
    //   next()
    // }
    next()
  }

  // else if (localStorage.getItem('token') !== null) {
  //   next()
  // } else {
  //   console.log('**************')
  //   next('/login')
  // }
})

export default router
