import { createRouter, createWebHistory } from 'vue-router'
import IntroPage from '../views/Intropage.vue'
import HomeView from '../views/HomeView.vue'

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
      component: HomeView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// SESSION CONTROL LOGIC
router.beforeEach((to, from, next) => {
  const sessionStart = localStorage.getItem('portfolio_session')
  const ONE_HOUR = 3600000 // 1 hour in milliseconds

  if (to.name === 'home') {
    if (!sessionStart) {
      // No session found, go to intro
      next({ name: 'intro' })
    } else {
      const currentTime = Date.now()
      const timeElapsed = currentTime - parseInt(sessionStart)

      if (timeElapsed > ONE_HOUR) {
        // Session expired
        localStorage.removeItem('portfolio_session')
        next({ name: 'intro' })
      } else {
        // Session valid
        next()
      }
    }
  } else {
    // If going to intro, just let them
    next()
  }
})

export default router
