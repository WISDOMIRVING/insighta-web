const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://profile-intelligence-service-production.up.railway.app';

export async function fetchWithAuth(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  // For web, cookies are sent automatically if credentials are set to 'include'
  const defaultOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Version': '1',
      ...options.headers,
    },
  };

  // Note: Since this is Next.js, if we call this from Server Components, 
  // we need to pass cookies manually. If from Client Components, 'include' works.
  if (typeof window === 'undefined') {
    // Server side: we need to import cookies from next/headers
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
