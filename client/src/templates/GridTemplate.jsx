import React from 'react';
import { getThemeStyles } from './templateUtils';
import { Logo } from '../components/common/Logo';
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
  Sparkles 
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
    <div style={{ ...theme.rootStyle, padding: '40px 20px 80px 20px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        {/* Bento Grid Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '20px'
        }}>
          {/* Box 1: Profile & Headline (8 cols) */}
          <div style={{
            gridColumn: profile.profileImage && avatarShape !== 'none' ? 'span 8' : 'span 12',
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderDefault}`,
            borderRadius: '16px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }} className="bento-box-hero">
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: '999px',
                backgroundColor: theme.accentSubtle,
                color: theme.accent,
                fontSize: '0.8125rem',
                fontWeight: 600,
                marginBottom: '18px'
              }}>
                <Sparkles size={14} /> Open to Opportunities
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '12px',
                ...theme.invertedTitleStyle
              }}>
                {profile.name}
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: theme.textSecondary,
                fontWeight: 500,
                letterSpacing: '-0.01em',
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
                  <MapPin size={15} />
                  <span>{profile.location}</span>
                </div>
              )}

              {profile.bio && (
                <p style={{
                  fontSize: '1rem',
                  color: theme.textSecondary,
                  lineHeight: 1.6,
                  maxWidth: '560px'
                }}>
                  {profile.bio}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: theme.accent,
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
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
            <ContactButtons links={links} theme={theme} variant="hero" style={{ marginTop: '20px' }} />
          </div>

          {/* Box 2: Profile Picture (4 cols) */}
          {profile.profileImage && avatarShape !== 'none' && (
            <div style={{
              gridColumn: 'span 4',
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderDefault}`,
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }} className="bento-box-avatar">
              <img
                src={profile.profileImage}
                alt={profile.name}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: avatarShape === 'circle' ? '50%' : '12px',
                  border: `2px solid ${theme.borderDefault}`
                }}
              />
            </div>
          )}

          {/* Box 3: Skills (6 cols) */}
          {skills.length > 0 && (
            <div style={{
              gridColumn: 'span 6',
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderDefault}`,
              borderRadius: '16px',
              padding: '28px'
            }} className="bento-box-skills">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Code2 size={18} color={theme.accent} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                  Skills & Tools
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{
                    fontSize: '0.8125rem',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: theme.bgSubtle,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.borderLight}`,
                    fontWeight: 500
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Box 4: Education (6 cols) */}
          {education.length > 0 && (
            <div style={{
              gridColumn: skills.length > 0 ? 'span 6' : 'span 12',
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderDefault}`,
              borderRadius: '16px',
              padding: '28px'
            }} className="bento-box-edu">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <GraduationCap size={18} color={theme.accent} />
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                  Education
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {education.map((edu, i) => (
                  <div key={edu.id || i} style={{
                    borderLeft: `2px solid ${theme.accent}`,
                    paddingLeft: '14px'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: theme.textMuted }}>
                      {edu.startYear} — {edu.endYear || 'Present'}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                      {edu.degree} in {edu.branch}
                    </div>
                    <div style={{ color: theme.textSecondary, fontSize: '0.8125rem' }}>
                      {edu.college}
                    </div>
                    {edu.cgpa && (
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.accent, marginTop: '2px' }}>
                        CGPA: {edu.cgpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Box 5: Featured Projects (12 cols) */}
          {projects.length > 0 && (
            <div style={{
              gridColumn: 'span 12',
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderDefault}`,
              borderRadius: '16px',
              padding: '32px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Projects & Builds
                </h3>
                <span style={{ fontSize: '0.8125rem', color: theme.textMuted }}>
                  {projects.length} Showcased
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {projects.map((proj, i) => (
                  <div key={proj.id || i} style={{
                    backgroundColor: theme.bgSubtle,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: `1px solid ${theme.borderLight}`,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {proj.image && (
                      <img 
                        src={proj.image} 
                        alt={proj.name}
                        style={{ width: '100%', height: '170px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '8px' }}>
                        {proj.name}
                      </h4>
                      <p style={{ color: theme.textSecondary, fontSize: '0.875rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '14px' }}>
                        {proj.description}
                      </p>

                      {proj.technologies && proj.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                          {proj.technologies.map((t, idx) => (
                            <span key={idx} style={{
                              fontSize: '0.75rem',
                              backgroundColor: theme.bgCard,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              color: theme.textSecondary
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            style={{
                              fontSize: '0.8125rem',
                              fontWeight: 700,
                              color: theme.accent,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
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
                            style={{
                              fontSize: '0.8125rem',
                              color: theme.textSecondary,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Github size={13} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Box 6: Experience & Achievements (12 cols if present) */}
          {(experience.length > 0 || achievements.length > 0) && (
            <div style={{
              gridColumn: 'span 12',
              display: 'grid',
              gridTemplateColumns: experience.length > 0 && achievements.length > 0 ? '1fr 1fr' : '1fr',
              gap: '20px'
            }} className="bento-box-exp-ach">
              {experience.length > 0 && (
                <div style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  borderRadius: '16px',
                  padding: '28px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <Briefcase size={18} color={theme.accent} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                      Experience
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {experience.map((exp, i) => (
                      <div key={exp.id || i}>
                        <div style={{ fontSize: '0.75rem', color: theme.textMuted }}>
                          {exp.startDate} — {exp.endDate || 'Present'}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                          {exp.role} · <span style={{ fontWeight: 500, color: theme.textSecondary }}>{exp.organization}</span>
                        </div>
                        <p style={{ color: theme.textSecondary, fontSize: '0.8125rem', marginTop: '4px' }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {achievements.length > 0 && (
                <div style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  borderRadius: '16px',
                  padding: '28px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <Award size={18} color={theme.accent} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                      Honors & Awards
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {achievements.map((ach, i) => (
                      <div key={ach.id || i}>
                        <div style={{ fontSize: '0.75rem', color: theme.textMuted }}>
                          {ach.year}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                          {ach.title}
                        </div>
                        <div style={{ color: theme.textSecondary, fontSize: '0.8125rem' }}>
                          {ach.organization} {ach.description && `— ${ach.description}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Box 7: Social Connect Strip (12 cols) */}
          <div style={{
            gridColumn: 'span 12',
            backgroundColor: theme.bgCard,
            border: `1px solid ${theme.borderDefault}`,
            borderRadius: '16px',
            padding: '24px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '4px' }}>
                Let's Build Something Together
              </div>
              <div style={{ color: theme.textSecondary, fontSize: '0.875rem' }}>
                Connect on GitHub, LinkedIn, WhatsApp, or send an email.
              </div>
            </div>
            
            <ContactButtons links={links} theme={theme} variant="section" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* BUILTD Platform Footer */}
      <footer style={{
        marginTop: '60px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Logo variant="compact" height={20} to="/" />
          <span style={{ fontSize: '0.8125rem', color: theme.textMuted }}>
            Built with <img src="/built.png" alt="BUILTD" style={{ height: '16px', verticalAlign: 'middle', display: 'inline-block', margin: '0 4px' }} /> — Build your digital identity.
          </span>
        </div>
      </footer>

      {/* Responsive adjustments for bento grid */}
      <style>{`
        @media (max-width: 820px) {
          .bento-box-hero { grid-column: span 12 !important; }
          .bento-box-avatar { grid-column: span 12 !important; max-height: 220px; }
          .bento-box-skills { grid-column: span 12 !important; }
          .bento-box-edu { grid-column: span 12 !important; }
          .bento-box-exp-ach { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default GridTemplate;
