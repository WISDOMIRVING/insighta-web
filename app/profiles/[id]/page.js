import React from 'react';
import { fetchWithAuth } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft, User, MapPin, Calendar, Shield, TrendingUp } from 'lucide-react';

export default async function ProfileDetailPage({ params }) {
  const { id } = await params;
  const profileRes = await fetchWithAuth(`/api/profiles/${id}`);
  const userRes = await fetchWithAuth('/api/users/me');
  const user = userRes?.data || { username: 'User', role: 'analyst' };
  const profile = profileRes?.data;

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar user={user} />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Profile Not Found</h1>
            <Link href="/profiles" style={{ color: 'var(--primary)' }}>← Back to Profiles</Link>
          </div>
        </main>
      </div>
    );
  }

  const fields = [
    { label: 'Full Name', value: profile.name, icon: User },
    { label: 'Gender', value: `${profile.gender} (${Math.round(profile.gender_probability * 100)}% confidence)`, icon: Shield },
    { label: 'Age', value: `${profile.age} years (${profile.age_group})`, icon: TrendingUp },
    { label: 'Country', value: `${profile.country_name} (${profile.country_id}) — ${Math.round(profile.country_probability * 100)}% confidence`, icon: MapPin },
    { label: 'Created At', value: new Date(profile.created_at).toLocaleDateString(undefined, { dateStyle: 'long' }), icon: Calendar },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={user} />
      
      <main style={{ flex: 1, padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Link href="/profiles" className="animate-in" style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
          color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '2rem' 
        }}>
          <ArrowLeft size={18} /> Back to Profiles
        </Link>

        <header className="animate-in" style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>{profile.name}</h1>
          <p style={{ color: 'var(--muted-foreground)' }}>
            Profile ID: <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{profile.id}</span>
          </p>
        </header>

        <div className="glass animate-in" style={{ 
          padding: '2rem', borderRadius: '1.5rem', animationDelay: '0.1s' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {fields.map((field, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ 
                  background: 'var(--primary)15', color: 'var(--primary)', 
                  padding: '0.65rem', borderRadius: '0.65rem', display: 'flex' 
                }}>
                  <field.icon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.2rem' }}>{field.label}</p>
                  <p style={{ fontWeight: '500', fontSize: '1rem' }}>{field.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Probability Bars */}
        <div className="glass animate-in" style={{ 
          padding: '2rem', borderRadius: '1.5rem', marginTop: '1.5rem', animationDelay: '0.2s' 
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--muted-foreground)' }}>Confidence Metrics</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                <span>Gender Confidence</span>
                <span style={{ fontWeight: '600' }}>{Math.round(profile.gender_probability * 100)}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', width: `${profile.gender_probability * 100}%`, 
                  background: 'var(--primary)', borderRadius: '4px', transition: 'width 1s ease' 
                }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                <span>Country Confidence</span>
                <span style={{ fontWeight: '600' }}>{Math.round(profile.country_probability * 100)}%</span>
              </div>
              <div style={{ height: '8px', background: 'var(--secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  height: '100%', width: `${profile.country_probability * 100}%`, 
                  background: 'var(--accent)', borderRadius: '4px', transition: 'width 1s ease' 
                }} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
