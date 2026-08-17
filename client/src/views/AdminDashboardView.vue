<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import { useAuth } from '../composables/auth.js';

const router = useRouter();
const { logout } = useAuth();

const posts = ref([]);
const loading = ref(true);
const saving = ref(false);
const error = ref('');

const showForm = ref(false);
const form = ref(emptyForm());
const uploading = ref(false);
const lastUploadUrl = ref('');
const coverFileInput = ref(null);
const contentFileInput = ref(null);

function emptyForm() {
  return {
    _id: null,
    slug: '',
    titleVi: '',
    titleEn: '',
    excerptVi: '',
    excerptEn: '',
    contentVi: '',
    contentEn: '',
    coverImage: '',
    tags: '',
    published: true
  };
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function loadPosts() {
  loading.value = true;
  try {
    const { data } = await api.get('/admin/posts');
    posts.value = data;
  } catch {
    error.value = 'Failed to load posts';
  } finally {
    loading.value = false;
  }
}

function newPost() {
  form.value = emptyForm();
  showForm.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function editPost(post) {
  form.value = {
    _id: post._id,
    slug: post.slug,
    titleVi: post.title?.vi || '',
    titleEn: post.title?.en || '',
    excerptVi: post.excerpt?.vi || '',
    excerptEn: post.excerpt?.en || '',
    contentVi: post.content?.vi || '',
    contentEn: post.content?.en || '',
    coverImage: post.coverImage || '',
    tags: (post.tags || []).join(', '),
    published: post.published !== false
  };
  showForm.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  showForm.value = false;
  form.value = emptyForm();
}

async function save() {
  saving.value = true;
  error.value = '';
  const payload = {
    slug: form.value.slug || slugify(form.value.titleEn || form.value.titleVi),
    title: { vi: form.value.titleVi, en: form.value.titleEn },
    excerpt: { vi: form.value.excerptVi, en: form.value.excerptEn },
    content: { vi: form.value.contentVi, en: form.value.contentEn },
    coverImage: form.value.coverImage,
    tags: form.value.tags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    published: form.value.published
  };

  try {
    if (form.value._id) {
      await api.put(`/admin/posts/${form.value._id}`, payload);
    } else {
      await api.post('/admin/posts', payload);
    }
    await loadPosts();
    cancelEdit();
  } catch (e) {
    error.value = e.response?.data?.message || 'Save failed';
  } finally {
    saving.value = false;
  }
}

async function remove(post) {
  if (!window.confirm(`Delete "${post.slug}"?`)) return;
  try {
    await api.delete(`/admin/posts/${post._id}`);
    await loadPosts();
  } catch {
    error.value = 'Delete failed';
  }
}

function doLogout() {
  logout();
  router.push({ name: 'admin-login' });
}

async function uploadFile(file) {
  const fd = new FormData();
  fd.append('file', file);
  const { data } = await api.post('/admin/upload', fd);
  return data.url;
}

async function onCoverFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  uploading.value = true;
  error.value = '';
  try {
    form.value.coverImage = await uploadFile(file);
  } catch {
    error.value = 'Upload failed';
  } finally {
    uploading.value = false;
    e.target.value = '';
  }
}

async function onContentFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  uploading.value = true;
  error.value = '';
  try {
    const url = await uploadFile(file);
    lastUploadUrl.value = url;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable */
    }
  } catch {
    error.value = 'Upload failed';
  } finally {
    uploading.value = false;
    e.target.value = '';
  }
}

onMounted(loadPosts);
</script>

<template>
  <div class="admin-page">
    <div class="admin-header">
      <h1>Blog Admin</h1>
      <div style="display: flex; gap: 0.75rem">
        <router-link to="/" class="btn-secondary" style="text-decoration: none">
          View site
        </router-link>
        <button class="btn-danger" @click="doLogout">Logout</button>
      </div>
    </div>

    <div v-if="!showForm" style="margin-bottom: 2rem">
      <button class="cta-button" @click="newPost">+ New Post</button>
    </div>

    <!-- Create / Edit form -->
    <form v-if="showForm" class="glass-card" @submit.prevent="save" style="margin-bottom: 2.5rem">
      <h2 style="margin-bottom: 1.5rem">{{ form._id ? 'Edit Post' : 'New Post' }}</h2>

      <div class="form-row">
        <div class="form-field">
          <label>Title (VN)</label>
          <input v-model="form.titleVi" type="text" />
        </div>
        <div class="form-field">
          <label>Title (EN)</label>
          <input v-model="form.titleEn" type="text" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label>Excerpt (VN)</label>
          <textarea v-model="form.excerptVi" rows="2"></textarea>
        </div>
        <div class="form-field">
          <label>Excerpt (EN)</label>
          <textarea v-model="form.excerptEn" rows="2"></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label>Content (VN) — Markdown</label>
          <textarea v-model="form.contentVi" rows="10"></textarea>
        </div>
        <div class="form-field">
          <label>Content (EN) — Markdown</label>
          <textarea v-model="form.contentEn" rows="10"></textarea>
        </div>
      </div>

      <div
        style="
          margin: 1.5rem 0;
          padding: 1rem;
          border: 1px dashed var(--glass-border);
          border-radius: 12px;
        "
      >
        <label style="font-size: 0.85rem; color: var(--text-secondary)">
          Upload image for content (Markdown)
        </label>
        <div
          style="
            display: flex;
            gap: 0.75rem;
            align-items: center;
            margin-top: 0.5rem;
            flex-wrap: wrap;
          "
        >
          <button
            type="button"
            class="btn-secondary"
            :disabled="uploading"
            @click="contentFileInput && contentFileInput.click()"
          >
            Upload image
          </button>
          <input
            ref="contentFileInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="onContentFile"
          />
          <span
            v-if="lastUploadUrl"
            style="font-size: 0.8rem; color: var(--accent-cyan); word-break: break-all"
          >
            {{ lastUploadUrl }}
          </span>
        </div>
        <p
          v-if="lastUploadUrl"
          style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem"
        >
          Copied to clipboard — paste as <code>![alt](url)</code> in content.
        </p>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label>Slug (auto from title EN if empty)</label>
          <input v-model="form.slug" type="text" placeholder="my-post-slug" />
        </div>
        <div class="form-field">
          <label>Cover image URL</label>
          <div style="display: flex; gap: 0.5rem">
            <input v-model="form.coverImage" type="text" placeholder="https://..." />
            <button
              type="button"
              class="btn-secondary"
              :disabled="uploading"
              @click="coverFileInput && coverFileInput.click()"
            >
              {{ uploading ? 'Uploading...' : 'Upload' }}
            </button>
            <input
              ref="coverFileInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="onCoverFile"
            />
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-field">
          <label>Tags (comma separated)</label>
          <input v-model="form.tags" type="text" placeholder="AR, TikTok, Tutorial" />
        </div>
        <div class="form-field checkbox-field">
          <input v-model="form.published" type="checkbox" id="published" />
          <label for="published">Published</label>
        </div>
      </div>

      <p v-if="error" class="error-text">{{ error }}</p>

      <div style="display: flex; gap: 0.75rem">
        <button class="cta-button" type="submit" :disabled="saving">
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
        <button class="btn-secondary" type="button" @click="cancelEdit">Cancel</button>
      </div>
    </form>

    <!-- Posts list -->
    <p v-if="loading" style="color: var(--text-secondary)">Loading...</p>
    <div v-else class="admin-posts-list">
      <div v-for="post in posts" :key="post._id" class="glass-card admin-post-row">
        <div>
          <strong>{{ post.title?.en || post.slug }}</strong>
          <span v-if="!post.published" class="tag" style="margin-left: 0.5rem">Draft</span>
        </div>
        <div class="actions">
          <button class="btn-secondary" @click="editPost(post)">Edit</button>
          <button class="btn-danger" @click="remove(post)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
