import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Plugins from '../views/Plugins.vue'
import CreatePlugin from '../views/CreatePlugin.vue'
import Store from '../views/Store.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
