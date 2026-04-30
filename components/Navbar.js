"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User as UserIcon } from 'lucide-react';

export default function Navbar({ user }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Profiles', href: '/profiles' },
    { name: 'Search', href: '/search' },
  ];

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.75rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Link href="/dashboard" style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="gradient-text">
          Insighta Labs+
        </Link>
        
        {/* Desktop Nav */}
        <div className="desktop-only" style={{ display: 'flex', gap: '1.5rem' }}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              style={{
                fontSize: '0.9rem',
                fontWeight: '500',
                color: pathname === item.href ? 'var(--primary)' : 'var(--muted-foreground)'
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Desktop Account */}
        <div className="desktop-only">
          <Link href="/account" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              backgroundImage: user?.avatar_url ? `url(${user.avatar_url})` : 'none',
              backgroundSize: 'cover'
            }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.username || 'Account'}</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-only" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: 'transparent', border: 'none', padding: '0.5rem', display: 'flex' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-only" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--background)',
          padding: '1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 49
        }}>
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                padding: '0.5rem 0',
                color: pathname === item.href ? 'var(--primary)' : 'var(--muted-foreground)'
              }}
            >
              {item.name}
            </Link>
          ))}
          <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }} />
          <Link 
            href="/account" 
            onClick={() => setIsMenuOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}
          >
             <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--secondary)',
              backgroundImage: user?.avatar_url ? `url(${user.avatar_url})` : 'none',
              backgroundSize: 'cover'
            }} />
            <span style={{ fontWeight: '500' }}>{user?.username || 'My Account'}</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
