import { ref } from 'vue';

const token = ref(localStorage.getItem('token') || '');

function setToken(value) {
  token.value = value || '';
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
}

function isAuthenticated() {
  return !!token.value;
}

function logout() {
  setToken('');
}

export function useAuth() {
  return { token, setToken, isAuthenticated, logout };
}
