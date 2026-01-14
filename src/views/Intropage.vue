<template>
  <div class="intro-screen v-100 d-flex align-items-center justify-content-center">
    <div class="content-box text-center p-4">

      <div class="image-container mb-4 mx-auto animate-fade-in">
        <div class="image-placeholder d-flex align-items-center justify-content-center">
           <img src="/src/assets/welcomeimage.png" alt="Logo or Personal Icon" class="rounded-circle shadow-sm" />
        </div>
      </div>

      <div class="text-container animate-slide-up">
        <h2 class="fw-light text-secondary mb-1">Hello, I am</h2>
        <h1 class="display-2 fw-bold text-primary mb-3">JMG</h1>
        <p class="lead mb-5 text-muted mx-auto" style="max-width: 500px;">
          Welcome to my digital space. I build functional and beautiful web experiences
          with modern technologies.
        </p>
      </div>

      <button @click="enterSite" class="btn-enter animate-fade-in-delayed">
        <span>Explore My Work</span>
        <i class="bi bi-arrow-right ms-2"></i>
      </button>

    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const enterSite = () => {
  // Pushes to the HomePage we defined in the router
  router.push('/home')
}
</script>

<style scoped>
.intro-screen {
  height: 100vh;
  background-color: var(--bs-body-bg);
  overflow: hidden;
}

/* Image Placeholder Styling */
.image-placeholder {
  width: 150px;
  height: 150px;
  border: 2px dashed var(--bs-primary-border-subtle);
  border-radius: 50%;
  margin: 0 auto;
}

/* Custom Modern Button */
.btn-enter {
  background: transparent;
  border: 2px solid var(--bs-primary);
  color: var(--bs-primary);
  padding: 12px 35px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-enter:hover {
  background-color: var(--bs-primary);
  color: white;
  box-shadow: 0 10px 20px rgba(var(--bs-primary-rgb), 0.2);
  transform: translateY(-3px);
}

/* Simple Animations */
.animate-fade-in {
  animation: fadeIn 1.2s ease forwards;
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
}

.animate-fade-in-delayed {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: 0.8s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>