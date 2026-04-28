"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ user }) {
  const pathname = usePathname();

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
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Link href="/dashboard" style={{ fontSize: '1.25rem', fontWeight: 'bold' }} className="gradient-text">
          Insighta Labs+
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
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
    </nav>
  );
}
