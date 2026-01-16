<template>
  <section id="skills" class="skills-section py-5" ref="sectionRef">
    <div class="container">
      <div class="row mb-5 justify-content-center">
        <div class="col-lg-8 text-center">
          <h2 class="section-title">TECHNICAL_STACK</h2>
          <p class="section-intro text-secondary mt-3">
            A look into the technologies I use to build efficient, scalable back-end systems. I
            prioritize clean architecture and simple, precise logic in every line of code.
          </p>
        </div>
      </div>

      <div class="tile-row mb-4">
        <div
          v-for="(skill, index) in row1"
          :key="skill.name"
          class="skill-tile from-left"
          :class="{ 'animate-in': isVisible }"
          :style="{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }"
        >
          <img :src="skill.logo" class="tech-logo" />
          <span class="tech-name">{{ skill.name }}</span>
        </div>
      </div>

      <div class="tile-row mb-5 pb-5">
        <div
          v-for="(skill, index) in row2"
          :key="skill.name"
          class="skill-tile from-right"
          :class="{ 'animate-in': isVisible }"
          :style="{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }"
        >
          <img :src="skill.logo" class="tech-logo" />
          <span class="tech-name">{{ skill.name }}</span>
        </div>
      </div>

      <hr class="section-divider my-5" />

      <div class="row align-items-center mt-5 pt-5">
        <div class="col-lg-5 mb-5 mb-lg-0">
          <h2 class="section-title mb-4">Participated Events and Organizations</h2>
          <div class="org-content">
            <h4 class="text-primary mb-3">Community & Growth</h4>
            <p class="text-secondary">
              Beyond the code, I am actively involved in various tech organizations and
              competitions. These experiences have sharpened my leadership and ability to solve
              complex problems.
            </p>
            <p class="text-primary small font-monospace mt-3">
              <i class="bi bi-cursor-fill"></i> CLICK_IMAGE_FOR_DETAILS
            </p>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="collage-container">
            <div
              v-for="(event, index) in events"
              :key="index"
              :class="['collage-wrapper', `img-${index + 1}`]"
              @click="openModal(event)"
            >
              <img :src="event.image" class="collage-img" :alt="event.title" />
              <div class="click-hint">VIEW</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="selectedEvent" class="modal-overlay" @click.self="closeModal">
        <div class="modal-card">
          <button class="close-btn" @click="closeModal">&times;</button>
          <div class="modal-img-container">
            <img :src="selectedEvent.image" class="modal-img" />
          </div>
          <div class="modal-body p-4">
            <h3 class="text-primary mb-2 font-monospace">> {{ selectedEvent.title }}</h3>
            <p class="text-secondary mb-0">{{ selectedEvent.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const sectionRef = ref(null)
const selectedEvent = ref(null)

const row1 = [
  { name: 'Bootstrap', logo: new URL('../assets/bootstrap.png', import.meta.url).href },
  { name: 'C++', logo: new URL('../assets/c++.png', import.meta.url).href },
  { name: 'SQL server', logo: new URL('../assets/msSQLserver.png', import.meta.url).href },
  { name: 'C#', logo: new URL('../assets/csharp.png', import.meta.url).href },
  { name: 'github', logo: new URL('../assets/github.png', import.meta.url).href },
  { name: 'java', logo: new URL('../assets/java.png', import.meta.url).href },
]

const row2 = [
  { name: 'javascript', logo: new URL('../assets/javascript.png', import.meta.url).href },
  { name: '.NET framework', logo: new URL('../assets/NETframework.png', import.meta.url).href },
  { name: 'Render', logo: new URL('../assets/render.png', import.meta.url).href },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'vercel', logo: new URL('../assets/vercel.png', import.meta.url).href },
  { name: 'Visual Basics', logo: new URL('../assets/visualbasics.png', import.meta.url).href },
  { name: 'visual studio', logo: new URL('../assets/visualstudio.png', import.meta.url).href },
  { name: 'vs code', logo: new URL('../assets/vscode.png', import.meta.url).href },
  { name: 'vue', logo: new URL('../assets/vue.png', import.meta.url).href },
  { name: 'xampp', logo: new URL('../assets/xampp.png', import.meta.url).href },
]

const events = [
  {
    title: 'Zuitt Bootcamp Certificate',
    image: new URL('../assets/zuitt-certificate.png', import.meta.url).href,
    description:
      'Successfully completed intensive web development training, focusing on full-stack architecture and modern coding standards.',
  },
  {
    title: 'Syntax Organization',
    image: new URL('../assets/ITSC_2023.jpg', import.meta.url).href,
    description:
      'ITSC 2023 UFT - OFF Discovering IT Together Through Exploration, Collaboration, and Competition SYNTAX - CSTC Sariaya, February 2023',
  },
  {
    title: 'Technical Seminar 2024',
    image: 'https://placehold.co/800x600/0a0a0a/ffffff?text=Seminar+Event',
    description:
      'Attending expert-led sessions on modern backend architecture and database optimization.',
  },
]

const openModal = (event) => {
  selectedEvent.value = event
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedEvent.value = null
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      isVisible.value = entries[0].isIntersecting
    },
    { threshold: 0.1, rootMargin: '-50px' },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})
</script>

<style scoped>
.skills-section {
  background-color: var(--bs-body-bg);
  min-height: 100vh;
  overflow-x: hidden;
  padding: 120px 0;
}

.section-title {
  font-family: 'Share Tech Mono', monospace;
  color: var(--bs-emphasis-color, #fff);
  letter-spacing: 5px;
  font-weight: bold;
}

.section-intro {
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  color: var(--bs-secondary-color);
}

.tile-row {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}

/* --- THE SLIDE LOGIC --- */
.skill-tile {
  width: 180px;
  height: 180px;
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  opacity: 0;
  transition: all 0.9s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

[data-bs-theme='dark'] .skill-tile {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

.from-left {
  transform: translateX(-100vw);
}
.from-right {
  transform: translateX(100vw);
}
.skill-tile.animate-in {
  opacity: 1;
  transform: translateX(0);
}

/* --- TILE INTERNALS --- */
.tech-logo {
  width: 75px;
  height: 75px;
  object-fit: contain;
  transition: all 0.3s ease;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1));
}

[data-bs-theme='dark'] .tech-logo {
  filter: none;
}

.tech-name {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  color: var(--bs-secondary-color, #666);
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.skill-tile:hover {
  background: #1a1a1a !important;
  border-color: #333;
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

[data-bs-theme='dark'] .skill-tile:hover {
  background: rgba(var(--bs-primary-rgb), 0.15) !important;
  border-color: var(--bs-primary);
  box-shadow: 0 0 25px rgba(var(--bs-primary-rgb), 0.2);
}

.skill-tile:hover .tech-name {
  color: #fff !important;
}
.skill-tile:hover .tech-logo {
  transform: scale(1.1);
  filter: drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.3));
}

.section-divider {
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--bs-primary), transparent);
  opacity: 0.3;
}

/* --- COLLAGE BURST --- */
.collage-container {
  position: relative;
  height: 450px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collage-wrapper {
  position: absolute;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.collage-img {
  width: 320px;
  border-radius: 12px;
  border: 4px solid var(--bs-body-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: block;
}

.click-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bs-primary);
  color: #000;
  padding: 5px 15px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  border-radius: 4px;
}

.collage-wrapper:hover .click-hint {
  opacity: 1;
}

.img-1 {
  transform: rotate(-8deg) translateX(-30px);
  z-index: 3;
}
.img-2 {
  transform: rotate(5deg) translateX(30px) translateY(20px);
  z-index: 2;
}
.img-3 {
  transform: rotate(-2deg) translateY(-40px);
  z-index: 1;
}

.collage-container:hover .img-1 {
  transform: translate(-140px, -70px) rotate(-5deg);
  z-index: 10;
}
.collage-container:hover .img-2 {
  transform: translate(140px, 70px) rotate(5deg);
  z-index: 10;
}
.collage-container:hover .img-3 {
  transform: translate(0, -130px) scale(1.1);
  z-index: 11;
}

/* --- MODAL UPDATES --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 900px; /* Slightly wider to accommodate full certificates */
  width: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.modal-img-container {
  width: 100%;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #333;
}

.modal-img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain; /* FIX: ensures the full certificate is visible */
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 10;
  line-height: 1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 991px) {
  .collage-container {
    height: 350px;
  }
  .collage-img {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .skill-tile {
    width: 150px;
    height: 150px;
  }
}
</style>
