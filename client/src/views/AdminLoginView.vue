<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import { useAuth } from '../composables/auth.js';

const router = useRouter();
const { setToken } = useAuth();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function login() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await api.post('/auth/login', {
      username: username.value,
      password: password.value
    });
    setToken(data.token);
    router.push({ name: 'admin' });
  } catch (e) {
    error.value = e.response?.data?.message || 'Login failed';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="admin-login">
    <div class="glass-card">
      <h2 style="margin-bottom: 1.5rem">Admin Login</h2>
      <form @submit.prevent="login">
        <div class="form-field">
          <label>Username</label>
          <input v-model="username" type="text" autocomplete="username" />
        </div>
        <div class="form-field">
          <label>Password</label>
          <input v-model="password" type="password" autocomplete="current-password" />
        </div>
        <p v-if="error" class="error-text">{{ error }}</p>
        <button class="cta-button" type="submit" :disabled="loading" style="width: 100%">
          {{ loading ? '...' : 'Login' }}
        </button>
        <router-link
          to="/"
          style="
            display: block;
            text-align: center;
            margin-top: 1rem;
            color: var(--text-secondary);
            text-decoration: none;
          "
        >
          ← Back to site
        </router-link>
      </form>
    </div>
  </div>
</template>
