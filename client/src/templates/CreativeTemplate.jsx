import React from 'react';
import { getThemeStyles } from './templateUtils';
import { PortfolioFooter } from '../components/common/PortfolioFooter';
import { ContactButtons } from '../components/common/ContactButtons';
import { 
  Terminal, 
  Code, 
  Mail, 
  ExternalLink, 
  Cpu, 
  FolderGit2, 
  GraduationCap, 
  Layers 
} from 'lucide-react';
import { Github } from '../components/common/Icons';

export const CreativeTemplate = ({ data }) => {
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
    <div style={theme.rootStyle}>
      {/* Terminal Style Navigation Header */}
      <nav style={{
        borderBottom: `1px solid ${theme.borderDefault}`,
        backgroundColor: theme.bgCard,
        padding: '16px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: theme.textSecondary,
              marginLeft: '8px',
              maxWidth: 'min(240px, 45vw)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              ~/{profile.name ? profile.name.toLowerCase().replace(/\s+/g, '_') : 'builder'}.sh
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <ContactButtons links={links} theme={theme} variant="nav" />
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  color: theme.accent,
                  border: `1px solid ${theme.accent}`,
                  padding: '4px 12px',
                  borderRadius: '4px'
                }}
              >
                cv.pdf
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="container" style={{ maxWidth: '960px', padding: 'clamp(30px, 5vw, 60px) clamp(14px, 4vw, 24px) 100px clamp(14px, 4vw, 24px)' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: theme.bgCard,
          border: `1px solid ${theme.borderDefault}`,
          borderRadius: '12px',
          padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 36px)',
          marginBottom: '50px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: theme.accent
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px'
          }}>
            <div style={{ maxWidth: '580px', flex: '1 1 300px' }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                color: theme.accent,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '14px'
              }}>
                <Terminal size={14} /> <span>console.log("Hello, World!");</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '12px',
                ...theme.invertedTitleStyle
              }}>
                {profile.name}
              </h1>

              <div style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: theme.textSecondary,
                marginBottom: '16px'
              }}>
                {profile.headline}
              </div>

              {profile.bio && (
                <p style={{
                  fontSize: '1rem',
                  color: theme.textSecondary,
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  {profile.bio}
                </p>
              )}

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {projects.length > 0 && (
                  <a
                    href="#projects"
                    style={{
                      backgroundColor: theme.accent,
                      color: '#FFFFFF',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    View Deployments →
                  </a>
                )}
              </div>

              {/* Hero Contact Buttons with App Icons */}
              <ContactButtons links={links} theme={theme} variant="hero" style={{ marginTop: '20px' }} />
            </div>

            {profile.profileImage && avatarShape !== 'none' && (
              <img
                src={profile.profileImage}
                alt={profile.name}
                style={{
                  width: 'clamp(110px, 20vw, 160px)',
                  height: 'clamp(110px, 20vw, 160px)',
                  objectFit: 'cover',
                  borderRadius: avatarShape === 'circle' ? '50%' : '12px',
                  border: `3px solid ${theme.borderDefault}`,
                  boxShadow: `0 8px 24px ${theme.accentSubtle}`
                }}
              />
            )}
          </div>
        </section>

        {/* Projects Section */}
        {projects.length > 0 && (
          <section id="projects" style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.125rem',
              fontWeight: 700,
              marginBottom: '24px'
            }}>
              <FolderGit2 size={20} color={theme.accent} />
              <span>repositories & builds</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} style={{
                  backgroundColor: theme.bgCard,
                  border: `1px solid ${theme.borderDefault}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {proj.image && (
                    <img 
                      src={proj.image} 
                      alt={proj.name}
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.1875rem', fontWeight: 700 }}>
                        {proj.name}
                      </h3>
                    </div>

                    <p style={{ color: theme.textSecondary, fontSize: '0.9375rem', marginBottom: '16px', flexGrow: 1 }}>
                      {proj.description}
                    </p>

                    {proj.learned && (
                      <div style={{
                        fontSize: '0.8125rem',
                        color: theme.accent,
                        backgroundColor: theme.accentSubtle,
                        padding: '6px 10px',
                        borderRadius: '4px',
                        marginBottom: '14px'
                      }}>
                        ⚡ {proj.learned}
                      </div>
                    )}

                    {proj.technologies && proj.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                        {proj.technologies.map((t, i) => (
                          <span key={i} style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            backgroundColor: theme.bgSubtle,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            color: theme.textSecondary
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '14px' }}>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontWeight: 700,
                            fontSize: '0.8125rem',
                            color: theme.accent,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Demo <ExternalLink size={14} />
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                            color: theme.textSecondary,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Github size={14} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.125rem',
              fontWeight: 700,
              marginBottom: '20px'
            }}>
              <Cpu size={20} color={theme.accent} />
              <span>tech stack & competencies</span>
            </div>

            <div style={{
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderDefault}`,
              borderRadius: '10px',
              padding: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {skills.map((skill, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.875rem',
                  padding: '8px 14px',
                  backgroundColor: theme.bgSubtle,
                  borderRadius: '6px',
                  border: `1px solid ${theme.borderLight}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ color: theme.accent }}>$</span> {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Experience */}
        {(education.length > 0 || experience.length > 0) && (
          <section style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.125rem',
              fontWeight: 700,
              marginBottom: '20px'
            }}>
              <Layers size={20} color={theme.accent} />
              <span>history & credentials</span>
            </div>

            <div style={{
              backgroundColor: theme.bgCard,
              border: `1px solid ${theme.borderDefault}`,
              borderRadius: '10px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {education.map((edu, i) => (
                <div key={edu.id || i} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                      {edu.degree} in {edu.branch}
                    </div>
                    <div style={{ color: theme.textSecondary, fontSize: '0.875rem' }}>
                      {edu.college} {edu.university && `(${edu.university})`}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: theme.textMuted }}>
                    [{edu.startYear} .. {edu.endYear || 'now'}]
                  </div>
                </div>
              ))}

              {experience.map((exp, i) => (
                <div key={exp.id || i} style={{
                  borderTop: `1px dashed ${theme.borderLight}`,
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                      {exp.role} @ {exp.organization}
                    </div>
                    <div style={{ color: theme.textSecondary, fontSize: '0.875rem', marginTop: '4px' }}>
                      {exp.description}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: theme.textMuted }}>
                    [{exp.startDate} .. {exp.endDate || 'now'}]
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Terminal Connection / Contact Section */}
        <section style={{ marginBottom: '60px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            color: theme.accent,
            marginBottom: '8px'
          }}>
            // CONTACT & CHANNELS
          </div>
          <h2 style={{ fontSize: 'clamp(1.15rem, 4vw, 1.4rem)', fontWeight: 800, marginBottom: '20px', wordBreak: 'break-word' }}>
            ping --destination {profile.name ? profile.name.toLowerCase().replace(/\s+/g, '_') : 'dev'}
          </h2>
          <ContactButtons links={links} theme={theme} variant="section" />
        </section>
      </main>

      {/* BUILTD Platform Brand Footer */}
      <PortfolioFooter theme={theme} profileName={profile.name} />
    </div>
  );
};

export default CreativeTemplate;
