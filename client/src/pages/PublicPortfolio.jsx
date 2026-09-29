import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPortfolioByUsername, getLocalPortfolioByUsername } from '../services/portfolioService';
import { TemplateRenderer } from '../templates/TemplateRenderer';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const PublicPortfolio = () => {
  const { username } = useParams();
  const cachedData = getLocalPortfolioByUsername(username);
  const [loading, setLoading] = useState(!cachedData);
  const [portfolioData, setPortfolioData] = useState(cachedData);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      // If we don't already have cached data, show loading
      if (!cachedData) {
        setLoading(true);
      }
      const data = await getPortfolioByUsername(username);

      if (isMounted) {
        if (data) {
          setPortfolioData(data);
        }
        setLoading(false);

        // SEO: Set dynamic page title & meta description
        if (data && data.profile) {
          const titleName = data.profile.name || username;
          const titleHeadline = data.profile.headline ? ` — ${data.profile.headline}` : ' — BUILTD Portfolio';
          document.title = `${titleName}${titleHeadline}`;

          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
          }
          metaDesc.content = data.profile.bio || `Portfolio of ${titleName} on BUILTD.`;
        } else {
          document.title = 'BUILTD — Portfolio Not Found';
        }
      }
    };

    if (username) {
      loadData();
    }

    return () => {
      isMounted = false;
      document.title = 'BUILTD — Build your digital identity.';
    };
  }, [username]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-main)',
        gap: '20px'
      }}>
        <img 
          src="/builtd.png" 
          alt="BUILTD" 
          style={{ height: '36px', width: 'auto' }} 
        />
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          Loading portfolio...
        </div>
      </div>
    );
  }

  // Not found or not published
  if (!portfolioData) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-main)',
        padding: '30px 20px'
      }}>
        <div className="ios-card ios-reveal" style={{
          width: '100%',
          maxWidth: '460px',
          textAlign: 'center',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '24px',
          padding: '48px 32px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{ marginBottom: '22px' }}>
            <Link to="/">
              <img 
                src="/builtd.png" 
                alt="BUILTD" 
                style={{ height: '34px', width: 'auto' }} 
              />
            </Link>
          </div>

          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '10px'
          }}>
            Portfolio not found.
          </h1>

          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            marginBottom: '28px',
            lineHeight: 1.6
          }}>
            The portfolio for <strong style={{ color: 'var(--text-primary)' }}>/{username}</strong> doesn't exist or hasn't been published yet.
          </p>

          <Link to="/" className="btn btn-brand ios-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Back to <img src="/builtd.png" alt="BUILTD" style={{ height: '16px', verticalAlign: 'middle' }} />
          </Link>
        </div>
      </div>
    );
  }

  // Render the public portfolio using the student's chosen template!
  return <TemplateRenderer data={portfolioData} isPreview={false} />;
};

export default PublicPortfolio;
