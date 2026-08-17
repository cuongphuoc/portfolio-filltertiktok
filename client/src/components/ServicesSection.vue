<script setup>
import { Sparkles, Layers, Cpu, TrendingUp } from 'lucide-vue-next';
import { useI18n } from '../i18n.js';

const { t } = useI18n();

const services = [
  { icon: Sparkles, titleKey: 's1-title', descKey: 's1-desc' },
  { icon: Layers, titleKey: 's2-title', descKey: 's2-desc' },
  { icon: Cpu, titleKey: 's3-title', descKey: 's3-desc' },
  { icon: TrendingUp, titleKey: 's4-title', descKey: 's4-desc' }
];
</script>

<template>
  <section class="container" id="services">
    <h2 class="section-title" v-reveal v-html="t('services-title')"></h2>
    <div class="services-grid">
      <div
        v-for="s in services"
        :key="s.titleKey"
        class="glass-card service-card"
        v-reveal
      >
        <component :is="s.icon" />
        <h3>{{ t(s.titleKey) }}</h3>
        <p>{{ t(s.descKey) }}</p>
      </div>
    </div>
  </section>
</template>
