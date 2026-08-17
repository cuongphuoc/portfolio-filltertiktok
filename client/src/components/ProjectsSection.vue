<script setup>
import { useI18n } from '../i18n.js';

const { t } = useI18n();

const projects = [
  { name: '8 Ball Pool', id: 'dz_7cO4yexo' },
  { name: 'HIKID', id: '4AWlCIrBlys' },
  { name: 'HDBank', id: 'vw44EmTUOXU' },
  { name: 'Estée Lauder', id: 'En8E88b18kA' },
  { name: 'Rapper LowG', id: 'jskaKp9iNx4' },
  { name: 'Minh Hằng', id: 'cyvyi3Vnndk' }
];
</script>

<template>
  <section class="container" id="projects">
    <h2 class="section-title" v-reveal v-html="t('projects-title')"></h2>
    <div class="projects-grid">
      <div v-for="p in projects" :key="p.id" class="iframe-container" v-reveal>
        <iframe
          :src="`https://www.youtube.com/embed/${p.id}`"
          :title="p.name"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>
