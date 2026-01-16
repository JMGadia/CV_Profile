<template>
  <div class="page-wrapper">
    <AboutSection />

    <hr class="section-divider" />

    <SkillsSection />

    <hr class="section-divider" />

    <InquirySection />
  </div>
</template>

<script setup>
import AboutSection from '../components/AboutMe.vue'
import SkillsSection from '../components/SkillsSection.vue'
import InquirySection from '../components/Inquiry.vue'
</script>

<style scoped>
/* Only global HomeView layout styles go here */
.page-wrapper {
  background-color: var(--bs-body-bg);
}

.section-divider {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    transparent,
    rgba(var(--bs-primary-rgb), 0.2),
    transparent
  );
  margin: 0;
}
</style>
