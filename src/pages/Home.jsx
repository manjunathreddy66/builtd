import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Terminal,
  Globe,
  FolderGit2,
  GraduationCap,
  Cpu,
  Award,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { INITIAL_STUDENT_PORTFOLIOS } from '../services/initialData';

export const Home = () => {
  const sampleStudents = Object.values(INITIAL_STUDENT_PORTFOLIOS);

  const onboardingSteps = [
    { num: '01', title: 'About you', desc: 'Name, headline, bio, location & profile image' },
    { num: '02', title: 'Education', desc: 'Degree, college, university, branch & GPA' },
    { num: '03', title: 'Skills', desc: 'Languages, frameworks, design & developer tools' },
    { num: '04', title: 'Projects', desc: 'GitHub links, live deployments & key takeaways' },
    { num: '05', title: 'Experience', desc: 'Internships, college clubs & freelance leadership' },
    { num: '06', title: 'Achievements', desc: 'Hackathon wins, papers, awards & certifications' },
    { num: '07', title: 'Links', desc: 'GitHub, LinkedIn, LeetCode, Codeforces & socials' },
    { num: '08', title: 'Resume', desc: 'One-click PDF resume attachment & viewer' },
  ];

  const workflowSteps = [
    { step: '01', title: 'Create your account', desc: 'Quick signup with email or Google in seconds.' },
    { step: '02', title: 'Tell us about yourself', desc: 'Share your background, college, and engineering interests.' },
    { step: '03', title: 'Add projects & skills', desc: 'Showcase your real repositories, demos, and tech stack.' },
    { step: '04', title: 'Choose your design', desc: 'Select from 5 curated editorial & developer templates.' },
    { step: '05', title: 'Preview your portfolio', desc: 'Inspect live responsive rendering across mobile & desktop.' },
    { step: '06', title: 'Publish', desc: 'Instantly launch to your dedicated public URL.' },
    { step: '07', title: 'Share your link', desc: 'Send builtd.vercel.app/username to recruiters & peers.' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section style={{
        position: 'relative',
        padding: '70px 0 90px 0',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-default)'
      }}>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '780px' }}>
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
              marginBottom: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                backgroundColor: 'var(--brand-orange)',
                borderRadius: '50%',
                display: 'inline-block'
              }} />
              Designed by Student from SMIC
            </div>

            {/* Brand Logo: Main built.png */}
            <div style={{ marginBottom: '24px' }}>
              <Logo variant="main" height={68} withLink={false} />
            </div>

            {/* Headline */}
            <h1 className="display-title" style={{ marginBottom: '20px' }}>
              Build your digital identity.
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.125rem, 2.2vw, 1.35rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '640px'
            }}>
              Create your professional portfolio with just a few simple details.
              No HTML, no CSS, no hosting headaches. BUILTD turns your achievements into a recruiter-ready personal website.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Link
                to="/signup"
                className="btn btn-brand btn-lg"
              >
                Build My Portfolio <ArrowRight size={18} />
              </Link>
              <Link
                to="/explore"
                className="btn btn-secondary btn-lg"
              >
                Explore Portfolios
              </Link>
            </div>

            {/* Realtime Live URL Mockup Banner */}
            <div style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              marginTop: '40px',
              padding: '10px 18px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem',
              maxWidth: '100%'
            }}>
              <Globe size={16} color="var(--brand-orange)" />
              <span style={{ color: 'var(--text-secondary)' }}>Your permanent link:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                builtd.vercel.app/<span style={{ color: 'var(--brand-orange)' }}>username</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PHILOSOPHY & "WITHOUT THE CODE"
          ============================================================ */}
      <section id="how-it-works" style={{
        padding: '100px 0',
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '60px' }}>
            <div className="section-tag">Zero Overhead</div>
            <h2 className="section-title">
              Your portfolio, without the code.
            </h2>
            <p className="section-subtitle">
              Students shouldn't have to spend weeks debugging CSS flexboxes or wrestling with web servers when they should be building projects and mastering skills.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div className="card card-hover">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'var(--brand-orange-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-orange)',
                marginBottom: '20px'
              }}>
                <Terminal size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
                No Coding Required
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                No HTML, CSS, JavaScript, or React knowledge needed. Just enter your real achievements.
              </p>
            </div>

            <div className="card card-hover">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'var(--brand-orange-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-orange)',
                marginBottom: '20px'
              }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
                No Setup or Hosting
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                Zero deployment configuration. Your public portfolio is instantly hosted and live globally on BUILTd.
              </p>
            </div>

            <div className="card card-hover">
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                backgroundColor: 'var(--brand-orange-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-orange)',
                marginBottom: '20px'
              }}>
                <Layers size={22} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>
                Curated Design Standards
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                Designed by Student from SMIC with clean typography, generous whitespace, and responsive layouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BUILT FOR STUDENTS SECTION
          ============================================================ */}
      <section id="features" style={{
        padding: '100px 0',
        backgroundColor: 'var(--bg-main)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginBottom: '60px' }}>
            <div style={{ maxWidth: '640px' }}>
              <div className="section-tag">Student-Centered Architecture</div>
              <h2 className="section-title">
                Built specifically for college & engineering students.
              </h2>
              <p className="section-subtitle">
                Generic website builders are made for marketing agencies. BUILTD is engineered for the exact things technical recruiters look for.
              </p>
            </div>
            <Link to="/signup" className="btn btn-secondary">
              Start Free Today →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {[
              { icon: FolderGit2, title: 'Projects', desc: 'Live demos, GitHub repositories, architecture stacks, and key learnings.' },
              { icon: Cpu, title: 'Skills & Tools', desc: 'Selectable badges for C++, Python, React, Docker, without silly percentage bars.' },
              { icon: GraduationCap, title: 'Education', desc: 'Degree, department, university, graduation year, and cumulative GPA.' },
              { icon: Award, title: 'Hackathons', desc: 'Smart India Hackathon, MLH, Techfest wins, and project demos.' },
              { icon: ShieldCheck, title: 'Certifications', desc: 'AWS, Google Cloud, DeepLearning.AI, and verified course links.' },
              { icon: Terminal, title: 'Competitive Stats', desc: 'Dedicated badges for LeetCode, Codeforces, and CodeChef ratings.' },
              { icon: Globe, title: 'Experience', desc: 'Internships, technical college club leads, and freelance achievements.' },
              { icon: Sparkles, title: 'Resume Sync', desc: 'Direct link to download your latest PDF resume.' }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="card card-hover" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <IconComp size={24} color="var(--brand-orange)" style={{ marginBottom: '14px' }} />
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          ONE STEP AT A TIME — ONBOARDING PROCESS
          ============================================================ */}
      <section style={{
        padding: '100px 0',
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px auto' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Step-By-Step Flow</div>
            <h2 className="section-title">
              One step at a time.
            </h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0 auto' }}>
              Never stare at an intimidating blank page. Answer one simple question at a time, and watch BUILTD compose your digital portfolio.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {onboardingSteps.map((s, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--brand-orange)',
                  marginBottom: '10px'
                }}>
                  {s.num}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '6px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/signup" className="btn btn-brand btn-lg">
              Begin Step 01 →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS (7-STEP JOURNEY)
          ============================================================ */}
      <section style={{
        padding: '100px 0',
        backgroundColor: 'var(--bg-main)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '60px' }}>
            <div className="section-tag">Lifecycle</div>
            <h2 className="section-title">
              How BUILTD works.
            </h2>
            <p className="section-subtitle">
              From zero to a published, responsive portfolio in under 5 minutes.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {workflowSteps.map((ws, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '20px 24px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'transform var(--transition-fast)'
                }}
                className="card-hover"
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.125rem',
                  fontWeight: 800,
                  color: 'var(--brand-orange)',
                  width: '40px',
                  flexShrink: 0
                }}>
                  {ws.step}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                    {ws.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {ws.desc}
                  </p>
                </div>
                <ChevronRight size={18} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED STUDENT PORTFOLIOS (LIVE PROOF)
          ============================================================ */}
      <section style={{
        padding: '100px 0',
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginBottom: '50px' }}>
            <div>
              <div className="section-tag">Live Showcases</div>
              <h2 className="section-title">
                Created with BUILTD.
              </h2>
              <p className="section-subtitle">
                Explore real portfolios built by engineering students using their public URLs.
              </p>
            </div>
            <Link to="/explore" className="btn btn-secondary">
              View Student Directory →
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {sampleStudents.map((student) => (
              <div
                key={student.username}
                className="card card-hover"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                  border: '1px solid var(--border-default)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                  <img
                    src={student.profile.profileImage}
                    alt={student.profile.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--border-default)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                      {student.profile.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--brand-orange)', fontWeight: 600 }}>
                      {student.profile.headline}
                    </p>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  flexGrow: 1,
                  marginBottom: '20px'
                }}>
                  {student.profile.bio.slice(0, 130)}...
                </p>

                <div style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: '4px',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>Public link:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    /{student.username}
                  </span>
                </div>

                <Link
                  to={`/${student.username}`}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  View Public Portfolio <ExternalLink size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CALL TO ACTION SECTION
          ============================================================ */}
      <section id="about" style={{
        padding: '100px 0',
        backgroundColor: 'var(--bg-main)',
        textAlign: 'center'
      }}>
        <div className="container-narrow">
          <div style={{ display: 'inline-block', marginBottom: '24px' }}>
            <Logo variant="main" height={52} withLink={false} />
          </div>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '18px'
          }}>
            "You build your skills.<br />BUILTD builds the place where you can show them."
          </h2>

          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6
          }}>
            Zero fees. Instant public URL. Forever free for students around the world.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/signup" className="btn btn-brand btn-lg">
              Claim Your Portfolio Link →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
