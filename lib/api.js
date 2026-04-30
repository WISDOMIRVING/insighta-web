const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://profile-intelligence-service-production.up.railway.app';

/**
 * Helper to get a cookie value by name (client-side only)
 */
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Version': '1',
    ...options.headers,
  };

  // For state-modifying requests from the browser, attach CSRF token (double-submit pattern)
  if (typeof window !== 'undefined' && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method?.toUpperCase())) {
    const csrfToken = getCookie('csrf_token');
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
  }

  const defaultOptions = {
    ...options,
    headers,
  };

  // Server-side: forward cookies manually from the request
  if (typeof window === 'undefined') {
    const { cookies } = require('next/headers');
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
    defaultOptions.headers.Cookie = allCookies;
  } else {
    defaultOptions.credentials = 'include';
  }

  const response = await fetch(url, defaultOptions);

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return response.json();
}
