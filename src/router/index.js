import { createRouter, createWebHistory } from 'vue-router'
import IntroPage from '../views/Intropage.vue'
import HomePage from '../components/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroPage,
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
  ],
  // This ensures that when navigating, we always start at the top
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
