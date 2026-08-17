<script setup>
import { useI18n } from '../i18n.js';

const { t } = useI18n();
</script>

<template>
  <section class="container contact" id="contact">
    <h2 v-reveal v-html="t('contact-title')"></h2>
    <p v-reveal>{{ t('contact-desc') }}</p>
    <div
      v-reveal
      style="
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
      "
    >
      <a href="mailto:cuongphuoc06@gmail.com" class="contact-email"
        >cuongphuoc06@gmail.com</a
      >
      <p style="font-size: 1.5rem; color: var(--accent-cyan)">
        {{ t('contact-phone') }}
      </p>
      <a
        href="https://www.facebook.com/phuocCuong34"
        target="_blank"
        class="cta-button"
        style="padding: 0.8rem 2rem"
        >{{ t('contact-fb') }}</a
      >
    </div>
  </section>
</template>
