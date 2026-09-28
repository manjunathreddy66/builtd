import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  GraduationCap, 
  Cpu, 
  Briefcase, 
  Award, 
  Link as LinkIcon, 
  Palette, 
  Settings, 
  ExternalLink, 
  Share2, 
  Copy, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  Eye,
  Edit3
} from 'lucide-react';

export const Dashboard = () => {
  const { portfolio, completionPercentage, publishCurrentPortfolio, unpublishCurrentPortfolio } = usePortfolio();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const displayName = portfolio.profile?.name || currentUser?.displayName || 'Student';
  const username = portfolio.username || 'username';
  const publicUrl = `https://builtd.vercel.app/${username}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate actionable completion suggestions
  const getSuggestions = () => {
    const list = [];
    if (!portfolio.projects || portfolio.projects.length < 2) {
      list.push({ text: 'Add another technical project', link: '/editor?tab=projects' });
    }
    if (!portfolio.profile?.profileImage) {
      list.push({ text: 'Upload your profile photo', link: '/editor?tab=profile' });
    }
    if (!portfolio.links?.github) {
      list.push({ text: 'Connect your GitHub profile', link: '/editor?tab=links' });
    }
    if (!portfolio.resumeUrl) {
      list.push({ text: 'Attach your PDF resume link', link: '/editor?tab=resume' });
    }
    if (!portfolio.experience || portfolio.experience.length === 0) {
      list.push({ text: 'Add an internship or club experience', link: '/editor?tab=experience' });
    }
    return list;
  };

  const suggestions = getSuggestions();

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', backgroundColor: 'var(--bg-main)' }}>
      <div className="container" style={{ padding: '36px 20px 80px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '32px',
          alignItems: 'flex-start'
        }} className="dashboard-grid">

          {/* Sidebar */}
          <aside className="dashboard-sidebar" style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 16px',
            position: 'sticky',
            top: '90px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '16px' }}>
              <Logo variant="compact" height={26} to="/" />
              <span style={{ fontWeight: 800, fontSize: '0.9375rem' }}>Workspace</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'profile', label: 'About & Bio', icon: User, path: '/editor?tab=profile' },
                { id: 'projects', label: 'Projects', icon: FolderGit2, path: '/editor?tab=projects' },
                { id: 'education', label: 'Education', icon: GraduationCap, path: '/editor?tab=education' },
                { id: 'skills', label: 'Skills', icon: Cpu, path: '/editor?tab=skills' },
                { id: 'experience', label: 'Experience', icon: Briefcase, path: '/editor?tab=experience' },
                { id: 'achievements', label: 'Achievements', icon: Award, path: '/editor?tab=achievements' },
                { id: 'links', label: 'Links & Socials', icon: LinkIcon, path: '/editor?tab=links' },
                { id: 'appearance', label: 'Appearance', icon: Palette, path: '/editor?tab=appearance' },
                { id: 'settings', label: 'Settings', icon: Settings, path: '/editor?tab=settings' },
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.path) {
                        navigate(item.path);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? 'var(--brand-orange-light)' : 'transparent',
                      color: isSelected ? 'var(--brand-orange)' : 'var(--text-secondary)',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <IconComp size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Dashboard Content */}
          <main style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Welcome & Status Hero */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: 'clamp(20px, 4vw, 36px)'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div>
                  <h1 style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.3rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    marginBottom: '8px'
                  }}>
                    Welcome back, {displayName}.
                  </h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: portfolio.published ? '#16A34A' : '#D97706'
                    }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: portfolio.published ? '#16A34A' : '#D97706'
                      }} />
                      {portfolio.published ? 'Published' : 'Draft Mode'}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      /{username}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <a
                    href={`/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-brand btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Eye size={15} /> View Portfolio
                  </a>
                  <Link
                    to="/editor"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Edit3 size={15} /> Edit Content
                  </Link>
                  <button
                    onClick={copyUrl}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    {copied ? <CheckCircle2 size={15} color="#16A34A" /> : <Copy size={15} />}
                    {copied ? 'Copied' : 'Share'}
                  </button>
                </div>
              </div>

              {/* Public URL Box */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '12px 18px',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Public URL:</span>
                  <a
                    href={`/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--brand-orange)', wordBreak: 'break-all' }}
                  >
                    {publicUrl}
                  </a>
                </div>
                <button
                  onClick={copyUrl}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Share2 size={14} /> Copy
                </button>
              </div>
            </div>

            {/* Profile Completion Card */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '28px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                  Profile Strength
                </h3>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 800,
                  color: 'var(--brand-orange)'
                }}>
                  {completionPercentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: `${completionPercentage}%`,
                  height: '100%',
                  backgroundColor: 'var(--brand-orange)',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }} />
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    Recommended Improvements:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {suggestions.map((s, i) => (
                      <Link
                        key={i}
                        to={s.link}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          backgroundColor: 'var(--bg-main)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.875rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <span>+ {s.text}</span>
                        <ArrowRight size={14} color="var(--brand-orange)" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Summary Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  PROJECTS
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px' }}>
                  {portfolio.projects?.length || 0}
                </div>
                <Link to="/editor?tab=projects" style={{ fontSize: '0.8125rem', color: 'var(--brand-orange)', fontWeight: 600, marginTop: '8px', display: 'inline-block' }}>
                  Manage Projects →
                </Link>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  SKILLS RECORDED
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px' }}>
                  {portfolio.skills?.length || 0}
                </div>
                <Link to="/editor?tab=skills" style={{ fontSize: '0.8125rem', color: 'var(--brand-orange)', fontWeight: 600, marginTop: '8px', display: 'inline-block' }}>
                  Edit Skills →
                </Link>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  SELECTED TEMPLATE
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase' }}>
                  {portfolio.settings?.template || 'Editorial'}
                </div>
                <Link to="/editor?tab=appearance" style={{ fontSize: '0.8125rem', color: 'var(--brand-orange)', fontWeight: 600, marginTop: '8px', display: 'inline-block' }}>
                  Change Theme →
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
          .dashboard-sidebar {
            position: static !important;
            top: auto !important;
          }
          .dashboard-sidebar nav {
            flex-direction: row !important;
            overflow-x: auto;
            padding-bottom: 8px;
            gap: 6px;
            -webkit-overflow-scrolling: touch;
          }
          .dashboard-sidebar nav button {
            white-space: nowrap;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
