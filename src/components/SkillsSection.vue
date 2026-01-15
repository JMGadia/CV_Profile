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

      <div class="tile-row">
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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const sectionRef = ref(null)

const row1 = [
  { name: 'Bootstrap', logo: new URL('../assets/bootstrap.png', import.meta.url).href },
  { name: 'PHP', logo: 'https://cdn.simpleicons.org/php/777BB4' },
  { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20' },
]

const row2 = [
  { name: 'Express', logo: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      // isIntersecting is true when element enters, false when it leaves
      isVisible.value = entries[0].isIntersecting
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
      rootMargin: '-50px', // Slight buffer to ensure it triggers cleanly
    },
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
  display: flex;
  align-items: center;
}

.section-title {
  font-family: 'Share Tech Mono', monospace;
  /* Use a theme-aware color variable for the title text */
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
  /* Updated background to be slightly visible in light mode */
  background: rgba(128, 128, 128, 0.05);
  /* Added a very thin border for light mode definition */
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  opacity: 0;
  transition: all 0.9s cubic-bezier(0.19, 1, 0.22, 1);
  /* Soft shadow to help white logos stand out on white backgrounds */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

/* Dark mode specific override for tiles */
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
  transition: transform 0.3s ease;
  /* Added a drop shadow to ensure white logos are visible on white backgrounds */
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1));
}

[data-bs-theme='dark'] .tech-logo {
  filter: none; /* Remove shadow in dark mode for a cleaner look */
}

.tech-name {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  /* Adjust color to be visible on both modes */
  color: var(--bs-secondary-color, #666);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.skill-tile:hover {
  border-color: var(--bs-primary);
  background: rgba(var(--bs-primary-rgb), 0.08);
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.skill-tile:hover .tech-logo {
  transform: scale(1.1);
}

/* Status Indicator Decoration */
.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #ff0000;
  border-radius: 50%;
  transition: background 0.3s ease;
}
.status-dot.active {
  background: #00ff00;
  box-shadow: 0 0 10px #00ff00;
}

@media (max-width: 768px) {
  .skill-tile {
    width: 150px;
    height: 150px;
  }
}
</style>
