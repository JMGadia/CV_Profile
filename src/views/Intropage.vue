<template>
  <div
    class="intro-screen"
    @mousemove="handleMouseMove"
    @touchmove.prevent="handleTouchMove"
    @mousedown.left="handleDesktopClick"
  >
    <div class="stage">
      <div
        class="subject-container"
        :style="{ maskImage: flashlightMask, webkitMaskImage: flashlightMask }"
      >
        <img src="../assets/welcomeimage.png" alt="Target" class="target-image" />
        <div class="target-label">SUBJECT DETECTED</div>
      </div>
    </div>

    <div
      class="camera-rig"
      :style="{
        left: mousePos.px + 'px',
        top: mousePos.py + 'px',
        transform: `translate(-50%, -50%) rotate(${mousePos.tilt}deg) scale(${isMobile ? 0.8 : 1})`,
      }"
    >
      <div class="viewfinder">
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>

        <div class="hud-top">
          <span class="rec-dot">● REC</span>
        </div>

        <div v-if="isMobile" class="mobile-shutter-zone">
          <button @touchstart.stop="takePhoto" class="shutter-btn">
            <div class="shutter-inner"></div>
          </button>
          <span class="tap-hint">TAP TO SNAP</span>
        </div>

        <div class="hud-bottom">
          <span>ISO {{ isMobile ? 'Auto' : '800' }}</span>
          <span>F/2.8</span>
        </div>
      </div>
    </div>

    <div class="flash-effect" v-if="isFlashing"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isFlashing = ref(false)
const isMobile = ref(false)
const mousePos = ref({ px: 0, py: 0, xPct: 50, yPct: 50, tilt: 0 })

onMounted(() => {
  isMobile.value = /Android|iPhone/i.test(navigator.userAgent)

  // Set initial position to center for mobile
  mousePos.value.px = window.innerWidth / 2
  mousePos.value.py = window.innerHeight / 2
})

// Desktop Movement
const handleMouseMove = (e) => {
  if (isMobile.value) return
  updatePosition(e.clientX, e.clientY)
}

// Mobile Movement
const handleTouchMove = (e) => {
  const touch = e.touches[0]
  updatePosition(touch.clientX, touch.clientY)
}

const updatePosition = (x, y) => {
  const deltaX = x - mousePos.value.px
  mousePos.value.tilt = deltaX * 0.15

  mousePos.value.px = x
  mousePos.value.py = y
  mousePos.value.xPct = (x / window.innerWidth) * 100
  mousePos.value.yPct = (y / window.innerHeight) * 100
}

const flashlightMask = computed(() => {
  // Mobile gets a slightly larger reveal circle for easier visibility
  const radius = isMobile.value ? '150px' : '120px'
  return `radial-gradient(circle ${radius} at ${mousePos.value.xPct}% ${mousePos.value.yPct}%, black 0%, transparent 100%)`
})

const handleDesktopClick = () => {
  if (!isMobile.value) takePhoto()
}

const takePhoto = () => {
  if (isFlashing.value) return
  isFlashing.value = true
  setTimeout(() => {
    router.push('/home')
  }, 800)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

.intro-screen {
  height: 100vh;
  width: 100vw;
  background-color: #050505;
  overflow: hidden;
  position: relative;
  cursor: none;
  font-family: 'Share Tech Mono', monospace;
  touch-action: none; /* Prevents screen scrolling while moving camera */
}

/* --- THE REVEAL LOGIC --- */
.stage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.subject-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.target-image {
  width: 400px;
  max-width: 80%;
  filter: brightness(1.1) contrast(1.2) grayscale(0.5);
}

.target-label {
  color: #00ff00;
  font-size: 0.8rem;
  margin-top: 10px;
  text-shadow: 0 0 10px #00ff00;
}

/* --- CAMERA RIG --- */
.camera-rig {
  position: absolute;
  width: 350px;
  height: 220px;
  pointer-events: none;
  z-index: 10;
  transition:
    top 0.1s ease-out,
    left 0.1s ease-out;
}

.viewfinder {
  width: 100%;
  height: 100%;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background: rgba(255, 255, 255, 0.01);
}

/* Viewfinder Corners */
.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
}
.tl {
  top: -3px;
  left: -3px;
  border-right: 0;
  border-bottom: 0;
}
.tr {
  top: -3px;
  right: -3px;
  border-left: 0;
  border-bottom: 0;
}
.bl {
  bottom: -3px;
  left: -3px;
  border-right: 0;
  border-top: 0;
}
.br {
  bottom: -3px;
  right: -3px;
  border-left: 0;
  border-top: 0;
}

.rec-dot {
  color: #ff0000;
  animation: pulse 1s infinite;
}
@keyframes pulse {
  50% {
    opacity: 0.3;
  }
}

.hud-top,
.hud-bottom {
  color: #fff;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

/* --- MOBILE SHUTTER BUTTON --- */
.mobile-shutter-zone {
  position: absolute;
  bottom: -90px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
  text-align: center;
}

.shutter-btn {
  width: 70px;
  height: 70px;
  background: #fff;
  border-radius: 50%;
  border: 4px solid #333;
  padding: 5px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.shutter-inner {
  width: 100%;
  height: 100%;
  background: #eee;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.tap-hint {
  display: block;
  font-size: 10px;
  margin-top: 8px;
  color: #fff;
  text-shadow: 0 0 5px #000;
}

/* --- FLASH --- */
.flash-effect {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 100;
  animation: flash-animation 1s forwards;
}

@keyframes flash-animation {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
