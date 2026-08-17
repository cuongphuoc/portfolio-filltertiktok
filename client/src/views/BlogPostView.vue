<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import api from '../api';
import { useI18n } from '../i18n.js';

const route = useRoute();
const { currentLang, t } = useI18n();

const md = new MarkdownIt({ html: true, linkify: true });

const post = ref(null);
const loading = ref(true);
const error = ref('');

const title = computed(
  () => post.value?.title?.[currentLang.value] || post.value?.title?.en || ''
);
const content = computed(() => {
  const raw = post.value?.content?.[currentLang.value] || post.value?.content?.en || '';
  return md.render(raw);
});

function formatDate(date) {
  return new Date(date).toLocaleDateString(
    currentLang.value === 'vi' ? 'vi-VN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await api.get(`/posts/${route.params.slug}`);
    post.value = data;
  } catch {
    error.value = 'Post not found';
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => route.params.slug, load);
</script>

<template>
  <article class="blog-post">
    <router-link to="/blog" class="back-link">← {{ t('blog-back') }}</router-link>

    <p v-if="loading" style="text-align: center; color: var(--text-secondary)">
      Loading...
    </p>
    <p v-else-if="error" style="text-align: center; color: var(--accent-magenta)">
      {{ error }}
    </p>
    <template v-else-if="post">
      <header class="post-header">
        <div>
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <h1>{{ title }}</h1>
        <div class="post-meta">
          <span>{{ formatDate(post.publishedAt) }}</span>
          <span>·</span>
          <span>PC34 Studio</span>
        </div>
      </header>
      <img
        v-if="post.coverImage"
        :src="post.coverImage"
        :alt="title"
        class="post-cover"
      />
      <div class="blog-post-content" v-html="content"></div>
    </template>
  </article>
</template>
