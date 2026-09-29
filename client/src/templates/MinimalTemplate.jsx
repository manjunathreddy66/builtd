import React from 'react';
import { getThemeStyles } from './templateUtils';
import { PortfolioFooter } from '../components/common/PortfolioFooter';
import { ContactButtons } from '../components/common/ContactButtons';
import { 
  Mail, 
  ExternalLink, 
  MapPin, 
  FileText, 
  Sparkles,
  ArrowUpRight,
  GraduationCap,
  Briefcase,
  Award
} from 'lucide-react';
import { Github } from '../components/common/Icons';

export const MinimalTemplate = ({ data }) => {
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
      
      {/* Frosted Glass Top Bar */}
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
          maxWidth: '860px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981'
            }} />
            <span style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.02em', color: theme.textPrimary }}>
              {profile.name || 'Portfolio'}
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
                  padding: '5px 12px',
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

      {/* Main Content Area */}
      <main className="container" style={{ maxWidth: '860px', padding: '50px 20px 80px 20px', flexGrow: 1 }}>
        
        {/* Hero Section */}
        <section className="ios-reveal" style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap-reverse', gap: '24px' }}>
            <div style={{ flexGrow: 1, maxWidth: '640px' }}>
              
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '999px',
                backgroundColor: theme.accentSubtle,
                color: theme.accent,
                fontSize: '0.78125rem',
                fontWeight: 700,
                marginBottom: '16px',
                border: `1px solid ${theme.borderLight}`
              }}>
                <Sparkles size={13} /> Available for Opportunities
              </div>

              <h1 style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
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
                fontSize: '1.25rem',
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
                  fontSize: '1.05rem',
                  color: theme.textSecondary,
                  lineHeight: 1.7,
                  marginTop: '12px'
                }}>
                  {profile.bio}
                </p>
              )}
            </div>

            {profile.profileImage && avatarShape !== 'none' && (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="ios-card"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: avatarShape === 'circle' ? '50%' : '20px',
                  border: `2px solid ${theme.borderDefault}`,
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                  flexShrink: 0
                }}
              />
            )}
          </div>

          <div style={{ marginTop: '28px' }}>
            <ContactButtons links={links} theme={theme} variant="hero" />
          </div>
        </section>

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects" className="ios-reveal ios-reveal-delay-1" style={{ marginBottom: '64px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${theme.borderDefault}`,
              paddingBottom: '12px',
              marginBottom: '28px'
            }}>
              <h2 style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: theme.textPrimary
              }}>
                Featured Work & Projects
              </h2>
              <span style={{ fontSize: '0.8125rem', color: theme.textMuted, fontWeight: 600 }}>
                {projects.length} builds
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {projects.map((proj, idx) => (
                <article 
                  key={proj.id || idx} 
                  className="ios-card"
                  style={{
                    backgroundColor: theme.bgCard,
                    border: `1px solid ${theme.borderDefault}`,
                    borderRadius: '20px',
                    padding: '26px',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {proj.image && (
                    <img 
                      src={proj.image} 
                      alt={proj.name}
                      style={{
                        width: '100%',
                        height: '240px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        marginBottom: '18px',
                        border: `1px solid ${theme.borderLight}`
                      }}
                    />
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.textPrimary }}>
                      {proj.name}
                    </h3>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {proj.liveUrl && (
                        <a 
                          href={proj.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn btn-brand btn-sm ios-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
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
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                        >
                          <Github size={13} /> Code
                        </a>
                      )}
                    </div>
                  </div>

                  <p style={{ color: theme.textSecondary, fontSize: '0.9375rem', lineHeight: 1.6, margin: '12px 0 16px 0' }}>
                    {proj.description}
                  </p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {proj.technologies.map((t, i) => (
                        <span key={i} style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: theme.bgSubtle,
                          padding: '3px 10px',
                          borderRadius: '6px',
                          color: theme.textSecondary,
                          border: `1px solid ${theme.borderLight}`
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="ios-reveal ios-reveal-delay-2" style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: theme.textPrimary,
              borderBottom: `1px solid ${theme.borderDefault}`,
              paddingBottom: '12px',
              marginBottom: '20px'
            }}>
              Skills & Technologies
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, i) => (
                <span key={i} className="ios-btn" style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  padding: '7px 14px',
                  borderRadius: '10px',
                  backgroundColor: theme.bgCard,
                  color: theme.textPrimary,
                  border: `1px solid ${theme.borderDefault}`,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="ios-reveal ios-reveal-delay-2" style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: theme.textPrimary,
              borderBottom: `1px solid ${theme.borderDefault}`,
              paddingBottom: '12px',
              marginBottom: '24px'
            }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((edu, i) => (
                <div key={edu.id || i} style={{ borderLeft: `2.5px solid ${theme.accent}`, paddingLeft: '16px' }}>
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
                      CGPA: {edu.cgpa}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="ios-reveal ios-reveal-delay-3" style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: theme.textPrimary,
              borderBottom: `1px solid ${theme.borderDefault}`,
              paddingBottom: '12px',
              marginBottom: '24px'
            }}>
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {experience.map((exp, i) => (
                <div key={exp.id || i} style={{ borderLeft: `2.5px solid ${theme.accent}`, paddingLeft: '16px' }}>
                  <div style={{ fontSize: '0.78125rem', color: theme.textMuted, fontWeight: 600 }}>
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: theme.textPrimary, marginTop: '2px' }}>
                    {exp.role} · <span style={{ fontWeight: 600, color: theme.accent }}>{exp.organization}</span>
                  </div>
                  <p style={{ color: theme.textSecondary, fontSize: '0.9rem', marginTop: '6px', lineHeight: 1.6 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* BUILTD Signature Footer */}
      <PortfolioFooter theme={theme} profileName={profile.name} />

    </div>
  );
};

export default MinimalTemplate;
