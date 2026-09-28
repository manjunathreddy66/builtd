import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStoredPortfolios } from '../services/portfolioService';
import { Logo } from '../components/common/Logo';
import { ExternalLink, Search, Sparkles, MapPin } from 'lucide-react';

export const Explore = () => {
  const allPortfolios = getAllStoredPortfolios();
  const students = Object.values(allPortfolios).filter(p => p.published && p.username);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = students.filter(s => {
    const term = searchTerm.toLowerCase();
    const nameMatch = s.profile?.name?.toLowerCase().includes(term);
    const headlineMatch = s.profile?.headline?.toLowerCase().includes(term);
    const skillsMatch = s.skills?.some(sk => sk.toLowerCase().includes(term));
    const userMatch = s.username?.toLowerCase().includes(term);
    return nameMatch || headlineMatch || skillsMatch || userMatch;
  });

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', backgroundColor: 'var(--bg-main)', padding: '50px 20px 100px 20px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Student Directory</div>
          <h1 className="section-title">
            Explore Student Portfolios
          </h1>
          <p className="section-subtitle" style={{ margin: '10px auto 28px auto' }}>
            Discover engineered digital identities built by college students worldwide.
          </p>

          {/* Search bar */}
          <div style={{
            position: 'relative',
            maxWidth: '460px',
            margin: '0 auto'
          }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by student, skill (React, PyTorch, C++)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '44px', borderRadius: 'var(--radius-full)' }}
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px'
        }}>
          {filtered.map((student) => (
            <div
              key={student.username}
              className="card card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <img
                    src={student.profile?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={student.profile?.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--border-default)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                      {student.profile?.name}
                    </h3>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--brand-orange)', fontWeight: 600 }}>
                      {student.profile?.headline}
                    </div>
                    {student.profile?.location && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <MapPin size={12} /> {student.profile.location}
                      </div>
                    )}
                  </div>
                </div>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '18px'
                }}>
                  {student.profile?.bio?.slice(0, 140)}...
                </p>

                {student.skills && student.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {student.skills.slice(0, 5).map((sk, i) => (
                      <span key={i} style={{
                        fontSize: '0.75rem',
                        backgroundColor: 'var(--bg-main)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-default)'
                      }}>
                        {sk}
                      </span>
                    ))}
                    {student.skills.length > 5 && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                        +{student.skills.length - 5}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '14px'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Template: {student.settings?.template || 'editorial'}</span>
                  <span style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>● Live</span>
                </div>

                <Link
                  to={`/${student.username}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  View Portfolio <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
