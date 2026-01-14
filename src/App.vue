<template>
  <AppHeader v-if="$route.name !== 'intro'" />

  <main>
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <AppFooter v-if="$route.name !== 'intro'" />
</template>

<script setup>
import { onMounted } from 'vue' // Fix: Added onMounted import
import { useRouter } from 'vue-router' // Fix: Added useRouter import
import AppHeader from './components/HomePage.vue'
import AppFooter from './components/AppFooter.vue'

const router = useRouter()

onMounted(() => {
  // Logic to clear session and redirect to intro on page refresh
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    localStorage.removeItem('portfolio_session')
    router.push('/')
  }
})
</script>

<style>
/* Apply transitions only to theme-related properties, avoid !important */
body {
  transition:
    background-color 0.6s ease,
    color 0.6s ease;
}

/* Specifically target nav and cards for theme transitions */
.navbar,
.card,
.custom-nav {
  transition:
    background-color 0.6s ease,
    border-color 0.6s ease !important;
}

/* Fix for the theme toggle slider smoothness */
.switch-hand,
.theme-switch {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
  background-color: 0.4s ease !important;
}

/* Page Transition Animation */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
