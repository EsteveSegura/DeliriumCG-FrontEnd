import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Plugins from '../views/Plugins.vue'
import CreatePlugin from '../views/CreatePlugin.vue'
import Store from '../views/Store.vue'
import Auth from '../views/Auth.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/plugins',
    name: 'Plugins',
    component: Plugins
  },
  {
    path: '/plugins/create',
    name: 'Create Plugin',
    component: CreatePlugin
  },
  {
    path: '/plugins/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.token != null

  if (!isAuthenticated) {
    if (to.name == 'Plugins' || to.name == 'Create Plugin' || to.name == 'Store') {
      next({ name: 'Home' })
    } else {
      next()
    }
  }

  next()
})

export default router
