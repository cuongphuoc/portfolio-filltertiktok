<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';
import { useI18n } from '../i18n.js';

const { currentLang, t } = useI18n();

const posts = ref([]);
const loading = ref(true);
const error = ref('');

function readingTime(post) {
  const text = post.content?.[currentLang.value] || post.content?.en || '';
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    currentLang.value === 'vi' ? 'vi-VN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

onMounted(async () => {
  try {
    const { data } = await api.get('/posts');
    posts.value = data;
  } catch {
    error.value = 'Failed to load posts';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 v-reveal>{{ t('blog-title') }}</h1>
        <p v-reveal>{{ t('blog-subtitle') }}</p>
      </div>
    </section>

    <section class="container" style="padding-top: 2rem">
      <p v-if="loading" style="text-align: center; color: var(--text-secondary)">
        Loading...
      </p>
      <p v-else-if="error" style="text-align: center; color: var(--accent-magenta)">
        {{ error }}
      </p>
      <p
        v-else-if="posts.length === 0"
        style="text-align: center; color: var(--text-secondary)"
      >
        {{ t('blog-empty') }}
      </p>
      <div v-else class="blog-grid">
        <router-link
          v-for="post in posts"
          :key="post._id"
          :to="`/blog/${post.slug}`"
          class="glass-card blog-card"
          v-reveal
        >
          <img
            v-if="post.coverImage"
            :src="post.coverImage"
            :alt="post.title?.[currentLang] || post.title?.en"
            class="blog-cover"
          />
          <div class="blog-body">
            <div>
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <h3>{{ post.title?.[currentLang] || post.title?.en }}</h3>
            <p class="excerpt">{{ post.excerpt?.[currentLang] || post.excerpt?.en }}</p>
            <div class="post-meta">
              <span>{{ formatDate(post.publishedAt) }}</span>
              <span>·</span>
              <span>{{ readingTime(post) }} min</span>
            </div>
            <span class="read-more">{{ t('blog-read-more') }} →</span>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
