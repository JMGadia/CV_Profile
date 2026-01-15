<template>
  <nav class="navbar navbar-expand-lg sticky-top border-bottom custom-nav">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link px-3" href="#about">About Me</a>
          </li>
          <li class="nav-item">
            <a class="nav-link px-3" href="#skills">Skills</a>
          </li>
          <li class="nav-item">
            <a class="nav-link px-3" href="#inquiries">Inquiries</a>
          </li>

          <li class="nav-item ms-lg-4">
            <div class="theme-switch-wrapper" @click="toggleTheme">
              <div class="theme-switch" :class="{ 'is-dark': isDark }">
                <div class="switch-hand">
                  <span v-if="isDark">🌙</span>
                  <span v-else>☀️</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  isDark.value = savedTheme === 'dark'
  document.documentElement.setAttribute('data-bs-theme', savedTheme)
})
</script>

<style scoped>
/* Glassmorphism Effect */
.custom-nav {
  background-color: rgba(var(--bs-body-bg-rgb), 0.8) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.nav-link {
  font-weight: 500;
}

/* Modern Pill Switch Styles */
.theme-switch-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  /* Prevent global transition from interfering with the sliding animation */
  transition: none !important;
}

.theme-switch {
  width: 52px;
  height: 28px;
  background-color: #bbbcbe;
  border-radius: 50px;
  position: relative;
  border: 1px solid #dee2e6;
  /* Specific transition for the background color of the pill */
  transition: background-color 0.4s ease !important;
}

.is-dark.theme-switch {
  background-color: #343a40;
  border-color: #495057;
}

.switch-hand {
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: 2px;
  left: 3px;
  /* This is the slide animation - Cubic-bezier makes it feel "snappy" but smooth */
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.is-dark .switch-hand {
  transform: translateX(22px);
  background-color: #212529;
}

/* Ensure the emoji/icon doesn't flicker */
.switch-hand span {
  transition: opacity 0.3s ease;
}
</style>
