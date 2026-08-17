import { createRouter, createWebHistory } from 'vue-router';
import PublicLayout from '../components/PublicLayout.vue';
import HomeView from '../views/HomeView.vue';
import BlogView from '../views/BlogView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import AdminLoginView from '../views/AdminLoginView.vue';
import AdminDashboardView from '../views/AdminDashboardView.vue';
import { useAuth } from '../composables/auth.js';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'blog', name: 'blog', component: BlogView },
        { path: 'blog/:slug', name: 'blog-post', component: BlogPostView }
      ]
    },
    { path: '/admin/login', name: 'admin-login', component: AdminLoginView },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboardView,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth();
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'admin-login' };
  }
});

export default router;
