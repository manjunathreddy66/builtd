import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-card)',
      borderTop: '1px solid var(--border-default)',
      padding: '60px 0 40px 0',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Column */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Logo variant="compact" height={28} to="/" />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.2rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)'
              }}>
                BUILTD
              </span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              "Build your digital identity."
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              A free portfolio-building platform engineered specifically for engineering and college students.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#how-it-works" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>How It Works</a>
              </li>
              <li>
                <a href="#features" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Features</a>
              </li>
              <li>
                <Link to="/explore" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Student Directory</Link>
              </li>
              <li>
                <Link to="/signup" style={{ fontSize: '0.875rem', color: 'var(--brand-orange)', fontWeight: 600 }}>Create Your Portfolio →</Link>
              </li>
            </ul>
          </div>

          {/* Student Hub */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Examples
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/manjunath" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>builtd.vercel.app/manjunath</Link>
              </li>
              <li>
                <Link to="/rahul" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>builtd.vercel.app/rahul</Link>
              </li>
              <li>
                <Link to="/ananya" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>builtd.vercel.app/ananya</Link>
              </li>
            </ul>
          </div>

          {/* Philosophy */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Student Pledge
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              No coding required. No paid hosting fees. No complex UI builders. Answer a few questions, and BUILTD creates your digital home.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8125rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} BUILTD. Build your digital identity. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Open for Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
