const KEY = 'token';

export function getToken() {
  return localStorage.getItem(KEY) || '';
}

export function setToken(t) {
  if (!t) localStorage.removeItem(KEY);
  else localStorage.setItem(KEY, t);
}
