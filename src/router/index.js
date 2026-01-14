import { createRouter, createWebHistory } from 'vue-router'
import IntroPage from '../views/Intropage.vue'
import HomeView from '../views/HomeView.vue' // Import the content, not the nav

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
      component: HomeView, // Fixed here
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
