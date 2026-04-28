import React from 'react';
import Navbar from '@/components/Navbar';
import { User, Mail, Shield, Calendar, LogOut } from 'lucide-react';

export default function AccountPage() {
  const user = { 
    username: 'wisdomirving', 
    email: 'wisdom@insighta.labs', 
    role: 'admin', 
    created_at: '2026-04-21T12:00:00Z',
    avatar_url: 'https://github.com/wisdomirving.png'
  };

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
              backgroundImage: `url(${user.avatar_url})`,
              backgroundSize: 'cover',
              border: '4px solid var(--border)'
            }} />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.username}</h2>
              <p style={{ color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                {user.role} Access Level
              </p>
            </div>
            <button style={{ background: 'var(--secondary)', fontSize: '0.875rem' }}>Edit Profile</button>
          </section>

          {/* Details */}
          <section className="glass" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Mail size={20} style={{ color: 'var(--muted-foreground)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Email Address</p>
                  <p style={{ fontWeight: '500' }}>{user.email}</p>
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
                <Calendar size={20} style={{ color: 'var(--muted-foreground)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>Joined Date</p>
                  <p style={{ fontWeight: '500' }}>{new Date(user.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section style={{ marginTop: '2rem' }}>
            <button style={{ 
              width: '100%', 
              padding: '1rem', 
              background: '#ef444410', 
              color: '#ef4444', 
              border: '1px solid #ef444430',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}>
              <LogOut size={20} />
              Sign Out from Device
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
