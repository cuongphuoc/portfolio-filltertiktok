<script setup>
import { useI18n } from '../i18n.js';

const { t } = useI18n();

function goToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <section class="hero" id="home">
    <div class="container">
      <h1 v-reveal v-html="t('hero-title')"></h1>
      <p v-reveal>{{ t('hero-desc') }}</p>
      <a class="cta-button" v-reveal @click="goToProjects">{{ t('hero-cta') }}</a>
    </div>
  </section>
</template>
