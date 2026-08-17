<script setup>
import { useI18n } from '../i18n.js';
import ballPool from '../assets/8_Ball_Pool_logo.jpg';
import hikid from '../assets/hikid-logo.png';
import hdbank from '../assets/logo-hdbank.jpg';
import estee from '../assets/estee-lauder-logo.png';

const { t } = useI18n();

const items = [
  { type: 'img', src: ballPool, alt: '8 Ball Pool' },
  { type: 'img', src: hikid, alt: 'HIKID' },
  { type: 'img', src: hdbank, alt: 'HDBank' },
  { type: 'img', src: estee, alt: 'Estée Lauder' },
  { type: 'text', text: 'RAPPER LOWG' },
  { type: 'text', text: 'MINH HẰNG' }
];
</script>

<template>
  <section id="partners" style="padding: 4rem 0 0 0">
    <div class="container">
      <h2
        class="section-title"
        v-reveal
        style="font-size: 2rem; margin-bottom: 2rem"
        v-html="t('partners-title')"
      ></h2>
    </div>
    <div class="marquee" v-reveal>
      <div class="marquee-content">
        <template v-for="(item, i) in items" :key="i">
          <img v-if="item.type === 'img'" :src="item.src" :alt="item.alt" />
          <span v-else>{{ item.text }}</span>
        </template>
        <template v-for="(item, i) in items" :key="'dup-' + i">
          <img v-if="item.type === 'img'" :src="item.src" :alt="item.alt" />
          <span v-else>{{ item.text }}</span>
        </template>
      </div>
    </div>
  </section>
</template>
