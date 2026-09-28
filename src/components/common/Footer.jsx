import React from 'react';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border-default)',
      padding: '36px 0',
      marginTop: 'auto',
      textAlign: 'center'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '0.875rem',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
          © 2026 BUILTD. Build your digital identity. All rights reserved.
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Open for Students
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          BuiltD by{' '}
          <a 
            href="https://www.instagram.com/66manjunathreddy" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--brand-orange)', 
              fontWeight: 600,
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          >
            Manjunath Reddy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
