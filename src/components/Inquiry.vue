<template>
  <section id="inquiries" class="inquiries-section py-5 mt-md-5" ref="inquiryRef">
    <div class="container">
      <Transition name="fade">
        <div v-if="showLimitModal" class="terminal-modal-overlay">
          <div class="terminal-modal-card">
            <div class="terminal-header d-flex align-items-center p-2">
              <div class="terminal-dots">
                <span class="dot red" @click="showLimitModal = false"></span>
              </div>
              <div class="terminal-title ms-2">SYSTEM_SECURITY_ALERT</div>
            </div>
            <div class="p-4 text-center">
              <i class="bi bi-exclamation-triangle-fill text-warning display-4 mb-3"></i>
              <h4 class="font-monospace text-emphasis">TRANSMISSION_DENIED</h4>
              <p class="text-secondary small font-monospace">
                Reason: Daily transmission quota exceeded (2/2). <br />
                Please wait 24 hours before attempting a new handshake.
              </p>
              <button
                @click="showLimitModal = false"
                class="btn btn-outline-primary tech-btn btn-sm mt-3"
              >
                > ACKNOWLEDGE
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <div class="row align-items-center">
        <div class="col-lg-5 mb-5 mb-lg-0 scroll-reveal" :class="{ 'animate-in': isVisible }">
          <h2 class="section-title mb-4 text-emphasis">CONNECT_WITH_ME</h2>
          <div class="intro-text">
            <h4 class="text-primary mb-3">> Status: Available for Collaboration</h4>
            <p class="text-secondary mb-4">
              I am a back-end focused developer passionate about building clean architecture. My
              terminal is open for inquiries.
            </p>
            <ul class="list-unstyled font-monospace small text-secondary">
              <li class="mb-2">
                <i class="bi bi-chevron-right text-primary"></i> Focus: Vue.js / VB.Net / Supabase
              </li>
              <li class="mb-2">
                <i class="bi bi-chevron-right text-primary"></i> Quota: 2 Transmissions / 24h
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-7 scroll-reveal delay-1" :class="{ 'animate-in': isVisible }">
          <div class="terminal-card">
            <div class="terminal-header d-flex align-items-center p-2 p-md-3">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="terminal-title ms-2 ms-md-3">MAIL_SYSTEM.EXE</div>
            </div>

            <div class="terminal-body p-4 p-md-5">
              <h2 class="form-heading mb-3 mb-md-4 text-emphasis">INQUIRIES</h2>
              <form @submit.prevent="sendEmail" class="inquiry-form">
                <div class="mb-3 mb-md-4">
                  <label class="form-label text-primary small font-monospace"
                    >IDENTIFIER (NAME)</label
                  >
                  <input
                    v-model="formData.name"
                    type="text"
                    class="form-control tech-input"
                    placeholder="Enter full name..."
                    required
                  />
                </div>
                <div class="mb-3 mb-md-4">
                  <label class="form-label text-primary small font-monospace"
                    >RETURN_PATH (EMAIL)</label
                  >
                  <input
                    v-model="formData.email"
                    type="email"
                    class="form-control tech-input"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div class="mb-4">
                  <label class="form-label text-primary small font-monospace"
                    >TRANSMISSION_BODY</label
                  >
                  <textarea
                    v-model="formData.message"
                    class="form-control tech-input"
                    rows="4"
                    placeholder="Compose message..."
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-100 tech-btn" :disabled="isSending">
                  <span v-if="!isSending">> EXECUTE_SEND</span>
                  <span v-else>TRANSMITTING...</span>
                </button>
                <p
                  v-if="statusMsg"
                  class="mt-4 text-center font-monospace small status-message"
                  :class="statusClass"
                >
                  {{ statusMsg }}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import emailjs from '@emailjs/browser'

const isVisible = ref(false)
const inquiryRef = ref(null)
const isSending = ref(false)
const statusMsg = ref('')
const statusClass = ref('')
const formData = ref({ name: '', email: '', message: '' })
const showLimitModal = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) isVisible.value = true
    },
    { threshold: 0.1 },
  )
  if (inquiryRef.value) observer.observe(inquiryRef.value)
})

const sendEmail = () => {
  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000

  // Rate Limiting Logic: Check LocalStorage
  let sentTimestamps = JSON.parse(localStorage.getItem('sent_emails_log') || '[]')

  // Filter log to keep only timestamps from the last 24 hours
  sentTimestamps = sentTimestamps.filter((timestamp) => now - timestamp < oneDay)

  if (sentTimestamps.length >= 2) {
    showLimitModal.value = true
    statusMsg.value = 'ERROR: SECURITY_PROTOCOL_BLOCK - DAILY_LIMIT_REACHED'
    statusClass.value = 'text-danger'
    return
  }

  isSending.value = true
  statusMsg.value = 'CONNECTING_TO_SERVER...'

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.value.name,
        from_email: formData.value.email,
        message: formData.value.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )
    .then(() => {
      statusMsg.value = 'SUCCESS: Transmission complete.'
      statusClass.value = 'text-primary'

      // Log success and update localStorage
      sentTimestamps.push(Date.now())
      localStorage.setItem('sent_emails_log', JSON.stringify(sentTimestamps))

      formData.value = { name: '', email: '', message: '' }
    })
    .catch(() => {
      statusMsg.value = 'ERROR: System failure.'
      statusClass.value = 'text-danger'
    })
    .finally(() => {
      isSending.value = false
    })
}
</script>

<style scoped>
.inquiries-section {
  background-color: var(--bs-body-bg);
}

/* --- THEME-AWARE TERMINAL --- */
.terminal-card {
  background: var(--bs-tertiary-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.terminal-header {
  background: var(--bs-secondary-bg);
  border-bottom: 1px solid var(--bs-border-color);
}

.terminal-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: var(--bs-secondary-color);
}

.tech-input {
  background: var(--bs-body-bg);
  border: 1px solid var(--bs-border-color);
  color: var(--bs-body-color);
  font-family: 'Share Tech Mono', monospace;
  transition: all 0.3s ease;
}

.tech-input:focus {
  background: var(--bs-body-bg);
  border-color: var(--bs-primary);
  color: var(--bs-body-color);
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.15);
}

.tech-input::placeholder {
  color: var(--bs-secondary-color);
  opacity: 0.6;
}

/* --- MODAL STYLES --- */
.terminal-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
}

.terminal-modal-card {
  background: var(--bs-body-bg);
  border: 1px solid var(--bs-warning);
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(var(--bs-warning-rgb), 0.2);
}

/* --- UI ELEMENTS --- */
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  cursor: pointer;
}
.red {
  background: #ff5f56;
}
.yellow {
  background: #ffbd2e;
}
.green {
  background: #27c93f;
}

.tech-btn {
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 2px;
  font-weight: 600;
}

.status-message {
  word-break: break-word;
}

/* --- ANIMATIONS --- */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}
.scroll-reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* --- MOBILE RESPONSIVENESS --- */
@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
    text-align: center;
  }
  .intro-text {
    text-align: center;
  }
  .intro-text ul {
    display: inline-block;
    text-align: left;
  }
  .terminal-body {
    padding: 1.5rem !important;
  }
  .tech-input {
    font-size: 16px;
  }
}
</style>
