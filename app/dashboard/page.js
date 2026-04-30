import React from 'react';
import { fetchWithAuth } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Users, Activity, ShieldCheck, MapPin } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const profilesRes = await fetchWithAuth('/api/profiles?limit=5');
  const userRes = await fetchWithAuth('/api/users/me');

  if (!userRes || userRes.status !== 'success') {
    redirect('/login');
  }

  const user = userRes.data;

  const stats = [
    { name: 'Total Profiles', value: profilesRes?.total || 0, icon: Users, color: 'var(--primary)' },
    { name: 'System Status', value: 'Active', icon: Activity, color: '#10b981' },
    { name: 'Your Role', value: user.role, icon: ShieldCheck, color: 'var(--accent)' },
    { name: 'Active Countries', value: '48', icon: MapPin, color: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} />
      
      <main className="container" style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px' }}>
        <header style={{ marginBottom: '2.5rem' }} className="animate-in">
          <h1 style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--muted-foreground)' }}>Welcome back, @{user.username}. Here is your intelligence summary.</p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass animate-in" style={{ 
              padding: '1.5rem', 
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              animationDelay: `${i * 0.1}s`
            }}>
              <div style={{ 
                background: `${stat.color}20`, 
                color: stat.color,
                padding: '0.75rem',
                borderRadius: '0.75rem',
                display: 'flex'
              }}>
                <stat.icon size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '0.25rem' }}>{stat.name}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'capitalize' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="animate-in" style={{ animationDelay: '0.4s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Recent Profiles</h2>
            <Link href="/profiles" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: '600', whiteSpace: 'nowrap' }}>View all</Link>
          </div>

          <div className="glass" style={{ borderRadius: '1rem', overflowX: 'auto', padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--secondary)', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                  <th style={{ padding: '1rem' }}>NAME</th>
                  <th style={{ padding: '1rem' }}>GENDER</th>
                  <th style={{ padding: '1rem' }}>AGE</th>
                  <th style={{ padding: '1rem' }}>COUNTRY</th>
                  <th style={{ padding: '1rem' }}>CONFIDENCE</th>
                </tr>
              </thead>
              <tbody>
                {profilesRes?.data?.map((profile) => (
                  <tr key={profile.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>
                      <Link href={`/profiles/${profile.id}`} style={{ color: 'var(--primary)' }}>{profile.name}</Link>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '1rem', 
                        fontSize: '0.75rem',
                        background: profile.gender === 'male' ? '#3b82f620' : '#ec489920',
                        color: profile.gender === 'male' ? '#60a5fa' : '#f472b6',
                        textTransform: 'capitalize'
                      }}>
                        {profile.gender}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{profile.age} <span className="desktop-only" style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>({profile.age_group})</span></td>
                    <td style={{ padding: '1rem' }}>{profile.country_name}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, height: '4px', background: 'var(--secondary)', borderRadius: '2px', maxWidth: '40px' }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${profile.gender_probability * 100}%`, 
                            background: 'var(--primary)', 
                            borderRadius: '2px' 
                          }} />
                        </div>
                        {Math.round(profile.gender_probability * 100)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
