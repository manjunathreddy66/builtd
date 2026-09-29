import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-main)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '440px',
        width: '100%',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        padding: '48px 32px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <Logo variant="compact" height={36} to="/" />
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--brand-orange)',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          ERROR 404
        </div>

        <h1 style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '10px'
        }}>
          Page not found.
        </h1>

        <p style={{
          fontSize: '0.9375rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '28px'
        }}>
          The page or portfolio you're looking for doesn't exist or has moved.
        </p>

        <Link to="/" className="btn btn-brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> Back to <img src="/builtd.png" alt="BUILTD" style={{ height: '18px', verticalAlign: 'middle' }} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
