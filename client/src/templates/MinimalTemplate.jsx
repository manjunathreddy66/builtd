import React from 'react';
import { getThemeStyles } from './templateUtils';
import { Logo } from '../components/common/Logo';
import { ContactButtons } from '../components/common/ContactButtons';
import { 
  Mail, 
  ExternalLink, 
  Code, 
  FileText, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award 
} from 'lucide-react';
import { Github } from '../components/common/Icons';

export const MinimalTemplate = ({ data }) => {
  const { profile = {}, education = [], skills = [], projects = [], experience = [], achievements = [], certifications = [], links = {}, resumeUrl = '', settings = {} } = data;
  const theme = getThemeStyles(settings);

  const avatarShape = settings.avatarShape || 'circle';

  return (
    <div style={theme.rootStyle}>
      {/* Portfolio Header Bar */}
      <header style={{
        borderBottom: `1px solid ${theme.borderLight}`,
        padding: '20px 0',
        backgroundColor: theme.bgCard
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
            {profile.name || 'Student Portfolio'}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <ContactButtons links={links} theme={theme} variant="nav" />
            {resumeUrl && (
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: theme.accent,
                  border: `1px solid ${theme.accent}`,
                  padding: '6px 14px',
                  borderRadius: '4px'
                }}
              >
                Resume
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container" style={{ maxWidth: '840px', padding: '50px 20px 80px 20px' }}>
        {/* Hero Section */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap-reverse', gap: '24px' }}>
            <div>
              <h1 style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                marginBottom: '16px',
                ...theme.invertedTitleStyle
              }}>
                {profile.name}
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: theme.accent,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '18px'
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
                  marginBottom: '24px'
                }}>
                  <MapPin size={15} />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {profile.profileImage && avatarShape !== 'none' && (
              <img
                src={profile.profileImage}
                alt={profile.name}
                style={{
                  width: '110px',
                  height: '110px',
                  objectFit: 'cover',
                  borderRadius: avatarShape === 'circle' ? '50%' : '8px',
                  border: `1px solid ${theme.borderDefault}`,
                  flexShrink: 0
                }}
              />
            )}
          </div>

          {profile.bio && (
            <p style={{
              fontSize: '1.125rem',
              color: theme.textSecondary,
              maxWidth: '680px',
              marginTop: '16px',
              lineHeight: 1.7
            }}>
              {profile.bio}
            </p>
          )}

          <div style={{ display: 'flex', gap: '14px', marginTop: '30px' }}>
            {projects.length > 0 && (
              <a 
                href="#projects" 
                style={{
                  backgroundColor: theme.textPrimary,
                  color: theme.bgMain,
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                View Projects ↓
              </a>
            )}
            {resumeUrl && (
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  border: `1px solid ${theme.borderDefault}`,
                  color: theme.textPrimary,
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <FileText size={15} /> Resume
              </a>
            )}
          </div>

          {/* Hero Contact Buttons with App Icons */}
          <ContactButtons links={links} theme={theme} variant="hero" style={{ marginTop: '22px' }} />
        </section>

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects" style={{ marginBottom: '70px' }}>
            <h2 style={{
              fontSize: '0.8125rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: theme.textMuted,
              fontWeight: 700,
              marginBottom: '28px',
              borderBottom: `1px solid ${theme.borderLight}`,
              paddingBottom: '10px'
            }}>
              Projects ({projects.length})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {projects.map((proj, idx) => (
                <article key={proj.id || idx} style={{
                  paddingBottom: '30px',
                  borderBottom: idx !== projects.length - 1 ? `1px dashed ${theme.borderLight}` : 'none'
                }}>
                  {proj.image && (
                    <img 
                      src={proj.image} 
                      alt={proj.name}
                      style={{
                        width: '100%',
                        height: '240px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '18px',
                        border: `1px solid ${theme.borderLight}`
                      }}
                    />
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                      {proj.name}
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" title="Source Code" style={{ color: theme.textSecondary }}>
                          <Github size={16} />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" title="Live Demo" style={{ color: theme.accent }}>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p style={{ color: theme.textSecondary, fontSize: '0.9375rem', margin: '10px 0 14px 0' }}>
                    {proj.description}
                  </p>

                  {proj.learned && (
                    <p style={{ fontSize: '0.8125rem', color: theme.textMuted, fontStyle: 'italic', marginBottom: '12px' }}>
                      Key takeaway: {proj.learned}
                    </p>
                  )}

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {proj.technologies.map((t, i) => (
                        <span key={i} style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: theme.bgSubtle,
                          padding: '3px 8px',
                          borderRadius: '3px',
                          color: theme.textSecondary
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
          <section style={{ marginBottom: '70px' }}>
            <h2 style={{
              fontSize: '0.8125rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: theme.textMuted,
              fontWeight: 700,
              marginBottom: '20px',
              borderBottom: `1px solid ${theme.borderLight}`,
              paddingBottom: '10px'
            }}>
              Skills & Technologies
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '0.875rem',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  fontWeight: 500
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section style={{ marginBottom: '70px' }}>
            <h2 style={{
              fontSize: '0.8125rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: theme.textMuted,
              fontWeight: 700,
              marginBottom: '24px',
              borderBottom: `1px solid ${theme.borderLight}`,
              paddingBottom: '10px'
            }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((edu, i) => (
                <div key={edu.id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
                      {edu.degree} {edu.branch && `in ${edu.branch}`}
                    </h3>
                    <p style={{ color: theme.textSecondary, fontSize: '0.9375rem' }}>
                      {edu.college} {edu.university && `(${edu.university})`}
                    </p>
                    {edu.cgpa && (
                      <p style={{ fontSize: '0.8125rem', color: theme.accent, fontWeight: 600 }}>
                        Score: {edu.cgpa}
                      </p>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: theme.textMuted, whiteSpace: 'nowrap' }}>
                    {edu.startYear} — {edu.endYear || 'Present'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section (Only if present) */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '70px' }}>
            <h2 style={{
              fontSize: '0.8125rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: theme.textMuted,
              fontWeight: 700,
              marginBottom: '24px',
              borderBottom: `1px solid ${theme.borderLight}`,
              paddingBottom: '10px'
            }}>
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {experience.map((exp, i) => (
                <div key={exp.id || i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
                      {exp.role} <span style={{ fontWeight: 400, color: theme.textMuted }}>at {exp.organization}</span>
                    </h3>
                    <span style={{ fontSize: '0.8125rem', color: theme.textMuted }}>
                      {exp.startDate} — {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p style={{ color: theme.textSecondary, fontSize: '0.9375rem', marginTop: '6px' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {achievements.length > 0 && (
          <section style={{ marginBottom: '70px' }}>
            <h2 style={{
              fontSize: '0.8125rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: theme.textMuted,
              fontWeight: 700,
              marginBottom: '24px',
              borderBottom: `1px solid ${theme.borderLight}`,
              paddingBottom: '10px'
            }}>
              Achievements & Honors
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {achievements.map((ach, i) => (
                <div key={ach.id || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
                      {ach.title}
                    </h3>
                    <p style={{ color: theme.textSecondary, fontSize: '0.875rem' }}>
                      {ach.organization} {ach.description && `— ${ach.description}`}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: theme.textMuted }}>
                    {ach.year}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Footer */}
        <section style={{
          borderTop: `1px solid ${theme.borderLight}`,
          paddingTop: '50px',
          marginTop: '60px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
              Let's connect.
            </h3>
            <p style={{ color: theme.textSecondary, fontSize: '0.9375rem' }}>
              Feel free to reach out directly through any platform below.
            </p>
          </div>
          
          <ContactButtons links={links} theme={theme} variant="section" />
        </section>
      </main>

      {/* BUILTD Platform Watermark Footer */}
      <footer style={{
        borderTop: `1px solid ${theme.borderLight}`,
        padding: '24px 0',
        textAlign: 'center',
        backgroundColor: theme.bgCard
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Logo variant="compact" height={20} to="/" />
          <span style={{ fontSize: '0.8125rem', color: theme.textMuted }}>
            Built with <strong>BUILTD</strong> — Build your digital identity.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default MinimalTemplate;
