import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Search,
  QrCode,
  Copy,
  Check,
  Share2
} from 'lucide-react';
import { 
  checkUsernameAvailability, 
  normalizeUsername, 
  getAllStoredPortfolios 
} from '../services/portfolioService';

export const Home = () => {
  const navigate = useNavigate();

  // 1. Live Claimer State
  const [claimHandle, setClaimHandle] = useState('');
  const [claimStatus, setClaimStatus] = useState({ checking: false, available: null, message: '' });

  // 2. Quick Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  // 3. QR Code & Tool State
  const [qrHandle, setQrHandle] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const allPortfolios = getAllStoredPortfolios();

  // Realtime Handle Checker with Debounce
  useEffect(() => {
    const clean = normalizeUsername(claimHandle);
    if (!clean || clean.length < 3) {
      setClaimStatus({ checking: false, available: null, message: clean ? 'Enter at least 3 characters' : '' });
      return;
    }

    setClaimStatus({ checking: true, available: null, message: 'Checking...' });
    const timer = setTimeout(async () => {
      const res = await checkUsernameAvailability(clean);
      setClaimStatus({
        checking: false,
        available: res.available,
        message: res.available ? 'Link is available!' : (res.reason || 'Already taken')
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [claimHandle]);

  // Handle Quick Search
  const handleQuickSearch = (e) => {
    e.preventDefault();
    const query = normalizeUsername(searchQuery);
    if (!query) return;

    if (allPortfolios[query]) {
      navigate(`/${query}`);
    } else {
      setSearchError(`/${query} not found. Check spelling or claim it below!`);
      setTimeout(() => setSearchError(''), 4000);
    }
  };

  // Copy Live URL helper
  const handleCopyUrl = (handle) => {
    const fullUrl = `https://builtd.vercel.app/${normalizeUsername(handle) || 'username'}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* ============================================================
          HERO: COMPACT, PUNCHY, HIGH-FUNCTIONALITY
          ============================================================ */}
      <section style={{
        padding: '60px 0 70px 0',
        borderBottom: '1px solid var(--border-default)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-main) 100%)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Tagline Badge with built.png icon */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--brand-orange)',
              marginBottom: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <img src="/built.png" alt="BUILTD" style={{ height: '14px', verticalAlign: 'middle' }} />
              Student Digital Identity Platform
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.1rem, 5vw, 3.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              marginBottom: '16px',
              color: 'var(--text-primary)'
            }}>
              Claim your link. Launch your portfolio.
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '32px',
              maxWidth: '620px',
              margin: '0 auto 32px auto'
            }}>
              Your dedicated link at <strong style={{ color: 'var(--text-primary)' }}>builtd.vercel.app/username</strong>.
              Auto-formatted for recruiters, engineers, and internships.
            </p>

            {/* FUNCTION 1: INTERACTIVE LIVE CLAIMER BAR */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-md)',
              maxWidth: '640px',
              margin: '0 auto 16px auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div className="mobile-stack" style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 12px',
                  flexGrow: 1,
                  minHeight: '48px'
                }}>
                  <Globe size={18} color="var(--brand-orange)" style={{ marginRight: '8px', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    userSelect: 'none',
                    whiteSpace: 'nowrap'
                  }}>
                    builtd.vercel.app/
                  </span>
                  <input
                    type="text"
                    value={claimHandle}
                    onChange={(e) => setClaimHandle(normalizeUsername(e.target.value))}
                    placeholder="yourname"
                    className="selectable-text"
                    style={{
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--brand-orange)',
                      width: '100%',
                      padding: '4px 6px'
                    }}
                  />
                </div>

                <button
                  onClick={() => navigate(claimHandle ? `/signup?handle=${normalizeUsername(claimHandle)}` : '/signup')}
                  className="btn btn-brand"
                  style={{
                    padding: '12px 20px',
                    minHeight: '48px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Claim & Build <ArrowRight size={16} />
                </button>
              </div>

              {/* Realtime Status Indicator & Instant Presets */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.8125rem',
                padding: '2px 4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {claimStatus.checking ? (
                    <span style={{ color: 'var(--text-muted)' }}>Checking handle availability...</span>
                  ) : claimStatus.available ? (
                    <span style={{ color: 'var(--accent-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} /> builtd.vercel.app/{claimHandle} is ready!
                    </span>
                  ) : claimStatus.message ? (
                    <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>
                      ✕ {claimStatus.message}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Type your desired username</span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Try:</span>
                  {['alex', 'sam', 'maya', 'dev'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setClaimHandle(s)}
                      style={{
                        padding: '2px 8px',
                        backgroundColor: 'var(--bg-main)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          FUNCTION 2: STUDENT TOOLS & UTILITIES BAR
          ============================================================ */}
      <section style={{
        padding: '60px 0',
        backgroundColor: 'var(--bg-main)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          
          <div style={{ marginBottom: '28px' }}>
            <div className="section-tag">Instant Utilities</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Built-in student tools.
            </h2>
          </div>

          <div className="auto-grid" style={{ gap: '20px' }}>
            
            {/* Tool A: Quick Lookup / Search */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Search size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Find Student Portfolio</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px', flexGrow: 1 }}>
                Instant direct jump to any published profile by username.
              </p>
              
              <form onSubmit={handleQuickSearch} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ padding: '10px 12px', fontSize: '0.875rem' }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px' }}>
                  Go →
                </button>
              </form>
              {searchError && (
                <div style={{ color: 'var(--accent-red)', fontSize: '0.8125rem', marginTop: '8px' }}>
                  {searchError}
                </div>
              )}
            </div>

            {/* Tool B: Instant QR Code Generator */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <QrCode size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Generate Portfolio QR</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Scan to test your mobile portfolio instantly on any smartphone.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&margin=4&data=https://builtd.vercel.app/${normalizeUsername(qrHandle) || 'yourname'}`}
                  alt="Portfolio QR"
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-default)',
                    backgroundColor: '#FFFFFF',
                    padding: '4px'
                  }}
                />
                <div style={{ flexGrow: 1, minWidth: '150px' }}>
                  <input
                    type="text"
                    value={qrHandle}
                    onChange={(e) => setQrHandle(normalizeUsername(e.target.value))}
                    placeholder="yourname"
                    className="form-input"
                    style={{ padding: '8px 10px', fontSize: '0.8125rem', marginBottom: '8px' }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Target: builtd.vercel.app/{qrHandle || 'yourname'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tool C: One-Click Share */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Share2 size={20} color="var(--brand-orange)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>One-Click Link Share</h3>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px', flexGrow: 1 }}>
                Copy permanent recruiter link for LinkedIn, resume, and GitHub.
              </p>

              <button
                type="button"
                onClick={() => handleCopyUrl(claimHandle)}
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'space-between', padding: '10px 14px' }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                  builtd.vercel.app/{claimHandle || 'yourname'}
                </span>
                {copiedLink ? (
                  <span style={{ color: 'var(--accent-green)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Check size={14} /> Copied!
                  </span>
                ) : (
                  <Copy size={15} color="var(--text-muted)" />
                )}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          CALL TO ACTION (CLEAN & DIRECT)
          ============================================================ */}
      <section style={{
        padding: '70px 0',
        backgroundColor: 'var(--bg-card)',
        textAlign: 'center'
      }}>
        <div className="container-narrow">
          <Logo variant="compact" height={36} withLink={false} />
          
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            margin: '18px 0 10px 0'
          }}>
            Ready to claim your digital identity?
          </h2>

          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '28px',
            maxWidth: '520px',
            margin: '0 auto 28px auto'
          }}>
            Setup takes less than 3 minutes. Zero code required.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              to={claimHandle ? `/signup?handle=${claimHandle}` : '/signup'}
              className="btn btn-brand btn-lg"
              style={{ maxWidth: '320px' }}
            >
              Build My Portfolio Now →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
