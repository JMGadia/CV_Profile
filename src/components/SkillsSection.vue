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
              class="collage-wrapper"
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
    title: 'SYNTAX Seminar 2023',
    image: new URL('../assets/ITSC_2023.jpg', import.meta.url).href,
    description:
      'ITSC 2023 UFT - OFF Discovering IT Together Through Exploration, Collaboration, and Competition SYNTAX - CSTC Sariaya, February 2023',
  },
  {
    title: 'SYNTAX Seminar 2024',
    image: new URL('../assets/ITSC_2024.jpg', import.meta.url).href,
    description:
      'ITSC 2024 TRAVERSE - Navigating the Cloud : Revolutionizing the IT Landscape - A Seminar on Cloud Computing and Career Strategies in the Industry SYNTAX - CSTC Sariaya, February 2024',
  },
  {
    title: 'SYNTAX Seminar 2025',
    image: new URL('../assets/ITSC_2025.jpg', import.meta.url).href,
    description:
      'ITSC IGNITE • Inspire Growth, Nurture Innovation, and Transform Excellence through the Power of Information Technology SYNTAX - CSTC Sariaya, November 2025',
  },
  {
    title: 'OJT Seminar 2025',
    image: new URL('../assets/OJT_2025.jpg', import.meta.url).href,
    description:
      '𝗜𝗚𝗡𝗜𝗧𝗜𝗡𝗚 𝗽𝗼𝘁𝗲𝗻𝘁𝗶𝗮𝗹 𝗮𝗻𝗱 𝗳𝘂𝗲𝗹𝗶𝗻𝗴 𝗲𝘅𝗰𝗲𝗹𝗹𝗲𝗻𝗰𝗲 Our 4th Year Students gained valuable insights and real-world preparation through the OJT Seminar.',
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

.tech-logo {
  width: 75px;
  height: 75px;
  object-fit: contain;
}
.tech-name {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* --- REFINED COLLAGE BURST --- */
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
  /* All start centered and slightly rotated for a "messy pile" look */
  transform: rotate(0deg) translate(0, 0);
  z-index: 1;
}

.collage-img {
  width: 300px;
  border-radius: 12px;
  border: 4px solid var(--bs-body-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: block;
}

/* Specific start rotations for the pile effect */
.collage-wrapper:nth-child(1) {
  transform: rotate(-5deg);
  z-index: 5;
}
.collage-wrapper:nth-child(2) {
  transform: rotate(3deg);
  z-index: 4;
}
.collage-wrapper:nth-child(3) {
  transform: rotate(-2deg);
  z-index: 3;
}
.collage-wrapper:nth-child(4) {
  transform: rotate(6deg);
  z-index: 2;
}
.collage-wrapper:nth-child(5) {
  transform: rotate(-8deg);
  z-index: 1;
}

/* BURST EFFECT ON HOVER */
.collage-container:hover .collage-wrapper:nth-child(1) {
  transform: translate(-160px, -80px) rotate(-10deg);
  z-index: 10;
}
.collage-container:hover .collage-wrapper:nth-child(2) {
  transform: translate(160px, -60px) rotate(8deg);
  z-index: 10;
}
.collage-container:hover .collage-wrapper:nth-child(3) {
  transform: translate(-140px, 90px) rotate(-5deg);
  z-index: 10;
}
.collage-container:hover .collage-wrapper:nth-child(4) {
  transform: translate(140px, 100px) rotate(12deg);
  z-index: 10;
}
.collage-container:hover .collage-wrapper:nth-child(5) {
  transform: translate(0, -140px) scale(1.05);
  z-index: 11;
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
.collage-wrapper:hover {
  z-index: 20 !important;
}

/* --- MODAL --- */
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
  max-width: 900px;
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
  max-height: 70vh;
  object-fit: contain;
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
    height: 400px;
  }
  .collage-img {
    width: 220px;
  }
  .collage-container:hover .collage-wrapper:nth-child(1) {
    transform: translate(-80px, -60px) rotate(-10deg);
  }
  .collage-container:hover .collage-wrapper:nth-child(2) {
    transform: translate(80px, -40px) rotate(8deg);
  }
  .collage-container:hover .collage-wrapper:nth-child(3) {
    transform: translate(-70px, 70px) rotate(-5deg);
  }
  .collage-container:hover .collage-wrapper:nth-child(4) {
    transform: translate(70px, 80px) rotate(12deg);
  }
}
</style>
