<script setup>
import { useI18n } from '../i18n.js';

const { t } = useI18n();
</script>

<template>
  <footer>
    <div class="container">
      <p>{{ t('footer-rights') }}</p>
      <div style="margin-top: 1rem">
        <a href="#">Instagram</a>
        <a href="#">TikTok</a>
        <a href="#">Behance</a>
      </div>
    </div>
  </footer>
</template>
