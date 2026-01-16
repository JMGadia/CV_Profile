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
              <h4 class="font-monospace text-white">TRANSMISSION_DENIED</h4>
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
          <h2 class="section-title mb-4">CONNECT_WITH_ME</h2>
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
              <h2 class="form-heading mb-3 mb-md-4">INQUIRIES</h2>
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
                  class="mt-4 text-center font-monospace small"
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

  // 1. Get existing timestamps or create empty array
  let sentTimestamps = JSON.parse(localStorage.getItem('sent_emails_log') || '[]')

  // 2. Filter out timestamps older than 24 hours
  sentTimestamps = sentTimestamps.filter((timestamp) => now - timestamp < oneDay)

  // 3. Check if they already sent 2 emails in the last 24h
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

      // 4. Log the success timestamp
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
  background: #0a0a0a;
  border: 1px solid var(--bs-warning);
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 30px rgba(255, 193, 7, 0.2);
}

/* --- TRANSITIONS --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Existing Styles... */
.terminal-card {
  background: rgba(20, 20, 20, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
}
.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
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
.tech-input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
}
.tech-btn {
  font-family: 'Share Tech Mono', monospace;
  letter-spacing: 2px;
}
</style>
