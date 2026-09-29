import React from 'react';
import { getThemeStyles } from './templateUtils';
import { PortfolioFooter } from '../components/common/PortfolioFooter';
import { ContactButtons } from '../components/common/ContactButtons';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Mail, 
  MapPin, 
  ExternalLink, 
  CheckCircle2 
} from 'lucide-react';
import { Github } from '../components/common/Icons';

export const ProfessionalTemplate = ({ data }) => {
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
      {/* Top Banner Accent */}
      <div style={{ height: '6px', backgroundColor: theme.accent }} />

      {/* Header */}
      <header style={{
        backgroundColor: theme.bgCard,
        borderBottom: `1px solid ${theme.borderDefault}`,
        padding: '40px 0'
      }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {profile.profileImage && avatarShape !== 'none' && (
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  style={{
                    width: 'clamp(80px, 15vw, 100px)',
                    height: 'clamp(80px, 15vw, 100px)',
                    objectFit: 'cover',
                    borderRadius: avatarShape === 'circle' ? '50%' : '8px',
                    border: `2px solid ${theme.borderDefault}`,
                    flexShrink: 0
                  }}
                />
              )}
              <div>
                <h1 style={{
                  fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  marginBottom: '6px',
                  color: theme.textPrimary,
                  ...theme.invertedTitleStyle
                }}>
                  {profile.name}
                </h1>
                <p style={{
                  fontSize: '1.125rem',
                  color: theme.accent,
                  fontWeight: 600,
                  marginBottom: '8px'
                }}>
                  {profile.headline}
                </p>
                {profile.location && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: theme.textMuted,
                    fontSize: '0.875rem'
                  }}>
                    <MapPin size={14} /> <span>{profile.location}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.accentText || '#FFFFFF',
                    padding: '10px 18px',
                    borderRadius: '6px',
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
              {links.email && (
                <a
                  href={`mailto:${links.email}`}
                  style={{
                    border: `1px solid ${theme.borderDefault}`,
                    color: theme.textPrimary,
                    padding: '10px 18px',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Mail size={15} /> Contact
                </a>
              )}
            </div>
          </div>

          {/* Social / Contact Buttons */}
          <div style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: `1px solid ${theme.borderLight}`
          }}>
            <ContactButtons links={links} theme={theme} variant="hero" />
          </div>
        </div>
      </header>

      {/* Main Two-Column Structure */}
      <div className="container" style={{ maxWidth: '1000px', padding: 'clamp(30px, 5vw, 50px) clamp(14px, 4vw, 20px) 80px clamp(14px, 4vw, 20px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '32px'
        }}>
          {/* Left Column: Bio, Experience, Education */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Professional Summary */}
            {profile.bio && (
              <section style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '8px',
                padding: '28px'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: theme.accent,
                  marginBottom: '14px'
                }}>
                  Executive Summary
                </h3>
                <p style={{ color: theme.textSecondary, fontSize: '0.9375rem', lineHeight: 1.7 }}>
                  {profile.bio}
                </p>
              </section>
            )}

            {/* Experience Timeline */}
            {experience.length > 0 && (
              <section style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '8px',
                padding: '28px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <Briefcase size={18} color={theme.accent} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                    Professional Experience
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  {experience.map((exp, i) => (
                    <div key={exp.id || i} style={{
                      position: 'relative',
                      paddingLeft: '16px',
                      borderLeft: `2px solid ${theme.borderDefault}`
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '-5px',
                        top: '4px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: theme.accent
                      }} />
                      <div style={{ fontSize: '0.75rem', color: theme.textMuted, fontWeight: 600 }}>
                        {exp.startDate} — {exp.endDate || 'Present'}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '2px' }}>
                        {exp.role}
                      </div>
                      <div style={{ color: theme.accent, fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                        {exp.organization} {exp.type && `· ${exp.type}`}
                      </div>
                      <p style={{ color: theme.textSecondary, fontSize: '0.875rem' }}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '8px',
                padding: '28px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <GraduationCap size={18} color={theme.accent} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                    Academic Credentials
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {education.map((edu, i) => (
                    <div key={edu.id || i}>
                      <div style={{ fontSize: '0.75rem', color: theme.textMuted }}>
                        {edu.startYear} — {edu.endYear || 'Present'}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                        {edu.degree} in {edu.branch}
                      </div>
                      <div style={{ color: theme.textSecondary, fontSize: '0.875rem' }}>
                        {edu.college} {edu.university && `(${edu.university})`}
                      </div>
                      {edu.cgpa && (
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: theme.accent, marginTop: '2px' }}>
                          Cumulative Performance: {edu.cgpa}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Projects, Skills, Achievements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Key Projects */}
            {projects.length > 0 && (
              <section style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '8px',
                padding: '28px'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>Technical Projects</span>
                  <span style={{ fontSize: '0.8125rem', color: theme.textMuted, fontWeight: 500 }}>
                    {projects.length} Works
                  </span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {projects.map((proj, i) => (
                    <div key={proj.id || i} style={{
                      paddingBottom: '20px',
                      borderBottom: i !== projects.length - 1 ? `1px solid ${theme.borderLight}` : 'none'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h4 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
                          {proj.name}
                        </h4>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: theme.accent }}>
                              <ExternalLink size={15} />
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a href={proj.githubUrl} target="_blank" rel="noreferrer" style={{ color: theme.textSecondary }}>
                              <Github size={15} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p style={{ color: theme.textSecondary, fontSize: '0.875rem', margin: '6px 0 10px 0' }}>
                        {proj.description}
                      </p>

                      {proj.technologies && proj.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {proj.technologies.map((t, idx) => (
                            <span key={idx} style={{
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
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Core Competencies / Skills */}
            {skills.length > 0 && (
              <section style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '8px',
                padding: '28px'
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>
                  Core Competencies & Tools
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.map((skill, i) => (
                    <span key={i} style={{
                      fontSize: '0.8125rem',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: `1px solid ${theme.borderDefault}`,
                      backgroundColor: theme.bgSubtle,
                      fontWeight: 600
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements & Certifications */}
            {(achievements.length > 0 || certifications.length > 0) && (
              <section style={{
                backgroundColor: theme.bgCard,
                border: `1px solid ${theme.borderDefault}`,
                borderRadius: '8px',
                padding: '28px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Award size={18} color={theme.accent} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                    Honors & Certifications
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {achievements.map((ach, i) => (
                    <div key={ach.id || i}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                        {ach.title}
                      </div>
                      <div style={{ color: theme.textMuted, fontSize: '0.8125rem' }}>
                        {ach.organization} ({ach.year})
                      </div>
                    </div>
                  ))}

                  {certifications.map((cert, i) => (
                    <div key={cert.id || i}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                        {cert.title}
                      </div>
                      <div style={{ color: theme.textMuted, fontSize: '0.8125rem' }}>
                        {cert.organization} ({cert.year})
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Contact & Inquiries Section */}
        <div style={{ marginTop: '50px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <Mail size={18} color={theme.accent} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              Professional Contact & Networking
            </h3>
          </div>
          <ContactButtons links={links} theme={theme} variant="section" />
        </div>
      </div>

      {/* BUILTD Platform Footer */}
      <PortfolioFooter theme={theme} profileName={profile.name} />
    </div>
  );
};

export default ProfessionalTemplate;
