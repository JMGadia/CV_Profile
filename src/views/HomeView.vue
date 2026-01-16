<template>
  <div class="page-wrapper">
    <AboutSection id="top-anchor" />

    <hr class="section-divider" />

    <SkillsSection />

    <hr class="section-divider" />

    <InquirySection />

    <Transition name="fade">
      <button v-if="showButton" @click="scrollToTop" class="back-to-top" aria-label="Scroll to top">
        <i class="bi bi-arrow-up"></i>
        <span class="btn-text">TOP</span>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AboutSection from '../components/AboutMe.vue'
import SkillsSection from '../components/SkillsSection.vue'
import InquirySection from '../components/Inquiry.vue'

const showButton = ref(false)

// Handle scroll visibility
const handleScroll = () => {
  // Show button after scrolling 400px down
  showButton.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.page-wrapper {
  background-color: var(--bs-body-bg);
  position: relative;
}

.section-divider {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(var(--bs-primary-rgb), 0.2),
    transparent
  );
  margin: 0;
}

/* --- BACK TO TOP BUTTON STYLES --- */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--bs-primary);
  border: none;
  color: #000; /* Contrast against primary color */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.back-to-top i {
  font-size: 1.2rem;
  line-height: 1;
  font-weight: bold;
}

.btn-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin-top: 2px;
}

.back-to-top:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 15px 30px rgba(var(--bs-primary-rgb), 0.4);
  background-color: #fff; /* Shifts to white on hover for a tech feel */
}

/* Transition Animation */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
}
</style>
