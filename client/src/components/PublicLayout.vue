<script setup>
import { RouterView } from 'vue-router';
import NavBar from './NavBar.vue';
import FooterBar from './FooterBar.vue';
</script>

<template>
  <div>
    <NavBar />
    <main>
      <RouterView />
    </main>
    <FooterBar />
  </div>
</template>
