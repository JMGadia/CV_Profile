<template>
  <footer class="footer-section">
    <div class="container">
      <div class="row align-items-center py-5 border-top border-secondary border-opacity-25">
        <div class="col-md-4 text-center text-md-start mb-4 mb-md-0">
          <p class="small text-secondary mb-0">© 2026 • Built with Precision & Simplicity</p>
        </div>

        <div class="col-md-8">
          <div class="social-links d-flex justify-content-center justify-content-md-end gap-4">
            <a
              href="https://www.facebook.com/jhun.mark.gadia.2024"
              target="_blank"
              title="Facebook"
              class="social-icon"
            >
              <i class="bi bi-facebook"></i>
            </a>
            <a
              href="https://www.instagram.com/jhunmarkgadia002/"
              target="_blank"
              title="Instagram"
              class="social-icon"
            >
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://github.com/JMGadia" target="_blank" title="GitHub" class="social-icon">
              <i class="bi bi-github"></i>
            </a>
            <a
              href="https://ph.jobstreet.com/profile/me"
              target="_blank"
              title="JobStreet"
              class="social-icon"
            >
              <i class="bi bi-briefcase-fill"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/jhun-mark-d-gadia-438863315/"
              target="_blank"
              title="LinkedIn"
              class="social-icon"
            >
              <i class="bi bi-linkedin"></i>
            </a>
            <a
              href="https://stackoverflow.com/users/25381153/jhun-mark-d-gadia"
              target="_blank"
              title="Stack Overflow"
              class="social-icon"
            >
              <i class="bi bi-stack-overflow"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  background-color: var(--bs-body-bg);
  padding-top: 2rem;
}

.letter-spacing-2 {
  letter-spacing: 2px;
  background: linear-gradient(45deg, var(--bs-primary), #00d4ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.social-links {
  perspective: 1000px;
}

.social-icon {
  font-size: 1.5rem;
  color: var(--bs-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  text-decoration: none;
}

/* Hover Effect: Shift and Glow */
.social-icon:hover {
  color: var(--bs-primary);
  transform: translateY(-5px) scale(1.1);
  filter: drop-shadow(0 0 8px rgba(var(--bs-primary-rgb), 0.5));
}

/* Specific color on hover for variety (optional) */
.bi-github:hover {
  color: #fff;
}
.bi-facebook:hover {
  color: #1877f2;
}
.bi-instagram:hover {
  color: #e4405f;
}
.bi-linkedin:hover {
  color: #0a66c2;
}
.bi-stack-overflow:hover {
  color: #f48024;
}
.bi-briefcase-fill:hover {
  color: #00d4ff;
}

@media (max-width: 768px) {
  .social-links {
    gap: 1.5rem !important;
  }
}
</style>
