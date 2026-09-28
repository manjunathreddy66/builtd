import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';
import { 
  checkUsernameAvailability, 
  normalizeUsername, 
  uploadPortfolioAsset 
} from '../services/portfolioService';
import { SUGGESTED_SKILLS } from '../services/initialData';
import { 
  HEADLINE_SUGGESTIONS, 
  BIO_SUGGESTIONS, 
  generateProjectDescriptions 
} from '../utils/autoSuggestions';
import { TemplateRenderer, TEMPLATE_OPTIONS } from '../templates/TemplateRenderer';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Upload, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Globe, 
  Laptop, 
  Smartphone, 
  Tablet, 
  Copy, 
  CheckCircle2, 
  Share2 
} from 'lucide-react';

export const Onboarding = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    portfolio, 
    updateProfile, 
    updateUsername, 
    updateSettings, 
    addProject, 
    addEducation, 
    setSkills, 
    addExperience, 
    addAchievement, 
    updateLinks, 
    setResumeUrl, 
    publishCurrentPortfolio, 
    setPortfolio 
  } = usePortfolio();

  // Step state:
  // step -1: Choose username
  // step 1..8: The 8 onboarding steps
  // step 9: Template selection & live preview
  // step 10: Celebration / Published screen
  const [currentStep, setCurrentStep] = useState(-1);

  // Username step state
  const [usernameInput, setUsernameInput] = useState(portfolio.username || '');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [availability, setAvailability] = useState({ available: false, message: '' });
  const [suggestions, setSuggestions] = useState([]);

  // Step 1: About you
  const [name, setName] = useState(portfolio.profile?.name || currentUser?.displayName || '');
  const [headline, setHeadline] = useState(portfolio.profile?.headline || '');
  const [bio, setBio] = useState(portfolio.profile?.bio || '');
  const [location, setLocation] = useState(portfolio.profile?.location || '');
  const [profileImage, setProfileImage] = useState(portfolio.profile?.profileImage || '');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Single button cycling states for auto-suggestions
  const [headlineSugIndex, setHeadlineSugIndex] = useState(0);
  const [bioSugIndex, setBioSugIndex] = useState(0);
  const [userSugIndex, setUserSugIndex] = useState(0);

  const handleCycleHeadline = () => {
    const current = HEADLINE_SUGGESTIONS[headlineSugIndex % HEADLINE_SUGGESTIONS.length];
    setHeadline(current);
    setHeadlineSugIndex((prev) => (prev + 1) % HEADLINE_SUGGESTIONS.length);
  };

  const handleCycleBio = () => {
    const current = BIO_SUGGESTIONS[bioSugIndex % BIO_SUGGESTIONS.length];
    setBio(current);
    setBioSugIndex((prev) => (prev + 1) % BIO_SUGGESTIONS.length);
  };

  // Step 2: Education
  const [educationList, setEducationList] = useState(
    portfolio.education?.length > 0 
      ? portfolio.education 
      : [{ id: 'edu-new', degree: 'B.Tech', branch: 'Computer Science and Engineering', college: '', university: '', startYear: '2023', endYear: '2027', cgpa: '' }]
  );

  // Step 3: Skills
  const [selectedSkills, setSelectedSkills] = useState(portfolio.skills || ['React', 'JavaScript', 'Python', 'Git']);
  const [customSkill, setCustomSkill] = useState('');

  // Step 4: Projects (one by one or list)
  const [projectList, setProjectList] = useState(portfolio.projects || []);
  const [currentProject, setCurrentProject] = useState({
    name: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    learned: '',
    image: ''
  });
  const [projectSuccessMsg, setProjectSuccessMsg] = useState('');

  // Step 5: Experience
  const [experienceList, setExperienceList] = useState(portfolio.experience || []);
  const [currentExp, setCurrentExp] = useState({
    type: 'Internship',
    role: '',
    organization: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // Step 6: Achievements
  const [achievementsList, setAchievementsList] = useState(portfolio.achievements || []);
  const [currentAch, setCurrentAch] = useState({
    title: '',
    organization: '',
    year: '2025',
    description: '',
    credentialUrl: ''
  });

  // Step 7: Links
  const [linksState, setLinksState] = useState({
    github: portfolio.links?.github || '',
    linkedin: portfolio.links?.linkedin || '',
    whatsapp: portfolio.links?.whatsapp || '',
    leetcode: portfolio.links?.leetcode || '',
    codechef: portfolio.links?.codechef || '',
    codeforces: portfolio.links?.codeforces || '',
    hackerrank: portfolio.links?.hackerrank || '',
    other: portfolio.links?.other || '',
    email: portfolio.links?.email || currentUser?.email || ''
  });

  // Step 8: Resume
  const [resumeLink, setResumeLink] = useState(portfolio.resumeUrl || '');

  // Step 9: Customization & Preview Device
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Real-time username check with debouncing
  useEffect(() => {
    if (!usernameInput) {
      setAvailability({ available: false, message: '' });
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true);
      const res = await checkUsernameAvailability(usernameInput, currentUser?.uid);
      if (res.available) {
        setAvailability({ available: true, message: 'This portfolio name is available.' });
        setSuggestions([]);
      } else {
        setAvailability({ available: false, message: res.reason || 'Unavailable.' });
        setSuggestions(res.suggestions || []);
      }
      setCheckingUsername(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [usernameInput, currentUser]);

  // Handle Profile Image Upload (saves as username.png)
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const username = usernameInput || portfolio.username || 'student';
      const url = await uploadPortfolioAsset(file, username, `${username}.png`);
      setProfileImage(url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Sync state helpers
  const handleSaveStep1 = () => {
    updateProfile({
      name,
      headline,
      bio,
      location,
      profileImage,
      email: currentUser?.email || ''
    });
    setCurrentStep(2);
  };

  const handleSaveStep2 = () => {
    setPortfolio(prev => ({ ...prev, education: educationList.filter(e => e.college) }));
    setCurrentStep(3);
  };

  const handleSaveStep3 = () => {
    setSkills(selectedSkills);
    setCurrentStep(4);
  };

  const handleAddProjectToState = () => {
    if (!currentProject.name) return;
    const techArray = typeof currentProject.technologies === 'string'
      ? currentProject.technologies.split(',').map(s => s.trim()).filter(Boolean)
      : currentProject.technologies;

    const newProj = {
      ...currentProject,
      id: 'proj-' + Date.now(),
      technologies: techArray
    };

    const updated = [...projectList, newProj];
    setProjectList(updated);
    addProject(newProj);
    setProjectSuccessMsg('Project added ✓');
    setCurrentProject({
      name: '',
      description: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      learned: '',
      image: ''
    });
    setTimeout(() => setProjectSuccessMsg(''), 2500);
  };

  const handleSaveStep4 = () => {
    if (currentProject.name) {
      handleAddProjectToState();
    }
    setCurrentStep(5);
  };

  const handleSaveStep5 = () => {
    if (currentExp.role && currentExp.organization) {
      const updated = [...experienceList, { ...currentExp, id: 'exp-' + Date.now() }];
      setExperienceList(updated);
      addExperience(currentExp);
    }
    setCurrentStep(6);
  };

  const handleSaveStep6 = () => {
    if (currentAch.title) {
      const updated = [...achievementsList, { ...currentAch, id: 'ach-' + Date.now() }];
      setAchievementsList(updated);
      addAchievement(currentAch);
    }
    setCurrentStep(7);
  };

  const handleSaveStep7 = () => {
    updateLinks(linksState);
    setCurrentStep(8);
  };

  const handleSaveStep8 = () => {
    setResumeUrl(resumeLink);
    setCurrentStep(9); // Go to Design & Live Preview
  };

  // Publish Flow
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishCurrentPortfolio();
      setCurrentStep(10); // Success screen
    } catch (err) {
      console.error('Publish error:', err);
    } finally {
      setIsPublishing(false);
    }
  };

  const publicUrl = `https://builtd.vercel.app/${portfolio.username || usernameInput}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      backgroundColor: 'var(--bg-main)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Onboarding Header */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)',
        padding: '16px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Logo variant="compact" height={28} to="/" />

          {/* Progress Indicator (Steps 1 to 8) */}
          {currentStep >= 1 && currentStep <= 8 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: 'var(--brand-orange)'
              }}>
                0{currentStep} / 08
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: '24px',
                      height: '4px',
                      borderRadius: '2px',
                      backgroundColor: s <= currentStep ? 'var(--brand-orange)' : 'var(--border-default)',
                      transition: 'background-color 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            {currentStep === -1 && 'Step 0: Identity'}
            {currentStep >= 1 && currentStep <= 8 && 'Building Portfolio'}
            {currentStep === 9 && 'Design & Preview'}
            {currentStep === 10 && 'Live'}
          </div>
        </div>
      </div>

      {/* Main Flow Area */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div 
          className="onboarding-card"
          style={{
            width: '100%',
            maxWidth: currentStep === 9 ? '1140px' : '620px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: currentStep === 9 ? '32px 24px' : '44px 36px',
            boxShadow: 'var(--shadow-sm)',
            transition: 'max-width 0.3s ease'
          }}
        >

          {/* ============================================================
              STEP -1: CHOOSE YOUR PORTFOLIO NAME
              ============================================================ */}
          {currentStep === -1 && (
            <div>
              <div className="section-tag">First Step</div>
              <h1 style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '10px'
              }}>
                Choose your portfolio name.
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '28px' }}>
                This will become your permanent public portfolio link.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="username"
                    type="text"
                    className="form-input"
                    placeholder="arjun"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(normalizeUsername(e.target.value))}
                    autoFocus
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.125rem',
                      paddingRight: '40px'
                    }}
                  />
                  {checkingUsername && (
                    <div style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      Checking...
                    </div>
                  )}
                </div>

                {/* Live Link Preview */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '10px',
                  padding: '10px 14px',
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem'
                }}>
                  <Globe size={15} color="var(--brand-orange)" />
                  <span style={{ color: 'var(--text-secondary)' }}>Live preview:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                    builtd.vercel.app/{usernameInput || 'username'}
                  </span>
                </div>

                {/* Real-time Status */}
                {usernameInput && !checkingUsername && (
                  <div style={{ marginTop: '12px' }}>
                    {availability.available ? (
                      <div style={{ color: '#16A34A', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Check size={16} /> ✓ This portfolio name is available.
                      </div>
                    ) : (
                      <div>
                        <div style={{ color: '#DC2626', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <X size={16} /> ✕ {availability.message}
                        </div>
                        {suggestions.length > 0 && (
                          <div style={{ marginTop: '8px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const next = suggestions[userSugIndex % suggestions.length];
                                setUsernameInput(next);
                                setUserSugIndex((prev) => (prev + 1) % suggestions.length);
                              }}
                              className="btn btn-secondary"
                              style={{ 
                                fontSize: '0.8125rem', 
                                padding: '6px 12px', 
                                borderRadius: 'var(--radius-full)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Sparkles size={12} color="var(--brand-orange)" />
                              <span>Suggestion: <strong style={{ color: 'var(--brand-orange)', fontFamily: 'var(--font-mono)' }}>{suggestions[userSugIndex % suggestions.length]}</strong> (Click to change)</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={!availability.available || checkingUsername}
                onClick={() => {
                  updateUsername(usernameInput);
                  setCurrentStep(1);
                }}
                className="btn btn-brand"
                style={{ width: '100%', marginTop: '24px', padding: '14px' }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ============================================================
              STEP 01: TELL US ABOUT YOURSELF
              ============================================================ */}
          {currentStep === 1 && (
            <div>
              <div className="section-tag">Step 01 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                Tell us about yourself.
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                Basic details that give recruiters an instant picture of who you are.
              </p>

              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className="form-input"
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <label className="form-label" htmlFor="headline" style={{ marginBottom: 0 }}>Professional Headline</label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <Sparkles size={12} /> Auto-suggestions:
                  </span>
                </div>
                <input
                  id="headline"
                  type="text"
                  className="form-input"
                  placeholder="Computer Science Student & Full-Stack Developer"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required
                />
                <div style={{ marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={handleCycleHeadline}
                    className="btn btn-secondary"
                    style={{
                      fontSize: '0.8125rem',
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--bg-subtle)'
                    }}
                  >
                    <Sparkles size={13} color="var(--brand-orange)" />
                    <span>Auto-Suggest: <strong>"{HEADLINE_SUGGESTIONS[headlineSugIndex % HEADLINE_SUGGESTIONS.length]}"</strong> (Click to change)</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bio">Short Bio</label>
                <textarea
                  id="bio"
                  className="form-input form-textarea"
                  placeholder="Engineering student interested in web development and building useful digital products."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ minHeight: '80px' }}
                />
                <div style={{ marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={handleCycleBio}
                    className="btn btn-secondary"
                    style={{
                      fontSize: '0.8125rem',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'var(--bg-subtle)',
                      textAlign: 'left'
                    }}
                  >
                    <Sparkles size={13} color="var(--brand-orange)" />
                    <span>Auto-Suggest: <strong>"{BIO_SUGGESTIONS[bioSugIndex % BIO_SUGGESTIONS.length].slice(0, 55)}..."</strong> (Click to change)</span>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  className="form-input"
                  placeholder="Hyderabad, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Profile Image Upload */}
              <div className="form-group">
                <label className="form-label">Profile Picture (Optional)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Avatar" 
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-main)',
                      border: '1px dashed var(--border-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-muted)'
                    }}>
                      <Upload size={20} />
                    </div>
                  )}

                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProfileImageUpload} 
                      style={{ display: 'none' }} 
                    />
                    {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  </label>
                </div>
                <span className="form-hint" style={{ marginTop: '6px' }}>
                  Saved as {usernameInput || 'username'}.png
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button
                  type="button"
                  onClick={() => setCurrentStep(-1)}
                  className="btn btn-ghost"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  disabled={!name.trim()}
                  onClick={handleSaveStep1}
                  className="btn btn-brand"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 02: EDUCATION
              ============================================================ */}
          {currentStep === 2 && (
            <div>
              <div className="section-tag">Step 02 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                Where are you studying?
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                Your current or past college and academic focus.
              </p>

              {educationList.map((edu, index) => (
                <div key={edu.id || index} style={{
                  padding: '20px',
                  backgroundColor: 'var(--bg-main)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '20px',
                  border: '1px solid var(--border-default)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Education #{index + 1}
                    </span>
                    {educationList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setEducationList(educationList.filter((_, i) => i !== index))}
                        style={{ color: '#DC2626' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="B.Tech / B.E. / B.Sc"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index].degree = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Branch / Major</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Computer Science & Engineering"
                        value={edu.branch}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index].branch = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">College / Institute</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="XYZ Engineering College"
                      value={edu.college}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[index].college = e.target.value;
                        setEducationList(updated);
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Start Year</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="2023"
                        value={edu.startYear}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index].startYear = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Year</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="2027"
                        value={edu.endYear}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index].endYear = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CGPA / %</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="9.0 / 10"
                        value={edu.cgpa}
                        onChange={(e) => {
                          const updated = [...educationList];
                          updated[index].cgpa = e.target.value;
                          setEducationList(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setEducationList([...educationList, { id: 'edu-' + Date.now(), degree: 'B.Tech', branch: '', college: '', university: '', startYear: '2023', endYear: '2027', cgpa: '' }])}
                className="btn btn-secondary btn-sm"
                style={{ marginBottom: '24px' }}
              >
                <Plus size={15} /> Add another education
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button type="button" onClick={() => setCurrentStep(1)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" onClick={handleSaveStep2} className="btn btn-brand">
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 03: SKILLS
              ============================================================ */}
          {currentStep === 3 && (
            <div>
              <div className="section-tag">Step 03 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                What can you build with?
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                Select the tools, languages, and technologies you know. No fake percentage ratings!
              </p>

              {Object.entries(SUGGESTED_SKILLS).map(([category, items]) => (
                <div key={category} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {items.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedSkills(selectedSkills.filter(s => s !== skill));
                            } else {
                              setSelectedSkills([...selectedSkills, skill]);
                            }
                          }}
                          className={`chip ${isSelected ? 'active' : ''}`}
                        >
                          {isSelected && <Check size={14} />} {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Add Custom Skill */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add custom skill (e.g. PyTorch, Rust, Solidity)"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
                        setSelectedSkills([...selectedSkills, customSkill.trim()]);
                        setCustomSkill('');
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
                      setSelectedSkills([...selectedSkills, customSkill.trim()]);
                      setCustomSkill('');
                    }
                  }}
                  className="btn btn-secondary"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button type="button" onClick={() => setCurrentStep(2)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" onClick={handleSaveStep3} className="btn btn-brand">
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 04: PROJECTS
              ============================================================ */}
          {currentStep === 4 && (
            <div>
              <div className="section-tag">Step 04 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                What have you built?
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                Your projects show what you can do. Add one project at a time.
              </p>

              {projectSuccessMsg && (
                <div style={{
                  padding: '10px 14px',
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #4ADE80',
                  borderRadius: 'var(--radius-sm)',
                  color: '#15803D',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '18px'
                }}>
                  {projectSuccessMsg}
                </div>
              )}

              {/* Previously Added Projects List */}
              {projectList.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                    ADDED PROJECTS ({projectList.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {projectList.map((p, idx) => (
                      <div key={p.id || idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem'
                      }}>
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                        <button
                          type="button"
                          onClick={() => setProjectList(projectList.filter((_, i) => i !== idx))}
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Project Form */}
              <div style={{
                padding: '20px',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '20px'
              }}>
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="DevSync — Collaborative Code Editor"
                    value={currentProject.name}
                    onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>Short Description</label>
                    <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                      <Sparkles size={12} /> Auto-suggests based on project:
                    </span>
                  </div>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Briefly describe what this project does and the problem it solves."
                    value={currentProject.description}
                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                    style={{ minHeight: '75px' }}
                  />

                  {/* Auto-suggested descriptions based on project name & tech */}
                  <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {generateProjectDescriptions(currentProject.name, currentProject.technologies).map((desc, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentProject({ ...currentProject, description: desc })}
                        style={{
                          textAlign: 'left',
                          fontSize: '0.8125rem',
                          padding: '7px 12px',
                          backgroundColor: 'var(--bg-card)',
                          border: '1px solid var(--border-default)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          lineHeight: 1.4
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--brand-orange)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                      >
                        ⚡ "{desc}"
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Technologies (comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="React, Node.js, WebSockets, Tailwind CSS"
                    value={currentProject.technologies}
                    onChange={(e) => setCurrentProject({ ...currentProject, technologies: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">GitHub URL (Optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://github.com/..."
                      value={currentProject.githubUrl}
                      onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Live Demo URL (Optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://myproject.vercel.app"
                      value={currentProject.liveUrl}
                      onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddProjectToState}
                  disabled={!currentProject.name.trim()}
                  className="btn btn-secondary"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  <Plus size={16} /> Save & Add Another Project
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button type="button" onClick={() => setCurrentStep(3)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" onClick={handleSaveStep4} className="btn btn-brand">
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 05: EXPERIENCE
              ============================================================ */}
          {currentStep === 5 && (
            <div>
              <div className="section-tag">Step 05 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                Have you gained any experience?
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                Internships, college clubs, freelancing, or part-time technical work.
              </p>

              <div className="form-group">
                <label className="form-label">Experience Type</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Internship', 'College Club', 'Freelancing', 'Volunteer Work', 'Part-time', 'Other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setCurrentExp({ ...currentExp, type })}
                      className={`chip ${currentExp.type === type ? 'active' : ''}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Frontend Intern / Club Lead"
                    value={currentExp.role}
                    onChange={(e) => setCurrentExp({ ...currentExp, role: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Organization / Company</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Acme Tech / ACM Chapter"
                    value={currentExp.organization}
                    onChange={(e) => setCurrentExp({ ...currentExp, organization: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="June 2024"
                    value={currentExp.startDate}
                    onChange={(e) => setCurrentExp({ ...currentExp, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="August 2024 / Present"
                    value={currentExp.endDate}
                    onChange={(e) => setCurrentExp({ ...currentExp, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Key contributions and achievements during this role."
                  value={currentExp.description}
                  onChange={(e) => setCurrentExp({ ...currentExp, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button type="button" onClick={() => setCurrentStep(4)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setCurrentStep(6)} className="btn btn-secondary">
                    Skip for now
                  </button>
                  <button type="button" onClick={handleSaveStep5} className="btn btn-brand">
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 06: ACHIEVEMENTS
              ============================================================ */}
          {currentStep === 6 && (
            <div>
              <div className="section-tag">Step 06 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                What have you achieved?
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                Hackathons, certifications, competitions, awards, or scholarships.
              </p>

              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Winner — Smart India Hackathon"
                  value={currentAch.title}
                  onChange={(e) => setCurrentAch({ ...currentAch, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Organization / Issuer</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ministry of Education / Google"
                    value={currentAch.organization}
                    onChange={(e) => setCurrentAch({ ...currentAch, organization: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="2025"
                    value={currentAch.year}
                    onChange={(e) => setCurrentAch({ ...currentAch, year: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Built an automated telemetry drone for disaster mapping."
                  value={currentAch.description}
                  onChange={(e) => setCurrentAch({ ...currentAch, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button type="button" onClick={() => setCurrentStep(5)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setCurrentStep(7)} className="btn btn-secondary">
                    Skip for now
                  </button>
                  <button type="button" onClick={handleSaveStep6} className="btn btn-brand">
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 07: SOCIAL & PROFESSIONAL LINKS
              ============================================================ */}
          {currentStep === 7 && (
            <div>
              <div className="section-tag">Step 07 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                Where can people find you?
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                GitHub and LinkedIn are recommended so recruiters can reach you easily.
              </p>

              <div className="form-group">
                <label className="form-label">GitHub</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://github.com/username"
                  value={linksState.github}
                  onChange={(e) => setLinksState({ ...linksState, github: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">LinkedIn</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://linkedin.com/in/username"
                  value={linksState.linkedin}
                  onChange={(e) => setLinksState({ ...linksState, linkedin: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">WhatsApp or Phone (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="+91 9876543210"
                    value={linksState.whatsapp}
                    onChange={(e) => setLinksState({ ...linksState, whatsapp: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="student@example.com"
                    value={linksState.email}
                    onChange={(e) => setLinksState({ ...linksState, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">LeetCode</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://leetcode.com/u/..."
                    value={linksState.leetcode}
                    onChange={(e) => setLinksState({ ...linksState, leetcode: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Codeforces / CodeChef</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://codeforces.com/profile/..."
                    value={linksState.codeforces}
                    onChange={(e) => setLinksState({ ...linksState, codeforces: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button type="button" onClick={() => setCurrentStep(6)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="button" onClick={handleSaveStep7} className="btn btn-brand">
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 08: RESUME
              ============================================================ */}
          {currentStep === 8 && (
            <div>
              <div className="section-tag">Step 08 of 08</div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
                Do you already have a resume?
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '24px' }}>
                You can attach your PDF resume link or Google Drive link so recruiters can download it.
              </p>

              <div className="form-group">
                <label className="form-label">Resume Link / URL (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://example.com/my-resume.pdf"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                />
                <span className="form-hint">
                  Provide a direct link to your PDF or Google Drive resume (ensure permissions are set to Anyone with link).
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button type="button" onClick={() => setCurrentStep(7)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setCurrentStep(9)} className="btn btn-secondary">
                    Skip for now
                  </button>
                  <button type="button" onClick={handleSaveStep8} className="btn btn-brand">
                    Choose Look →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 09: TEMPLATE SELECTION & LIVE PREVIEW
              ============================================================ */}
          {currentStep === 9 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <div className="section-tag">Design & Appearance</div>
                  <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>
                    Choose your look.
                  </h1>
                </div>

                {/* Device Selector */}
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  backgroundColor: 'var(--bg-main)',
                  padding: '4px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`btn btn-sm ${previewDevice === 'desktop' ? 'btn-secondary' : 'btn-ghost'}`}
                    title="Desktop Preview"
                  >
                    <Laptop size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('tablet')}
                    className={`btn btn-sm ${previewDevice === 'tablet' ? 'btn-secondary' : 'btn-ghost'}`}
                    title="Tablet Preview"
                  >
                    <Tablet size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`btn btn-sm ${previewDevice === 'mobile' ? 'btn-secondary' : 'btn-ghost'}`}
                    title="Mobile Preview"
                  >
                    <Smartphone size={16} />
                  </button>
                </div>
              </div>

              {/* Template Choice Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '24px'
              }}>
                {TEMPLATE_OPTIONS.map((t) => {
                  const isSelected = (portfolio.settings?.template || 'editorial') === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => updateSettings({ template: t.id })}
                      style={{
                        padding: '14px',
                        border: isSelected ? '2px solid var(--brand-orange)' : '1px solid var(--border-default)',
                        backgroundColor: isSelected ? 'var(--brand-orange-light)' : 'var(--bg-main)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.name}</span>
                        {isSelected && <Check size={16} color="var(--brand-orange)" />}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {t.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Theme & Accent Pickers */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '28px'
              }}>

                <div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, marginRight: '10px' }}>Accent:</span>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    {[
                      { id: 'orange', color: '#F25C22' },
                      { id: 'blue', color: '#2563EB' },
                      { id: 'purple', color: '#7C3AED' },
                      { id: 'green', color: '#059669' },
                      { id: 'red', color: '#DC2626' }
                    ].map((acc) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => updateSettings({ accent: acc.id })}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: acc.color,
                          border: (portfolio.settings?.accent || 'orange') === acc.id ? '2px solid #111111' : 'none',
                          transform: (portfolio.settings?.accent || 'orange') === acc.id ? 'scale(1.2)' : 'none',
                          cursor: 'pointer'
                        }}
                        title={acc.id}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, marginRight: '10px' }}>Text Inversion:</span>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => updateSettings({ textInversion: false })}
                      className={`chip ${!portfolio.settings?.textInversion ? 'active' : ''}`}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSettings({ textInversion: true })}
                      className={`chip ${portfolio.settings?.textInversion ? 'active' : ''}`}
                    >
                      Inverted Title
                    </button>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, marginRight: '10px' }}>Background Design:</span>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    {[
                      { id: 'dots', label: 'Subtle Dots' },
                      { id: 'grid', label: 'Minimal Grid' },
                      { id: 'clean', label: 'Clean Solid' },
                      { id: 'soft', label: 'Soft Glow' }
                    ].map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => updateSettings({ bgPattern: bg.id })}
                        className={`chip ${(portfolio.settings?.bgPattern || 'dots') === bg.id ? 'active' : ''}`}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Interactive Preview Container */}
              <div style={{
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#EEEEEC',
                padding: '20px',
                marginBottom: '28px'
              }}>
                <TemplateRenderer
                  data={portfolio}
                  device={previewDevice}
                  isPreview={true}
                />
              </div>

              {/* Bottom Publishing Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button type="button" onClick={() => setCurrentStep(8)} className="btn btn-ghost">
                  <ArrowLeft size={16} /> Back to questions
                </button>
                <button
                  type="button"
                  disabled={isPublishing}
                  onClick={handlePublish}
                  className="btn btn-brand btn-lg"
                >
                  <Sparkles size={18} /> {isPublishing ? 'Publishing...' : 'Publish Portfolio'}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================
              STEP 10: CELEBRATION & LIVE LAUNCH SCREEN
              ============================================================ */}
          {currentStep === 10 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ marginBottom: '24px' }}>
                <Logo variant="main" height={60} withLink={false} />
              </div>

              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-orange-light)',
                color: 'var(--brand-orange)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Sparkles size={32} />
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: '10px'
              }}>
                Your portfolio is live.
              </h1>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', marginBottom: '28px' }}>
                Recruiters, mentors, and peers can now discover your digital identity.
              </p>

              {/* Link Banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-default)',
                padding: '14px 20px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '32px',
                maxWidth: '480px',
                margin: '0 auto 32px auto'
              }}>
                <Globe size={18} color="var(--brand-orange)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
                  {publicUrl}
                </span>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="btn btn-ghost btn-sm"
                  title="Copy link"
                >
                  {copiedLink ? <CheckCircle2 size={16} color="#16A34A" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <a
                  href={`/${portfolio.username || usernameInput}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-brand"
                >
                  View Live Portfolio <ExternalLink size={16} />
                </a>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="btn btn-secondary"
                >
                  <Share2 size={16} /> {copiedLink ? 'Link Copied!' : 'Copy Link'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-ghost"
                >
                  Go to Dashboard →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Onboarding;
