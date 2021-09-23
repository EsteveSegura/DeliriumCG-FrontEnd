import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Plugins from '../views/Plugins.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
