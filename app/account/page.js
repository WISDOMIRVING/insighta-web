import React from 'react';
import { fetchWithAuth } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { User, Mail, Shield, Calendar, LogOut, Activity } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const userRes = await fetchWithAuth('/api/users/me');
  
  if (!userRes || userRes.status !== 'success') {
    redirect('/login');
  }
  
  const user = userRes.data;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} />
      
      <main style={{ flex: 1, padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <header style={{ marginBottom: '3rem' }} className="animate-in">
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Account Settings</h1>
          <p style={{ color: 'var(--muted-foreground)' }}>Manage your personal information and security preferences.</p>
        </header>

        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Profile Card */}
          <section className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              backgroundImage: user.avatar_url ? `url(${user.avatar_url})` : 'none',
              backgroundSize: 'cover',
              border: '4px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!user.avatar_url && <User size={40} style={{ color: 'var(--muted-foreground)' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>@{user.username}</h2>
              <p style={{ color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                {user.role} Access Level
              </p>
            </div>
          </section>

          {/* Details */}
          <section className="glass" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Mail size={20} style={{ color: 'var(--muted-foreground)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Email Address</p>
                  <p style={{ fontWeight: '500' }}>{user.email || 'Not provided'}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Shield size={20} style={{ color: 'var(--muted-foreground)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Role / Permissions</p>
                  <p style={{ fontWeight: '500', textTransform: 'capitalize' }}>{user.role}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Activity size={20} style={{ color: 'var(--muted-foreground)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Last Login</p>
                  <p style={{ fontWeight: '500' }}>
                    {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'Never'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Calendar size={20} style={{ color: 'var(--muted-foreground)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Member Since</p>
                  <p style={{ fontWeight: '500' }}>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sign Out */}
          <section style={{ marginTop: '2rem' }}>
            <a href="/login" style={{ 
              width: '100%', 
              padding: '1rem', 
              background: '#ef444410', 
              color: '#ef4444', 
              border: '1px solid #ef444430',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              <LogOut size={20} />
              Sign Out from Device
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
