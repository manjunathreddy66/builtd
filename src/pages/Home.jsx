import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Search,
  Smartphone,
  Monitor,
  QrCode,
  Copy,
  Check,
  Sparkles,
  Folder,
  ExternalLink,
  Layers,
  Terminal,
  Zap,
  Share2,
  ChevronRight
} from 'lucide-react';
import { INITIAL_STUDENT_PORTFOLIOS } from '../services/initialData';
import { 
  checkUsernameAvailability, 
  normalizeUsername, 
  getAllStoredPortfolios 
} from '../services/portfolioService';
import { TemplateRenderer, TEMPLATE_OPTIONS } from '../templates/TemplateRenderer';

export const Home = () => {
  const navigate = useNavigate();

  // 1. Live Claimer State
  const [claimHandle, setClaimHandle] = useState('tony');
  const [claimStatus, setClaimStatus] = useState({ checking: false, available: true, message: 'Available' });

  // 2. Quick Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  // 3. Interactive Sandbox State
  const [activeTemplate, setActiveTemplate] = useState('editorial');
  const [activeStudentKey, setActiveStudentKey] = useState('arjun');
  const [previewDevice, setPreviewDevice] = useState('desktop');

  // 4. QR Code & Tool State
  const [qrHandle, setQrHandle] = useState('tony');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);

  // 5. Category Filter for Student Showcase
  const [activeFilter, setActiveFilter] = useState('all');

  const allPortfolios = getAllStoredPortfolios();
  const sampleStudents = Object.values(allPortfolios).slice(0, 6);

  // Realtime Handle Checker with Debounce
  useEffect(() => {
    const clean = normalizeUsername(claimHandle);
    if (!clean || clean.length < 3) {
      setClaimStatus({ checking: false, available: null, message: 'Enter at least 3 characters' });
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

  // Generate preview data by merging active student profile with selected template
  const currentPreviewStudent = allPortfolios[activeStudentKey] || INITIAL_STUDENT_PORTFOLIOS.arjun;
  const simulatedPortfolioData = {
    ...currentPreviewStudent,
    settings: {
      ...currentPreviewStudent.settings,
      template: activeTemplate
    }
  };

  // Filter students
  const filteredStudents = sampleStudents.filter(student => {
    if (activeFilter === 'all') return true;
    const skills = (student.skills || []).map(s => s.toLowerCase());
    if (activeFilter === 'ai') return skills.some(s => s.includes('python') || s.includes('ai') || s.includes('pytorch'));
    if (activeFilter === 'web') return skills.some(s => s.includes('react') || s.includes('node') || s.includes('javascript'));
    if (activeFilter === 'systems') return skills.some(s => s.includes('c++') || s.includes('docker') || s.includes('go') || s.includes('linux'));
    return true;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* ============================================================
          HERO: COMPACT, PUNCHY, HIGH-FUNCTIONALITY
          ============================================================ */}
      <section style={{
        padding: '50px 0 60px 0',
        borderBottom: '1px solid var(--border-default)',
        background: 'linear-gradient(180deg, #FFFFFF 0%, var(--bg-main) 100%)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Tagline Badge */}
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
              <span style={{ width: '7px', height: '7px', backgroundColor: 'var(--brand-orange)', borderRadius: '50%' }} />
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

            {/* Subtitle - Punchy & Brief */}
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
                    placeholder="tony"
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
                  onClick={() => navigate(`/signup?handle=${normalizeUsername(claimHandle) || 'tony'}`)}
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
                  ) : (
                    <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>
                      ✕ {claimStatus.message}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Try:</span>
                  {['tony', 'alex', 'priya', 'dev'].map(s => (
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

            {/* Quick Links & Direct Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              marginTop: '16px'
            }}>
              <Link to="/explore" className="btn btn-secondary btn-sm">
                Explore Portfolios
              </Link>
              <button
                onClick={() => setShowFolderModal(true)}
                className="btn btn-ghost btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}
              >
                <Folder size={15} color="var(--brand-orange)" /> How /username folders work
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FUNCTION 2: INTERACTIVE LIVE SANDBOX & TEMPLATE PREVIEWER
          ============================================================ */}
      <section style={{
        padding: '50px 0',
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          
          {/* Section Header */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <div className="section-tag">Interactive Sandbox</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Test templates live.
              </h2>
            </div>

            {/* Device Switcher (Desktop vs Mobile View Simulation) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-main)',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-default)',
              gap: '4px'
            }}>
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  backgroundColor: previewDevice === 'desktop' ? 'var(--bg-card)' : 'transparent',
                  color: previewDevice === 'desktop' ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: previewDevice === 'desktop' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Monitor size={15} /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  backgroundColor: previewDevice === 'mobile' ? 'var(--bg-card)' : 'transparent',
                  color: previewDevice === 'mobile' ? 'var(--brand-orange)' : 'var(--text-muted)',
                  boxShadow: previewDevice === 'mobile' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Smartphone size={15} /> Mobile View
              </button>
            </div>
          </div>

          {/* Interactive Controls Bar: Templates & Sample Profiles */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            backgroundColor: 'var(--bg-main)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-default)',
            marginBottom: '24px'
          }}>
            {/* Template Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Template:
              </span>
              {TEMPLATE_OPTIONS.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTemplate(tpl.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: activeTemplate === tpl.id ? 'var(--brand-orange)' : 'var(--border-default)',
                    backgroundColor: activeTemplate === tpl.id ? 'var(--brand-orange-light)' : 'var(--bg-card)',
                    color: activeTemplate === tpl.id ? 'var(--brand-orange)' : 'var(--text-primary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tpl.name.replace(/^\d+\s*—\s*/, '')}
                </button>
              ))}
            </div>

            {/* Profile Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Sample Student:
              </span>
              {[
                { id: 'arjun', label: 'Arjun (Full Stack)' },
                { id: 'priya', label: 'Priya (AI & ML)' },
                { id: 'rahul', label: 'Rahul (Systems)' }
              ].map(student => (
                <button
                  key={student.id}
                  onClick={() => setActiveStudentKey(student.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: activeStudentKey === student.id ? 'var(--text-primary)' : 'var(--bg-card)',
                    color: activeStudentKey === student.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    border: '1px solid var(--border-default)'
                  }}
                >
                  {student.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sandbox Live View Frame */}
          <div style={{
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-main)',
            padding: previewDevice === 'mobile' ? '28px 12px' : '0',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <TemplateRenderer 
              data={simulatedPortfolioData} 
              device={previewDevice} 
              isPreview={true} 
            />
          </div>

          {/* Action beneath preview */}
          <div style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.875rem'
          }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Viewing preview of <strong style={{ color: 'var(--text-primary)' }}>/{activeStudentKey}</strong> with <span style={{ textTransform: 'capitalize' }}>{activeTemplate}</span> layout.
            </span>
            <Link
              to={`/signup?handle=${activeStudentKey}`}
              className="btn btn-brand btn-sm"
            >
              Use This Design For My Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FUNCTION 3: STUDENT TOOLS & UTILITIES BAR
          ============================================================ */}
      <section style={{
        padding: '50px 0',
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
                  placeholder="e.g. arjun or priya"
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
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&margin=4&data=https://builtd.vercel.app/${normalizeUsername(qrHandle) || 'tony'}`}
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
                    placeholder="handle"
                    className="form-input"
                    style={{ padding: '8px 10px', fontSize: '0.8125rem', marginBottom: '8px' }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Target: builtd.vercel.app/{qrHandle || 'tony'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tool C: One-Click Share & Folder Architecture */}
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
                  builtd.vercel.app/{claimHandle || 'tony'}
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
          FUNCTION 4: STREAMLINED STUDENT PORTFOLIO DIRECTORY
          ============================================================ */}
      <section style={{
        padding: '50px 0 60px 0',
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div>
              <div className="section-tag">Live Showcases</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Real student portfolios.
              </h2>
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'web', label: 'Full-Stack' },
                { id: 'ai', label: 'AI & Data' },
                { id: 'systems', label: 'Systems & DevOps' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: activeFilter === f.id ? 'var(--brand-orange)' : 'var(--border-default)',
                    backgroundColor: activeFilter === f.id ? 'var(--brand-orange-light)' : 'var(--bg-main)',
                    color: activeFilter === f.id ? 'var(--brand-orange)' : 'var(--text-secondary)'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="auto-grid" style={{ gap: '20px' }}>
            {filteredStudents.map((student) => (
              <div
                key={student.username}
                className="card card-hover"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '22px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <img
                    src={student.profile.profileImage}
                    alt={student.profile.name}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--border-default)',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {student.profile.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--brand-orange)', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {student.profile.headline}
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '18px', flexGrow: 1 }}>
                  {(student.skills || []).slice(0, 4).map((sk, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        padding: '2px 8px',
                        backgroundColor: 'var(--bg-main)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Direct Action Link */}
                <Link
                  to={`/${student.username}`}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  View /{student.username} <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================
          CALL TO ACTION (CLEAN & DIRECT)
          ============================================================ */}
      <section style={{
        padding: '60px 0',
        backgroundColor: 'var(--bg-main)',
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
              to={`/signup?handle=${claimHandle || 'tony'}`}
              className="btn btn-brand btn-lg"
              style={{ maxWidth: '320px' }}
            >
              Build My Portfolio Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          MODAL: USER FOLDER ARCHITECTURE EXPLANATION
          ============================================================ */}
      {showFolderModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
          onClick={() => setShowFolderModal(false)}
        >
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            maxWidth: '540px',
            width: '100%',
            padding: '30px',
            boxShadow: 'var(--shadow-lg)'
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Folder size={22} color="var(--brand-orange)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                How /{claimHandle || 'tony'} Works
              </h3>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              When a new user registers on BUILTD with username <strong>"{claimHandle || 'tony'}"</strong>, the system allocates a dedicated namespace and folder tree:
            </p>

            <div style={{
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              lineHeight: 1.8,
              marginBottom: '20px'
            }}>
              <div style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>📁 /{claimHandle || 'tony'}</div>
              <div style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>├── 📄 portfolio.json <span style={{ color: 'var(--text-muted)' }}>(Bio, skills, projects)</span></div>
              <div style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>├── 🖼️ profile.png <span style={{ color: 'var(--text-muted)' }}>(Uploaded avatar image)</span></div>
              <div style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>└── 🌐 builtd.vercel.app/{claimHandle || 'tony'}</div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Any visitor searching <strong>builtd.vercel.app/{claimHandle || 'tony'}</strong> automatically loads this user folder and renders the live portfolio.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowFolderModal(false)}
                className="btn btn-secondary btn-sm"
              >
                Close
              </button>
              <Link
                to={`/signup?handle=${claimHandle || 'tony'}`}
                className="btn btn-brand btn-sm"
              >
                Register /{claimHandle || 'tony'} →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
