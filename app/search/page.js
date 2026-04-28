"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Search as SearchIcon, Sparkles, AlertCircle } from 'lucide-react';
import { fetchWithAuth } from '@/lib/api';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`/api/profiles/search?q=${encodeURIComponent(query)}`);
      if (res && res.status === 'success') {
        setResults(res.data);
      } else {
        setError(res?.message || 'Failed to interpret query');
      }
    } catch (err) {
      setError('An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar user={{ username: 'Admin User', role: 'admin' }} />
      
      <main style={{ flex: 1, padding: '2rem', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-in">
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'var(--primary)20', 
            color: 'var(--primary)',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            <Sparkles size={16} />
            AI-Powered Natural Language Search
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Search Intelligence</h1>
          <p style={{ color: 'var(--muted-foreground)', maxWidth: '600px', margin: '0 auto' }}>
            Query our database using plain English. Try "young females from nigeria" or "senior males above 60".
          </p>
        </header>

        <form onSubmit={handleSearch} className="animate-in" style={{ animationDelay: '0.1s', marginBottom: '3rem' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query here..."
              style={{ 
                width: '100%', 
                padding: '1.25rem 1.5rem', 
                paddingLeft: '3.5rem',
                fontSize: '1.1rem',
                borderRadius: '1rem',
                border: '2px solid var(--border)',
                background: 'var(--card)',
                outline: 'none'
              }}
            />
            <SearchIcon style={{ 
              position: 'absolute', 
              left: '1.25rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--muted-foreground)'
            }} size={24} />
            <button type="submit" disabled={loading} style={{ 
              position: 'absolute', 
              right: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              padding: '0.6rem 1.25rem',
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              opacity: loading ? 0.7 : 1
            }}>
              {loading ? 'Analyzing...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="glass animate-in" style={{ 
            padding: '1rem 1.5rem', 
            borderRadius: '0.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            color: 'var(--destructive)',
            border: '1px solid var(--destructive)30',
            marginBottom: '2rem'
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {results && (
          <div className="animate-in" style={{ animationDelay: '0.2s' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--muted-foreground)' }}>
              Found {results.length} matching results
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map((profile) => (
                <div key={profile.id} className="glass" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{profile.name}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
                        {profile.age} years old • {profile.gender} • {profile.country_name}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 'bold', 
                        color: 'var(--primary)',
                        background: 'var(--primary)10',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem'
                      }}>
                        {Math.round(profile.gender_probability * 100)}% CONFIDENCE
                      </span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                        ID: {profile.id.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
