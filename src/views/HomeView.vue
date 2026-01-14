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
              <img src="../assets/formalimage.png" alt="JM Gadia" class="profile-img" />
              <div class="status-tag"><span class="status-dot"></span> AVAILABLE FOR WORK</div>
            </div>
          </div>

          <div class="col-lg-7 ps-lg-5">
            <h6 class="text-primary fw-bold mb-3">01. ABOUT ME</h6>
            <h1 class="display-4 fw-bold mb-4">
              Crafting digital experiences with <span class="gradient-text">precision.</span>
            </h1>

            <div class="about-text fs-5 text-secondary">
              <p>
                Hello! I'm **JM Gadia**, a passionate developer focused on building functional and
                visually striking web applications. My journey started with a curiosity for how
                things work behind the screen, which evolved into a career of solving complex
                problems through code.
              </p>
              <p>
                I specialize in bridging the gap between design and technology. Whether it's
                developing high-performance interfaces in **Vue.js** or architecting robust back-end
                systems, I thrive on turning ideas into interactive reality.
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

            <div class="mt-4">
              <a href="#inquiries" class="btn btn-primary btn-lg px-4 me-3">Let's Talk</a>
              <a href="#" class="btn btn-outline-secondary btn-lg px-4">Download CV</a>
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
}

.profile-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  filter: grayscale(20%);
  transition: filter 0.3s ease;
}

.profile-frame:hover .profile-img {
  filter: grayscale(0%);
}

/* Corner Accents */
.viewfinder-corners .corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--bs-primary);
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

/* Typography */
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
