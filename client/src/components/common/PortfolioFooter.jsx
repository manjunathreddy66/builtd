import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const PortfolioFooter = ({ theme = {}, profileName = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: `1px solid ${theme.borderDefault || '#E5E7EB'}`,
      padding: '40px 20px 80px 20px',
      backgroundColor: theme.bgCard || '#FFFFFF',
      marginTop: '60px'
    }}>
      <div className="container" style={{
        maxWidth: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Left: Candidate copyright */}
        <div style={{
          fontSize: '0.85rem',
          color: theme.textSecondary || '#4B5563',
          fontWeight: 500
        }}>
          © {currentYear} {profileName || 'Student'}. All rights reserved.
        </div>

        {/* Right: Modern BUILTD signature badge */}
        <a
          href="https://builtd.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="ios-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 14px',
            backgroundColor: theme.bgMain || '#F8F9FA',
            border: `1px solid ${theme.borderDefault || '#E5E7EB'}`,
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '0.78125rem',
            fontWeight: 600,
            color: theme.textPrimary || '#111827',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
          }}
        >
          <span style={{ color: theme.textMuted || '#9CA3AF' }}>Built with</span>
          <img src="/built.png" alt="BUILTD" style={{ height: '14px', verticalAlign: 'middle' }} />
          <span style={{ color: 'var(--brand-orange, #F25C22)', fontWeight: 700 }}>BUILTD</span>
          <ArrowUpRight size={12} color="var(--brand-orange, #F25C22)" />
        </a>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
