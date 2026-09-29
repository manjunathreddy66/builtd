import React from 'react';
import { getThemeStyles } from './templateUtils';
import { PortfolioFooter } from '../components/common/PortfolioFooter';
import { ContactButtons } from '../components/common/ContactButtons';
import { 
  Mail, 
  ExternalLink, 
  MapPin, 
  FileText, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Github } from '../components/common/Icons';

export const GridTemplate = ({ data }) => {
  const { 
    profile = {}, 
    education = [], 
    skills = [], 
    projects = [], 
    experience = [], 
    achievements = [], 
    certifications = [], 
    links = {}, 
    resumeUrl = '', 
    settings = {} 
  } = data;

  const theme = getThemeStyles(settings);
  const avatarShape = settings.avatarShape || 'circle';

  return (
    <div style={{ ...theme.rootStyle, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Identity Header Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: `1px solid ${theme.borderDefault}`,
        padding: '14px 20px'
      }}>
        <div className="container" style={{
          maxWidth: '1100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981'
            }} />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.02em', color: theme.textPrimary }}>
              {profile.name || 'Student Portfolio'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <ContactButtons links={links} theme={theme} variant="nav" />
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="ios-btn"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: theme.accent,
                  border: `1.5px solid ${theme.accent}`,
                  backgroundColor: theme.accentSubtle,
                  padding: '6px 14px',
                  borderRadius: '999px',
                  textDecoration: 'none'
                }}
              >
                Resume
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Bento Grid Content */}
      <main className="container" style={{ maxWidth: '1100px', padding: '40px 20px 60px 20px', flexGrow: 1 }}>
        <div 
          className="bento-grid-wrapper"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '20px'
          }}
        >
          
          {/* Box 1: Profile & Headline (8 or 12 cols) */}
          <div 
            className="bento-box-hero ios-card ios-reveal" 
            style={{
              gridColumn: profile.profileImage && avatarShape !== 'none' ? 'span 8' : 'span 12',
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderDefault}`,
              borderRadius: '24px',
              padding: 'clamp(28px, 5vw, 42px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                borderRadius: '999px',
                backgroundColor: theme.accentSubtle,
                color: theme.accent,
                fontSize: '0.8125rem',
                fontWeight: 700,
                marginBottom: '18px',
                border: `1px solid ${theme.borderLight}`
              }}>
                <Sparkles size={14} /> Available for Opportunities
              </div>

              <h1 style={{
                fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.1,
                marginBottom: '14px',
                color: theme.textPrimary,
                ...theme.invertedTitleStyle
              }}>
                {profile.name}
              </h1>

              <p style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                color: theme.accent,
                fontWeight: 600,
                letterSpacing: '-0.015em',
                marginBottom: '16px'
              }}>
                {profile.headline}
              </p>

              {profile.location && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: theme.textMuted,
                  fontSize: '0.875rem',
                  marginBottom: '20px'
                }}>
                  <MapPin size={15} color={theme.accent} />
                  <span>{profile.location}</span>
                </div>
              )}

              {profile.bio && (
                <p style={{
                  fontSize: '1rem',
                  color: theme.textSecondary,
                  lineHeight: 1.65,
                  maxWidth: '580px'
                }}>
                  {profile.bio}
                </p>
              )}
            </div>

            <div style={{ marginTop: '28px' }}>
              <ContactButtons links={links} theme={theme} variant="hero" />
            </div>
          </div>

          {/* Box 2: Profile Picture (4 cols) */}
          {profile.profileImage && avatarShape !== 'none' && (
            <div 
              className="bento-box-avatar ios-card ios-reveal ios-reveal-delay-1" 
              style={{
                gridColumn: 'span 4',
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '24px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                overflow: 'hidden'
              }}
            >
              <img
                src={profile.profileImage}
                alt={profile.name}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '260px',
                  maxHeight: '340px',
                  objectFit: 'cover',
                  borderRadius: avatarShape === 'circle' ? '50%' : '18px',
                  border: `2px solid ${theme.borderDefault}`,
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.06)'
                }}
              />
            </div>
          )}

          {/* Box 3: Skills (6 cols) */}
          {skills.length > 0 && (
            <div 
              className="bento-box-skills ios-card ios-reveal ios-reveal-delay-1" 
              style={{
                gridColumn: 'span 6',
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '10px',
                  backgroundColor: theme.accentSubtle,
                  color: theme.accent,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Code2 size={18} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.textPrimary }}>
                  Core Tech Stack & Skills
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {skills.map((s, i) => (
                  <span key={i} className="ios-btn" style={{
                    fontSize: '0.85rem',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    backgroundColor: theme.bgSubtle,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.borderDefault}`,
                    fontWeight: 600,
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Box 4: Education (6 cols) */}
          {education.length > 0 && (
            <div 
              className="bento-box-edu ios-card ios-reveal ios-reveal-delay-2" 
              style={{
                gridColumn: skills.length > 0 ? 'span 6' : 'span 12',
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '24px',
                padding: '30px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{
                  padding: '8px',
                  borderRadius: '10px',
                  backgroundColor: theme.accentSubtle,
                  color: theme.accent,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <GraduationCap size={18} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.textPrimary }}>
                  Education
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {education.map((edu, i) => (
                  <div key={edu.id || i} style={{
                    borderLeft: `2.5px solid ${theme.accent}`,
                    paddingLeft: '16px'
                  }}>
                    <div style={{ fontSize: '0.78125rem', color: theme.textMuted, fontWeight: 600 }}>
                      {edu.startYear} — {edu.endYear || 'Present'}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: theme.textPrimary, marginTop: '2px' }}>
                      {edu.degree} in {edu.branch}
                    </div>
                    <div style={{ color: theme.textSecondary, fontSize: '0.875rem', marginTop: '2px' }}>
                      {edu.college}
                    </div>
                    {edu.cgpa && (
                      <div style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: theme.accent,
                        backgroundColor: theme.accentSubtle,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        marginTop: '6px'
                      }}>
                        CGPA / Grade: {edu.cgpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Box 5: Featured Projects (12 cols) */}
          {projects.length > 0 && (
            <div 
              className="ios-card ios-reveal ios-reveal-delay-2" 
              style={{
                gridColumn: 'span 12',
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 36px)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '26px'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.025em', color: theme.textPrimary }}>
                    Featured Projects & Builds
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: theme.textSecondary, marginTop: '2px' }}>
                    Production applications, prototypes, and technical architectures.
                  </p>
                </div>
                <span style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: theme.accent,
                  backgroundColor: theme.accentSubtle,
                  padding: '4px 10px',
                  borderRadius: '999px'
                }}>
                  {projects.length} Showcased
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '22px'
              }}>
                {projects.map((proj, i) => (
                  <div 
                    key={proj.id || i} 
                    className="ios-card"
                    style={{
                      backgroundColor: theme.bgSubtle,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: `1px solid ${theme.borderLight}`,
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)'
                    }}
                  >
                    {proj.image && (
                      <img 
                        src={proj.image} 
                        alt={proj.name}
                        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '8px', color: theme.textPrimary }}>
                        {proj.name}
                      </h4>
                      <p style={{ color: theme.textSecondary, fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '16px' }}>
                        {proj.description}
                      </p>

                      {proj.technologies && proj.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                          {proj.technologies.map((t, idx) => (
                            <span key={idx} style={{
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              backgroundColor: theme.bgCard,
                              padding: '3px 10px',
                              borderRadius: '6px',
                              color: theme.textSecondary,
                              border: `1px solid ${theme.borderDefault}`
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: 'auto', paddingTop: '10px' }}>
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-brand btn-sm ios-btn"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              textDecoration: 'none'
                            }}
                          >
                            Live Demo <ExternalLink size={13} />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a 
                            href={proj.githubUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="btn btn-secondary btn-sm ios-btn"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              textDecoration: 'none'
                            }}
                          >
                            <Github size={14} /> Repository
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Box 6: Experience & Achievements */}
          {(experience.length > 0 || achievements.length > 0) && (
            <div 
              className="bento-box-exp-ach ios-reveal ios-reveal-delay-3" 
              style={{
                gridColumn: 'span 12',
                display: 'grid',
                gridTemplateColumns: experience.length > 0 && achievements.length > 0 ? '1fr 1fr' : '1fr',
                gap: '20px'
              }}
            >
              {experience.length > 0 && (
                <div className="ios-card" style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  borderRadius: '24px',
                  padding: '30px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
                    <div style={{
                      padding: '8px',
                      borderRadius: '10px',
                      backgroundColor: theme.accentSubtle,
                      color: theme.accent,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Briefcase size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.textPrimary }}>
                      Work Experience
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {experience.map((exp, i) => (
                      <div key={exp.id || i} style={{ borderLeft: `2.5px solid ${theme.accent}`, paddingLeft: '16px' }}>
                        <div style={{ fontSize: '0.75rem', color: theme.textMuted, fontWeight: 600 }}>
                          {exp.startDate} — {exp.endDate || 'Present'}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: theme.textPrimary, marginTop: '2px' }}>
                          {exp.role} · <span style={{ fontWeight: 600, color: theme.accent }}>{exp.organization}</span>
                        </div>
                        <p style={{ color: theme.textSecondary, fontSize: '0.875rem', marginTop: '6px', lineHeight: 1.6 }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {achievements.length > 0 && (
                <div className="ios-card" style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  borderRadius: '24px',
                  padding: '30px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
                    <div style={{
                      padding: '8px',
                      borderRadius: '10px',
                      backgroundColor: theme.accentSubtle,
                      color: theme.accent,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Award size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.textPrimary }}>
                      Honors & Recognitions
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {achievements.map((ach, i) => (
                      <div key={ach.id || i} style={{ borderLeft: `2.5px solid ${theme.accent}`, paddingLeft: '16px' }}>
                        <div style={{ fontSize: '0.75rem', color: theme.textMuted, fontWeight: 600 }}>
                          {ach.year}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: theme.textPrimary, marginTop: '2px' }}>
                          {ach.title}
                        </div>
                        <div style={{ color: theme.textSecondary, fontSize: '0.875rem', marginTop: '4px' }}>
                          {ach.organization} {ach.description && `— ${ach.description}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* BUILTD Signature Footer */}
      <PortfolioFooter theme={theme} profileName={profile.name} />

      {/* Responsive adjustments for bento grid */}
      <style>{`
        @media (max-width: 860px) {
          .bento-box-hero { grid-column: span 12 !important; }
          .bento-box-avatar { grid-column: span 12 !important; max-height: 240px; }
          .bento-box-skills { grid-column: span 12 !important; }
          .bento-box-edu { grid-column: span 12 !important; }
          .bento-box-exp-ach { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default GridTemplate;
