<template>
  <section id="inquiries" class="inquiries-section py-5 mt-5" ref="inquiryRef">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 mb-5 mb-lg-0 scroll-reveal" :class="{ 'animate-in': isVisible }">
          <h2 class="section-title mb-4">CONNECT_WITH_ME</h2>
          <div class="intro-text">
            <h4 class="text-primary mb-3">> Status: Available for Collaboration</h4>
            <p class="text-secondary mb-4">
              I am a back-end focused developer passionate about building clean architecture and
              scalable systems. Whether you have a specific project in mind or just want to discuss
              system logic, my terminal is always open.
            </p>
            <ul class="list-unstyled font-monospace small text-secondary">
              <li class="mb-2">
                <i class="bi bi-chevron-right text-primary"></i> Focus: Vue.js / VB.Net / Supabase
              </li>
              <li class="mb-2">
                <i class="bi bi-chevron-right text-primary"></i> Philosophy: Keep it simple, keep it
                precise.
              </li>
              <li class="mb-2">
                <i class="bi bi-chevron-right text-primary"></i> Response Time: ~24-48 Hours
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-7 scroll-reveal delay-1" :class="{ 'animate-in': isVisible }">
          <div class="terminal-card">
            <div class="terminal-header d-flex align-items-center p-3">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="terminal-title ms-3">MAIL_SYSTEM.EXE</div>
            </div>

            <div class="p-4 p-md-5">
              <h2 class="section-title mb-4">INQUIRIES</h2>

              <form @submit.prevent="sendEmail" class="inquiry-form">
                <div class="mb-4">
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

                <div class="mb-4">
                  <label class="form-label text-primary small font-monospace"
                    >RETURN_PATH (EMAIL)</label
                  >
                  <input
                    v-model="formData.email"
                    type="email"
                    class="form-control tech-input"
                    placeholder="google_account@gmail.com"
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
                    rows="5"
                    placeholder="Compose your message here..."
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

// Intersection Observer for Scroll Animation
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.2 },
  )
  if (inquiryRef.value) observer.observe(inquiryRef.value)
})

const sendEmail = () => {
  isSending.value = true

  // Accessing hidden variables
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const templateParams = {
    from_name: formData.value.name,
    from_email: formData.value.email,
    message: formData.value.message,
  }

  emailjs
    .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    .then(() => {
      statusMsg.value = 'SUCCESS: Transmission complete.'
      statusClass.value = 'text-primary'
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
  min-height: 80vh;
}

.section-title {
  font-family: 'Share Tech Mono', monospace;
  color: var(--bs-emphasis-color, #fff);
  letter-spacing: 5px;
  font-weight: bold;
}

/* --- ANIMATION LOGIC --- */
.scroll-reveal {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
}

.scroll-reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.delay-1 {
  transition-delay: 200ms;
}

/* --- TERMINAL STYLES --- */
.terminal-card {
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
}

.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
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
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: 'Share Tech Mono', monospace;
}

.tech-input:focus {
  background: rgba(var(--bs-primary-rgb), 0.05);
  border-color: var(--bs-primary);
  box-shadow: 0 0 15px rgba(var(--bs-primary-rgb), 0.2);
  color: #fff;
}

.tech-btn {
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
  padding: 15px;
  letter-spacing: 2px;
  transition: all 0.3s ease;
}

.tech-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(var(--bs-primary-rgb), 0.4);
}
</style>
