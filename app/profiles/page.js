import React from 'react';
import { fetchWithAuth } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Filter, ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilesPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  const limit = 10;
  
  // Build query string for API
  const query = new URLSearchParams(params);
  query.set('limit', limit);
  query.set('page', page);

  const profilesRes = await fetchWithAuth(`/api/profiles?${query.toString()}`);
  const userRes = { username: 'Admin User', role: 'admin' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={userRes} />
      
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '2rem' 
        }} className="animate-in">
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Profiles Library</h1>
            <p style={{ color: 'var(--muted-foreground)' }}>Explore and filter through the entire demographic database.</p>
          </div>
          
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'var(--secondary)',
            fontSize: '0.875rem'
          }}>
            <FileDown size={18} />
            Export CSV
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
          {/* Sidebar Filters */}
          <aside className="glass animate-in" style={{ 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            height: 'fit-content',
            position: 'sticky',
            top: '5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Filter size={20} className="gradient-text" />
              <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
            </div>

            <form action="/profiles" method="GET" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Gender</label>
                <select name="gender" defaultValue={params.gender || ""} style={{ width: '100%' }}>
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Age Group</label>
                <select name="age_group" defaultValue={params.age_group || ""} style={{ width: '100%' }}>
                  <option value="">All Groups</option>
                  <option value="child">Child</option>
                  <option value="teenager">Teenager</option>
                  <option value="adult">Adult</option>
                  <option value="senior">Senior</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>Min Probability</label>
                <input 
                  type="number" 
                  name="min_gender_probability" 
                  step="0.1" 
                  min="0" 
                  max="1" 
                  defaultValue={params.min_gender_probability || ""} 
                  placeholder="0.0"
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" style={{ 
                background: 'var(--primary)', 
                color: 'var(--primary-foreground)', 
                marginTop: '1rem' 
              }}>
                Apply Filters
              </button>
              
              <Link href="/profiles" style={{ 
                textAlign: 'center', 
                fontSize: '0.8rem', 
                color: 'var(--muted-foreground)' 
              }}>
                Clear All
              </Link>
            </form>
          </aside>

          {/* Table Area */}
          <div className="animate-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass" style={{ borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--secondary)', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                    <th style={{ padding: '1.25rem' }}>NAME</th>
                    <th style={{ padding: '1.25rem' }}>GENDER</th>
                    <th style={{ padding: '1.25rem' }}>AGE</th>
                    <th style={{ padding: '1.25rem' }}>COUNTRY</th>
                    <th style={{ padding: '1.25rem' }}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {profilesRes?.data?.map((profile) => (
                    <tr key={profile.id} style={{ borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                      <td style={{ padding: '1.25rem', fontWeight: '500' }}>
                        <Link href={`/profiles/${profile.id}`} style={{ color: 'var(--primary)' }}>
                          {profile.name}
                        </Link>
                      </td>
                      <td style={{ padding: '1.25rem' }}>
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
                      <td style={{ padding: '1.25rem' }}>{profile.age}</td>
                      <td style={{ padding: '1.25rem' }}>{profile.country_name}</td>
                      <td style={{ padding: '1.25rem', color: 'var(--muted-foreground)' }}>
                        {new Date(profile.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {(!profilesRes?.data || profilesRes.data.length === 0) && (
                    <tr>
                      <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                        No profiles found matching these filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
              <Link 
                href={`/profiles?${new URLSearchParams({...params, page: page - 1}).toString()}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius)',
                  background: 'var(--secondary)',
                  pointerEvents: page <= 1 ? 'none' : 'auto',
                  opacity: page <= 1 ? 0.5 : 1
                }}
              >
                <ChevronLeft size={18} /> Prev
              </Link>
              
              <span style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                Page {page} of {profilesRes?.total_pages || 1}
              </span>

              <Link 
                href={`/profiles?${new URLSearchParams({...params, page: page + 1}).toString()}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius)',
                  background: 'var(--secondary)',
                  pointerEvents: page >= (profilesRes?.total_pages || 1) ? 'none' : 'auto',
                  opacity: page >= (profilesRes?.total_pages || 1) ? 0.5 : 1
                }}
              >
                Next <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
