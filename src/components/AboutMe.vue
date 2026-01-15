<template>
  <div class="page-wrapper">
    <section id="about" class="about-section py-5">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-5 mb-5 mb-lg-0">
            <div class="profile-frame">
              <div class="viewfinder-corners">
                <div class="corner tl"></div>
                <div class="corner tr"></div>
                <div class="corner bl"></div>
                <div class="corner br"></div>
              </div>

              <div class="image-shift-container">
                <img src="../assets/formalimage.png" alt="JM Gadia" class="profile-img base-img" />
                <img
                  src="../assets/welcomeimage.png"
                  alt="JM Gadia Hover"
                  class="profile-img hover-img"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-7 ps-lg-5">
            <h1 class="display-4 fw-bold mb-4">
              A developer with <span class="gradient-text">precision</span> and
              <span class="gradient-text">simplicity</span>
            </h1>

            <div class="about-text fs-5 text-secondary">
              <p>
                Hello! I'm JHUN MARK D. GADIA, a passionate 4th year IT student and a software and
                web developer focused on building functional and visually striking web applications.
                My journey started with a curiosity for how things work behind every application,
                which evolved into a career of solving complex problems through code with straight
                to the point objectives.
              </p>
              <p>
                I specialize in architecting the logic that powers seamless digital experiences.
                While I value clean presentation, my true passion lies in building robust back-end
                systems and efficient APIs. I thrive on taking complex data requirements and
                distilling them into simple, high-performance server-side solutions.
              </p>
            </div>

            <div class="row mt-5">
              <div class="col-sm-6 mb-4">
                <div class="stat-box">
                  <h3 class="fw-bold">5+</h3>
                  <p class="small text-uppercase mb-0">Projects Completed</p>
                </div>
              </div>
              <div class="col-sm-6 mb-4">
                <div class="stat-box">
                  <h3 class="fw-bold">Vue.js</h3>
                  <p class="small text-uppercase mb-0">Main Stack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-section {
  background-color: var(--bs-body-bg);
  overflow: hidden;
}

/* Profile Frame Design */
.profile-frame {
  position: relative;
  padding: 20px;
  background: rgba(var(--bs-primary-rgb), 0.05);
  border: 1px solid rgba(var(--bs-primary-rgb), 0.1);
  border-radius: 12px;
  /* Ensure hover effect triggers when entering the frame */
  cursor: crosshair;
}

/* Container for the two images */
.image-shift-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1; /* Keeps the frame consistent */
  overflow: hidden;
  border-radius: 4px;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Initial state of the images */
.hover-img {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: scale(1.1) translateY(10px); /* Slight 'shift' prep */
  filter: brightness(1.2) contrast(1.1);
}

.base-img {
  filter: grayscale(20%);
}

/* Hover State - The "Shift" */
.profile-frame:hover .base-img {
  opacity: 0;
  transform: scale(0.95);
  filter: grayscale(0%);
}

.profile-frame:hover .hover-img {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Corner Accents */
.viewfinder-corners .corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--bs-primary);
  z-index: 2;
  transition: all 0.3s ease;
}

/* Subtle corner expansion on hover */
.profile-frame:hover .corner {
  width: 30px;
  height: 30px;
  border-color: #00d4ff;
}

.tl {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
}
.tr {
  top: 0;
  right: 0;
  border-left: 0;
  border-bottom: 0;
}
.bl {
  bottom: 0;
  left: 0;
  border-right: 0;
  border-top: 0;
}
.br {
  bottom: 0;
  right: 0;
  border-left: 0;
  border-top: 0;
}

.status-tag {
  position: absolute;
  bottom: -15px;
  right: 20px;
  background: var(--bs-body-bg);
  padding: 5px 15px;
  border: 1px solid var(--bs-primary);
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 1px;
  z-index: 3;
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  margin-right: 5px;
  animation: pulse 1.5s infinite;
}

.gradient-text {
  background: linear-gradient(45deg, var(--bs-primary), #00d4ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-box {
  padding: 20px;
  border-left: 3px solid var(--bs-primary);
  background: rgba(var(--bs-primary-rgb), 0.03);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 991px) {
  .min-vh-100 {
    min-height: auto !important;
  }
}
</style>
