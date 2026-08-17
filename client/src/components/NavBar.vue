<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from '../i18n.js';
import logoImg from '../assets/logo.jpg';

const router = useRouter();
const route = useRoute();
const { currentLang, toggleLang, t } = useI18n();

function goToSection(id) {
  const scroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  if (route.name !== 'home') {
    router.push({ name: 'home' }).then(scroll);
  } else {
    scroll();
  }
}
</script>

<template>
  <nav>
    <div class="container">
      <a class="logo" @click="router.push({ name: 'home' })">
        <img :src="logoImg" alt="PC34 Studio Logo" />
        PC34 <span class="neon-text-cyan">STUDIO</span>
      </a>
      <div class="nav-links">
        <a @click="goToSection('about')">{{ t('nav-about') }}</a>
        <a @click="goToSection('services')">{{ t('nav-services') }}</a>
        <a @click="goToSection('projects')">{{ t('nav-projects') }}</a>
        <router-link to="/blog">{{ t('nav-blog') }}</router-link>
        <a @click="goToSection('contact')">{{ t('nav-contact') }}</a>
        <button class="cta-button small" @click="toggleLang">
          {{ currentLang === 'en' ? 'VN' : 'EN' }}
        </button>
      </div>
    </div>
  </nav>
</template>
