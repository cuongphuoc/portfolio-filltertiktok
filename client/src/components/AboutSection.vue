<script setup>
import { useI18n } from '../i18n.js';

const { t } = useI18n();
</script>

<template>
  <section class="container" id="about">
    <div class="glass-card" v-reveal>
      <h2
        class="section-title"
        style="text-align: left; margin-bottom: 2rem"
        v-html="t('about-title')"
      ></h2>
      <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 800px">
        {{ t('about-desc') }}
      </p>
    </div>
  </section>
</template>
