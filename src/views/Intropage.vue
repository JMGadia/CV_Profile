<template>
  <div
    class="intro-screen"
    @mousemove="handleMouseMove"
    @touchmove.prevent="handleTouchMove"
    @mousedown.left="handleDesktopClick"
  >
    <div class="stage">
      <div class="subject-container" :style="dynamicStyles.mask">
        <img src="../assets/welcomeimage.png" alt="Target" class="target-image" />
        <div class="target-label" v-if="isOverTarget">SUBJECT DETECTED</div>
      </div>
    </div>

    <div class="camera-rig" :style="dynamicStyles.rig">
      <div class="viewfinder">
        <div class="viewfinder-grid"></div>
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>

        <div class="hud-top d-flex justify-content-between">
          <div class="rec-group"><span class="rec-dot">●</span> <span>REC</span></div>
          <div class="date-time-group">{{ currentDateTime }}</div>
        </div>

        <div class="interaction-hint" :class="{ show: showHint }">
          <template v-if="isMobile"> TAP RED BUTTON TO CAPTURE </template>
          <template v-else> [ CLICK LEFT MOUSE TO CAPTURE ] </template>
        </div>

        <div v-if="isMobile" class="mobile-shutter-internal">
          <button @touchstart.stop="takePhoto" class="shutter-btn">
            <div class="shutter-inner"></div>
          </button>
        </div>

        <div class="hud-bottom d-flex justify-content-between">
          <div class="exposure">
            <span>ISO {{ isMobile ? 'Auto' : '800' }}</span>
            <span class="ms-3">1/125</span>
          </div>
          <div class="battery">
            <span>RAW</span>
            <span class="ms-3 border px-1">🔋 98%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flash-effect" v-if="isFlashing"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isFlashing = ref(false)
const isMobile = ref(false)
const isOverTarget = ref(false)
const showHint = ref(false)
const currentDateTime = ref('')
const pos = ref({ px: 0, py: 0, xPct: 50, yPct: 50, tilt: 0 })

let idleTimer = null

const updateDateTime = () => {
  const now = new Date()
  currentDateTime.value = now
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(',', '')
}

onMounted(() => {
  // Broad mobile detection + Screen size check
  const uaCheck = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const sizeCheck = window.innerWidth <= 1180
  isMobile.value = uaCheck || sizeCheck

  pos.value.px = window.innerWidth / 2
  pos.value.py = window.innerHeight / 2

  updateDateTime()
  setInterval(updateDateTime, 1000)

  if (!isMobile.value) showHint.value = true
})

const startIdleTimer = () => {
  if (!isMobile.value) return
  clearTimeout(idleTimer)
  showHint.value = false
  idleTimer = setTimeout(() => {
    showHint.value = true
  }, 1500)
}

const updateCoordinates = (x, y) => {
  const deltaX = x - pos.value.px
  pos.value.tilt = deltaX * 0.1
  pos.value.px = x
  pos.value.py = y
  pos.value.xPct = (x / window.innerWidth) * 100
  pos.value.yPct = (y / window.innerHeight) * 100

  const dist = Math.hypot(x - window.innerWidth / 2, y - window.innerHeight / 2)
  isOverTarget.value = dist < 150
  startIdleTimer()
}

const handleMouseMove = (e) => {
  if (!isMobile.value) updateCoordinates(e.clientX, e.clientY)
}
const handleTouchMove = (e) => {
  updateCoordinates(e.touches[0].clientX, e.touches[0].clientY)
}

const dynamicStyles = computed(() => {
  const radius = isMobile.value ? '140px' : '120px'
  const maskPath = `radial-gradient(circle ${radius} at ${pos.value.xPct}% ${pos.value.yPct}%, black 0%, transparent 100%)`
  return {
    mask: { maskImage: maskPath, webkitMaskImage: maskPath },
    rig: {
      left: `${pos.value.px}px`,
      top: `${pos.value.py}px`,
      transform: `translate(-50%, -50%) rotate(${pos.value.tilt}deg) scale(${isMobile.value ? 1 : 1})`,
    },
  }
})

const handleDesktopClick = () => {
  if (!isMobile.value) takePhoto()
}
const takePhoto = () => {
  if (isFlashing.value) return
  isFlashing.value = true
  setTimeout(() => router.push('/home'), 800)
}

onBeforeUnmount(() => clearTimeout(idleTimer))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

.intro-screen {
  height: 100vh;
  width: 100vw;
  background-color: #050505;
  overflow: hidden;
  position: relative;
  font-family: 'Share Tech Mono', monospace;
  touch-action: none;
  /* Remove cursor for desktop only if not mobile */
  cursor: v-bind('isMobile ? "auto" : "none"');
}

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
  align-items: center;
  justify-content: center;
}
.target-image {
  width: 350px;
  max-width: 70%;
  filter: brightness(1.2) contrast(1.2);
}
.target-label {
  color: #00ff00;
  font-size: 0.8rem;
  margin-top: 10px;
  position: absolute;
  bottom: 20%;
}

/* --- CAMERA DESIGN --- */
.camera-rig {
  position: absolute;
  width: 90vw; /* Take up more width on mobile */
  max-width: 450px;
  height: 300px;
  pointer-events: none;
  z-index: 10;
  transition: transform 0.1s ease-out;
}

.viewfinder {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
}

.viewfinder-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 33.33% 33.33%;
}

.corner {
  position: absolute;
  width: 25px;
  height: 25px;
  border: 3px solid #fff;
}
.tl {
  top: -2px;
  left: -2px;
  border-right: 0;
  border-bottom: 0;
}
.tr {
  top: -2px;
  right: -2px;
  border-left: 0;
  border-bottom: 0;
}
.bl {
  bottom: -2px;
  left: -2px;
  border-right: 0;
  border-top: 0;
}
.br {
  bottom: -2px;
  right: -2px;
  border-left: 0;
  border-top: 0;
}

.interaction-hint {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  color: #00ff00;
  font-size: 0.7rem;
  opacity: 0;
  transition: opacity 0.5s;
  text-align: center;
  width: 80%;
}
.interaction-hint.show {
  opacity: 1;
}

/* --- THE SHUTTER (NOW INSIDE VIEW) --- */
.mobile-shutter-internal {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: auto;
}

.shutter-btn {
  width: 60px;
  height: 60px;
  background: #222;
  border-radius: 50%;
  border: 4px solid #fff;
  padding: 5px;
}

.shutter-inner {
  width: 100%;
  height: 100%;
  background: #ff0000; /* Red for visibility */
  border-radius: 50%;
}

.hud-top,
.hud-bottom {
  color: #fff;
  font-size: 0.7rem;
  z-index: 2;
}
.rec-dot {
  color: #ff0000;
  animation: blink 1s infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.flash-effect {
  position: fixed;
  inset: 0;
  background: #fff;
  z-index: 100;
  animation: flash-anim 0.8s forwards;
}
@keyframes flash-anim {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

/* Media Queries for Tablet range (820x1180) */
@media (min-width: 415px) and (max-width: 1180px) {
  .camera-rig {
    width: 500px;
    height: 350px;
  }
}
</style>
