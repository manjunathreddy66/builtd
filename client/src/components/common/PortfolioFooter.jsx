import React from 'react';

export const PortfolioFooter = ({ theme = {}, profileName = '' }) => {
  return (
    <footer style={{
      borderTop: `1px solid ${theme.borderDefault || '#E5E7EB'}`,
      padding: '32px 20px',
      backgroundColor: theme.bgCard || '#FFFFFF',
      marginTop: '60px',
      textAlign: 'center'
    }}>
      <div className="container" style={{
        maxWidth: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: '0.875rem',
          color: theme.textSecondary || '#4B5563',
          fontWeight: 500
        }}>
          Portfolio by
        </span>
        <a
          href="https://builtd.vercel.app"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          aria-label="BUILTD"
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src="/builtd.png" 
            alt="BUILTD" 
            style={{ 
              height: '24px', 
              width: 'auto', 
              objectFit: 'contain',
              verticalAlign: 'middle'
            }} 
          />
        </a>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
