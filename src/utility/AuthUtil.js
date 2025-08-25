import { jwtDecode } from 'jwt-decode';

export function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub || null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
  return null;
}
