"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const csrfToken = searchParams.get('csrf_token');

    if (accessToken && refreshToken) {
      // Save tokens to cookies on the FRONTEND domain
      const expiry = 60 * 60; // 1 hour for this handoff
      document.cookie = `access_token=${accessToken}; path=/; max-age=${expiry}; SameSite=Lax; Secure`;
      document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${expiry}; SameSite=Lax; Secure`;
      if (csrfToken) {
        document.cookie = `csrf_token=${csrfToken}; path=/; max-age=${expiry}; SameSite=Lax; Secure`;
      }
      
      // Redirect to dashboard
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [searchParams, router]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0f172a',
      color: '#f8fafc'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Finalizing Secure Session...</h2>
        <div className="animate-pulse" style={{ color: '#38bdf8' }}>Please wait while we secure your connection.</div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
