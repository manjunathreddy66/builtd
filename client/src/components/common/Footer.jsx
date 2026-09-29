import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border-default)',
      padding: '48px 0 36px 0',
      marginTop: 'auto',
      transition: 'background-color var(--transition-base)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px'
      }}>
        {/* Top: Single prominent brand logo & description */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            aria-label="BUILTD Home"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src="/built.png" 
              alt="BUILTD" 
              style={{ 
                height: '36px', 
                width: 'auto', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(242, 92, 34, 0.12))' 
              }} 
            />
          </Link>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            margin: 0,
            lineHeight: 1.5
          }}>
            Build your digital identity — Dedicated portfolio platform open for students and builders worldwide.
          </p>
        </div>

        {/* Subtle divider */}
        <div style={{
          width: '100%',
          maxWidth: '560px',
          height: '1px',
          backgroundColor: 'var(--border-default)'
        }} />

        {/* Bottom Bar: Copyright & Attribution */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '720px',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ fontWeight: 500 }}>
            © 2026 BUILTD. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Built by</span>
            <a 
              href="https://www.instagram.com/66manjunathreddy" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--brand-orange)', 
                fontWeight: 600,
                textDecoration: 'none',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(242, 92, 34, 0.08)',
                border: '1px solid rgba(242, 92, 34, 0.2)',
                transition: 'background-color 0.2s ease, transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(242, 92, 34, 0.16)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(242, 92, 34, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Manjunath Reddy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
