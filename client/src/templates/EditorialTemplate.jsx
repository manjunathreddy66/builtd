import React from 'react';
import { getThemeStyles } from './templateUtils';
import { PortfolioFooter } from '../components/common/PortfolioFooter';
import { ContactButtons } from '../components/common/ContactButtons';
import { 
  Mail, 
  ExternalLink, 
  MapPin, 
  ArrowUpRight, 
  FileText, 
  Calendar, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { Github } from '../components/common/Icons';

export const EditorialTemplate = ({ data }) => {
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
  const avatarShape = settings.avatarShape || 'square';

  return (
    <div style={theme.rootStyle}>
      {/* Top Editorial Bar */}
      <div style={{
        borderBottom: `2px solid ${theme.borderDefault}`,
        padding: '16px 0',
        backgroundColor: theme.bgCard
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8125rem',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            PORTFOLIO / {profile.name ? profile.name.toUpperCase() : 'STUDENT'}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            {profile.location && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color={theme.accent} /> {profile.location}
              </span>
            )}
            <span style={{ color: theme.accent, fontWeight: 700 }}>
              AVAILABLE FOR HIRE
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header: Asymmetric Editorial Composition */}
      <section style={{
        borderBottom: `2px solid ${theme.borderDefault}`,
        padding: '70px 0 60px 0',
        backgroundColor: theme.bgCard
      }}>
        <div className="container">
          <div 
            className={`editorial-hero-grid ${(!profile.profileImage || avatarShape === 'none') ? 'no-avatar' : ''}`}
            style={{
              display: 'grid',
              gap: 'clamp(24px, 4.5vw, 50px)',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: theme.accent,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '14px'
              }}>
                Engineering & Technology Portfolio
              </div>

              <h1 style={{
                fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                textTransform: 'uppercase',
                marginBottom: '22px',
                color: theme.textPrimary,
                ...theme.invertedTitleStyle
              }}>
                {profile.name}
              </h1>

              <div style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                fontWeight: 600,
                color: theme.textSecondary,
                letterSpacing: '-0.02em',
                maxWidth: '720px',
                marginBottom: '24px'
              }}>
                {profile.headline}
              </div>

              {profile.bio && (
                <p style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.65,
                  color: theme.textSecondary,
                  maxWidth: '680px',
                  marginBottom: '32px'
                }}>
                  {profile.bio}
                </p>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                {projects.length > 0 && (
                  <a
                    href="#projects"
                    style={{
                      backgroundColor: theme.accent,
                      color: theme.accentText || '#FFFFFF',
                      padding: '12px 26px',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      borderRadius: '2px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Explore Work <ArrowUpRight size={18} />
                  </a>
                )}
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      border: `2px solid ${theme.borderDefault}`,
                      color: theme.textPrimary,
                      padding: '12px 24px',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      borderRadius: '2px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <FileText size={16} /> Download Resume
                  </a>
                )}
              </div>

              {/* Hero Contact Buttons with App Icons */}
              <ContactButtons links={links} theme={theme} variant="hero" style={{ marginTop: '20px' }} />
            </div>

            {profile.profileImage && avatarShape !== 'none' && (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                  border: `3px solid ${theme.textPrimary}`,
                  borderRadius: avatarShape === 'circle' ? '50%' : '4px',
                  overflow: 'hidden',
                  boxShadow: `8px 8px 0px ${theme.accent}`
                }}>
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    style={{
                      width: 'clamp(140px, 35vw, 240px)',
                      height: 'clamp(140px, 35vw, 240px)',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Body Layout */}
      <div className="container" style={{ padding: '60px 24px 100px 24px' }}>
        {/* Section 01: Projects */}
        {projects.length > 0 && (
          <section id="projects" style={{ marginBottom: '80px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              borderBottom: `2px solid ${theme.textPrimary}`,
              paddingBottom: '12px',
              marginBottom: '36px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: theme.accent
                }}>
                  01
                </span>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase'
                }}>
                  Selected Projects
                </h2>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: theme.textMuted }}>
                {projects.length} PROJECTS BUILT
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              {projects.map((proj, idx) => (
                <div 
                  key={proj.id || idx}
                  className={`editorial-project-card ${proj.image ? 'has-image' : 'no-image'}`}
                  style={{
                    backgroundColor: theme.bgCard,
                    border: `1px solid ${theme.borderDefault}`,
                    borderRadius: '4px'
                  }}
                >
                  {proj.image && (
                    <div 
                      className="editorial-project-image-box"
                      style={{
                        borderRadius: '2px',
                        overflow: 'hidden',
                        border: `1px solid ${theme.borderLight}`,
                        height: '260px'
                      }}
                    >
                      <img 
                        src={proj.image} 
                        alt={proj.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: theme.accent,
                      fontWeight: 700,
                      marginBottom: '8px'
                    }}>
                      PROJECT 0{idx + 1}
                    </div>

                    <h3 style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      marginBottom: '12px'
                    }}>
                      {proj.name}
                    </h3>

                    <p style={{
                      color: theme.textSecondary,
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      marginBottom: '16px'
                    }}>
                      {proj.description}
                    </p>

                    {proj.learned && (
                      <div style={{
                        padding: '10px 14px',
                        backgroundColor: theme.accentSubtle,
                        borderLeft: `3px solid ${theme.accent}`,
                        fontSize: '0.8125rem',
                        marginBottom: '16px'
                      }}>
                        <strong>Impact:</strong> {proj.learned}
                      </div>
                    )}

                    {proj.technologies && proj.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                        {proj.technologies.map((tech, i) => (
                          <span key={i} style={{
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '3px 8px',
                            backgroundColor: theme.bgSubtle,
                            color: theme.textPrimary,
                            border: `1px solid ${theme.borderLight}`
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '16px' }}>
                      {proj.liveUrl && (
                        <a 
                          href={proj.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            color: theme.accent,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Live Demo <ArrowUpRight size={15} />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a 
                          href={proj.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            color: theme.textSecondary,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Github size={15} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 02: Skills & Stack */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '80px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              borderBottom: `2px solid ${theme.textPrimary}`,
              paddingBottom: '12px',
              marginBottom: '30px'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: theme.accent
              }}>
                02
              </span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase'
              }}>
                Technical Toolkit
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 130px), 1fr))',
              gap: '12px'
            }}>
              {skills.map((skill, i) => (
                <div key={i} style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  padding: '14px',
                  borderRadius: '2px',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: theme.accent, borderRadius: '50%' }} />
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 03: Education & Experience Grid */}
        {(education.length > 0 || experience.length > 0) && (
          <section style={{ marginBottom: '80px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              borderBottom: `2px solid ${theme.textPrimary}`,
              paddingBottom: '12px',
              marginBottom: '36px'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: theme.accent
              }}>
                03
              </span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase'
              }}>
                Background & Journey
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(20px, 3.5vw, 36px)'
            }}>
              {/* Education Column */}
              {education.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '20px',
                    color: theme.accent
                  }}>
                    Academic Background
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {education.map((edu, i) => (
                      <div key={edu.id || i} style={{
                        backgroundColor: theme.bgCard,
                        border: `1px solid ${theme.borderDefault}`,
                        padding: '20px',
                        borderRadius: '2px'
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: theme.textMuted,
                          marginBottom: '4px'
                        }}>
                          {edu.startYear} — {edu.endYear || 'Present'}
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                          {edu.degree} {edu.branch && `(${edu.branch})`}
                        </h4>
                        <p style={{ color: theme.textSecondary, fontSize: '0.9375rem', marginTop: '4px' }}>
                          {edu.college} {edu.university && `— ${edu.university}`}
                        </p>
                        {edu.cgpa && (
                          <div style={{
                            display: 'inline-block',
                            marginTop: '10px',
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            color: theme.accent
                          }}>
                            CGPA: {edu.cgpa}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Column */}
              {experience.length > 0 && (
                <div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '20px',
                    color: theme.accent
                  }}>
                    Experience & Leadership
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {experience.map((exp, i) => (
                      <div key={exp.id || i} style={{
                        backgroundColor: theme.bgCard,
                        border: `1px solid ${theme.borderDefault}`,
                        padding: '20px',
                        borderRadius: '2px'
                      }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: theme.textMuted,
                          marginBottom: '4px'
                        }}>
                          {exp.startDate} — {exp.endDate || 'Present'} • {exp.type || 'Role'}
                        </div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                          {exp.role}
                        </h4>
                        <div style={{ fontWeight: 600, color: theme.textSecondary, fontSize: '0.9375rem', marginBottom: '8px' }}>
                          {exp.organization}
                        </div>
                        <p style={{ color: theme.textSecondary, fontSize: '0.875rem', lineHeight: 1.6 }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 04: Honors & Accreditations (if any) */}
        {(achievements.length > 0 || certifications.length > 0) && (
          <section style={{ marginBottom: '80px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              borderBottom: `2px solid ${theme.textPrimary}`,
              paddingBottom: '12px',
              marginBottom: '30px'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: theme.accent
              }}>
                04
              </span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase'
              }}>
                Achievements & Credentials
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '20px'
            }}>
              {achievements.map((ach, i) => (
                <div key={ach.id || i} style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  padding: '20px',
                  borderRadius: '2px'
                }}>
                  <div style={{ color: theme.accent, marginBottom: '8px' }}>
                    <Award size={20} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: theme.textMuted }}>
                    {ach.year} • {ach.organization}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '6px 0' }}>
                    {ach.title}
                  </h4>
                  {ach.description && (
                    <p style={{ fontSize: '0.875rem', color: theme.textSecondary }}>
                      {ach.description}
                    </p>
                  )}
                </div>
              ))}

              {certifications.map((cert, i) => (
                <div key={cert.id || i} style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  padding: '20px',
                  borderRadius: '2px'
                }}>
                  <div style={{ color: theme.accent, marginBottom: '8px' }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: theme.textMuted }}>
                    {cert.year} • {cert.organization}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '6px 0' }}>
                    {cert.title}
                  </h4>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 05: Contact & Inquiries */}
        <section style={{
          backgroundColor: theme.bgCard,
          border: `2px solid ${theme.textPrimary}`,
          padding: '48px 36px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginBottom: '12px'
          }}>
            Initiate Contact
          </h2>
          <p style={{
            color: theme.textSecondary,
            maxWidth: '540px',
            margin: '0 auto 28px auto',
            fontSize: '1rem'
          }}>
            Available for internships, full-time engineering positions, and technical collaborations.
          </p>
          <ContactButtons links={links} theme={theme} variant="section" />
        </section>
      </div>

      {/* BUILTD Platform Brand Footer */}
      <PortfolioFooter theme={theme} profileName={profile.name} />
    </div>
  );
};

export default EditorialTemplate;
