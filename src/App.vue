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
/* 1. DEFINE GLOBAL THEME COLORS */
:root {
  /* Default/Dark Mode Background */
  --bs-body-bg: #050505;
}

/* Specifically adjust the Light Mode background color here */
[data-bs-theme='light'] {
  /* Change this hex code to adjust the "white" theme brightness */
  --bs-body-bg: #dbdcdc; /* A soft, professional off-white/light-gray */

  /* Ensure text is dark enough on the light background */
  --bs-emphasis-color: #1a1a1a;
  --bs-secondary-color: #555555;
}

/* Specifically adjust the Dark Mode background color here */
[data-bs-theme='dark'] {
  --bs-body-bg: #050505;
}

/* 2. BODY AND LAYOUT */
body {
  background-color: var(--bs-body-bg);
  color: var(--bs-emphasis-color);
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  transition:
    background-color 0.6s ease,
    color 0.6s ease;
}

html {
  scroll-behavior: smooth;
}

/* 3. COMPONENT TRANSITIONS */
.navbar,
.card,
.custom-nav,
.skill-tile {
  transition:
    background-color 0.6s ease,
    border-color 0.6s ease,
    color 0.6s ease;
}

/* Fix for the theme toggle slider smoothness */
.switch-hand,
.theme-switch {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
}

/* 4. PAGE TRANSITION ANIMATION */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
