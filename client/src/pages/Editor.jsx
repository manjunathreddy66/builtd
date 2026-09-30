import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { TemplateRenderer, TEMPLATE_OPTIONS } from '../templates/TemplateRenderer';
import { SUGGESTED_SKILLS } from '../services/initialData';
import { uploadPortfolioAsset } from '../services/portfolioService';
import { CustomUiColorPicker } from '../components/common/CustomUiColorPicker';
import { 
  HEADLINE_SUGGESTIONS, 
  BIO_SUGGESTIONS, 
  generateProjectDescriptions 
} from '../utils/autoSuggestions';
import { 
  Save, 
  Eye, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Upload, 
  Check, 
  ArrowLeft,
  Laptop,
  Tablet,
  Smartphone,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const Editor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const { 
    portfolio, 
    updateProfile, 
    updateSettings, 
    saveCurrentPortfolio, 
    publishCurrentPortfolio,
    setPortfolio,
    isSaving,
    lastSaved
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [saveToast, setSaveToast] = useState(null);

  // Form local states initialized from portfolio
  const [name, setName] = useState(portfolio.profile?.name || '');
  const [headline, setHeadline] = useState(portfolio.profile?.headline || '');
  const [bio, setBio] = useState(portfolio.profile?.bio || '');
  const [location, setLocation] = useState(portfolio.profile?.location || '');
  const [profileImage, setProfileImage] = useState(portfolio.profile?.profileImage || '');

  // Single button cycling states for auto-suggestions
  const [headlineSugIndex, setHeadlineSugIndex] = useState(0);
  const [bioSugIndex, setBioSugIndex] = useState(0);

  const handleCycleHeadline = () => {
    const current = HEADLINE_SUGGESTIONS[headlineSugIndex % HEADLINE_SUGGESTIONS.length];
    setHeadline(current);
    updateProfile({ headline: current });
    setHeadlineSugIndex((prev) => (prev + 1) % HEADLINE_SUGGESTIONS.length);
  };

  const handleCycleBio = () => {
    const current = BIO_SUGGESTIONS[bioSugIndex % BIO_SUGGESTIONS.length];
    setBio(current);
    updateProfile({ bio: current });
    setBioSugIndex((prev) => (prev + 1) % BIO_SUGGESTIONS.length);
  };

  // Skills
  const [selectedSkills, setSelectedSkills] = useState(portfolio.skills || []);
  const [customSkill, setCustomSkill] = useState('');

  // Projects
  const [projectsList, setProjectsList] = useState(portfolio.projects || []);
  const [newProject, setNewProject] = useState({ name: '', description: '', technologies: '', githubUrl: '', liveUrl: '', learned: '', image: '' });

  // Education
  const [educationList, setEducationList] = useState(portfolio.education || []);
  const [newEducation, setNewEducation] = useState({ degree: 'B.Tech', branch: '', college: '', university: '', startYear: '2023', endYear: '2027', cgpa: '' });

  // Experience
  const [experienceList, setExperienceList] = useState(portfolio.experience || []);
  const [newExperience, setNewExperience] = useState({ type: 'Internship', role: '', organization: '', startDate: '', endDate: 'Present', description: '' });

  // Achievements
  const [achievementsList, setAchievementsList] = useState(portfolio.achievements || []);
  const [newAchievement, setNewAchievement] = useState({ title: '', organization: '', year: new Date().getFullYear().toString(), description: '' });

  // Links
  const [links, setLinks] = useState(portfolio.links || {});
  const [resumeUrl, setResumeUrl] = useState(portfolio.resumeUrl || '');

  // Synchronize form states whenever portfolio is loaded or updated (eliminates blank previous data bug)
  useEffect(() => {
    if (portfolio) {
      if (portfolio.profile) {
        setName(portfolio.profile.name || '');
        setHeadline(portfolio.profile.headline || '');
        setBio(portfolio.profile.bio || '');
        setLocation(portfolio.profile.location || '');
        setProfileImage(portfolio.profile.profileImage || '');
      }
      if (Array.isArray(portfolio.skills)) setSelectedSkills(portfolio.skills);
      if (Array.isArray(portfolio.projects)) setProjectsList(portfolio.projects);
      if (Array.isArray(portfolio.education)) setEducationList(portfolio.education);
      if (Array.isArray(portfolio.experience)) setExperienceList(portfolio.experience);
      if (Array.isArray(portfolio.achievements)) setAchievementsList(portfolio.achievements);
      if (portfolio.links) setLinks(portfolio.links);
      if (portfolio.resumeUrl !== undefined) setResumeUrl(portfolio.resumeUrl || '');
    }
  }, [
    portfolio?.uid, 
    portfolio?.username, 
    portfolio?.updatedAt,
    portfolio?.profile?.name,
    portfolio?.profile?.headline,
    portfolio?.profile?.bio,
    portfolio?.profile?.location,
    portfolio?.profile?.profileImage
  ]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  // Synchronize on save without wiping out previous data
  const handleSaveAll = async () => {
    const updated = {
      ...portfolio,
      profile: {
        ...portfolio.profile,
        name: name.trim() || portfolio.profile?.name || '',
        headline: headline.trim() || portfolio.profile?.headline || '',
        bio: bio !== undefined ? bio : (portfolio.profile?.bio || ''),
        location: location.trim() || portfolio.profile?.location || '',
        profileImage: profileImage || portfolio.profile?.profileImage || ''
      },
      skills: selectedSkills,
      projects: projectsList,
      education: educationList,
      experience: experienceList,
      achievements: achievementsList,
      links: {
        ...(portfolio.links || {}),
        ...links
      },
      resumeUrl: resumeUrl !== undefined ? resumeUrl : (portfolio.resumeUrl || '')
    };

    try {
      const res = await saveCurrentPortfolio(updated);
      if (res && res.success) {
        setSaveToast({ type: 'success', message: 'Changes saved successfully.' });
      } else {
        setSaveToast({ type: 'error', message: res?.error || 'Failed to save changes.' });
      }
    } catch (err) {
      setSaveToast({ type: 'error', message: err.message || 'Error saving changes.' });
    }
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadPortfolioAsset(file, portfolio.username || 'student', `${portfolio.username || 'student'}.png`);
    setProfileImage(url);
    updateProfile({ profileImage: url });
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', backgroundColor: 'var(--bg-main)' }}>
      {/* Editor Sub-header Bar */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-default)',
        padding: '12px 0',
        position: 'sticky',
        top: '70px',
        zIndex: 90
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/dashboard" className="btn btn-ghost btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={15} /> Dashboard
            </Link>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
              Portfolio Editor
            </span>
            {lastSaved && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Saved {new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Live Preview Toggle */}
            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Eye size={15} /> {showLivePreview ? 'Hide Live Preview' : 'Show Live Preview'}
            </button>

            {/* Save Button */}
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="btn btn-brand btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Save size={15} /> {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {saveToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: saveToast.type === 'error' ? '#9F1239' : '#111111',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 1000,
          animation: 'authAlertFadeIn 0.2s ease-out'
        }}>
          {saveToast.type === 'error' ? (
            <AlertCircle size={17} color="#FECDD3" />
          ) : (
            <Check size={17} color="var(--brand-orange)" />
          )}
          <span>{saveToast.message}</span>
        </div>
      )}

      {/* Editor Content Layout */}
      <div className="container" style={{ padding: '30px 20px 80px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: showLivePreview ? '1fr 1.15fr' : '1fr',
          gap: '30px',
          alignItems: 'flex-start'
        }} className="editor-grid">

          {/* Left Column: Form Controls */}
          <div className="editor-form-col" style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '28px'
          }}>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '6px',
              borderBottom: '1px solid var(--border-default)',
              paddingBottom: '12px',
              marginBottom: '24px'
            }}>
              {[
                { id: 'profile', label: 'About' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'education', label: 'Education' },
                { id: 'experience', label: 'Experience' },
                { id: 'achievements', label: 'Awards' },
                { id: 'links', label: 'Links & Resume' },
                { id: 'appearance', label: 'Look' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id);
                    setSearchParams({ tab: t.id });
                  }}
                  className={`chip ${activeTab === t.id ? 'active' : ''}`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>About You</h3>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      updateProfile({ name: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Professional Headline</label>
                  <input
                    type="text"
                    className="form-input"
                    value={headline}
                    onChange={(e) => {
                      setHeadline(e.target.value);
                      updateProfile({ headline: e.target.value });
                    }}
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
                  <label className="form-label">Short Bio</label>
                  <textarea
                    className="form-input form-textarea"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                      updateProfile({ bio: e.target.value });
                    }}
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
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      updateProfile({ location: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Profile Image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {profileImage && (
                      <img src={profileImage} alt="Profile" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                    )}
                    <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                      <input type="file" accept="image/*" onChange={handleProfileImageUpload} style={{ display: 'none' }} />
                      <Upload size={14} /> Upload New Picture
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Projects</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {projectsList.map((p, idx) => (
                    <div key={p.id || idx} style={{
                      padding: '14px',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{p.name}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                          {Array.isArray(p.technologies) ? p.technologies.join(', ') : (p.technologies || '')}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const updated = projectsList.filter((_, i) => i !== idx);
                          setProjectsList(updated);
                          setPortfolio(prev => ({ ...prev, projects: updated }));
                        }}
                        style={{ color: '#DC2626' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '16px', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '12px' }}>+ Add New Project</div>
                  <div className="form-group">
                    <label className="form-label">Project Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label className="form-label" style={{ marginBottom: 0 }}>Description</label>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-orange)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <Sparkles size={12} /> Auto-suggests based on project:
                      </span>
                    </div>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Briefly describe what this project does and the problem it solves."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      style={{ minHeight: '75px' }}
                    />
                    <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {generateProjectDescriptions(newProject.name, newProject.technologies).map((desc, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewProject({ ...newProject, description: desc })}
                          style={{
                            textAlign: 'left',
                            fontSize: '0.8125rem',
                            padding: '7px 12px',
                            backgroundColor: 'var(--bg-main)',
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
                      placeholder="React, Node.js, PostgreSQL"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">GitHub URL (Optional)</label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://github.com/..."
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Live Demo URL (Optional)</label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://myproject.app"
                        value={newProject.liveUrl}
                        onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!newProject.name) return;
                      const techArr = typeof newProject.technologies === 'string'
                        ? newProject.technologies.split(',').map(s => s.trim()).filter(Boolean)
                        : newProject.technologies;
                      const added = [...projectsList, { ...newProject, id: 'proj-' + Date.now(), technologies: techArr }];
                      setProjectsList(added);
                      setPortfolio(prev => ({ ...prev, projects: added }));
                      setNewProject({ name: '', description: '', technologies: '', githubUrl: '', liveUrl: '', learned: '', image: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                  >
                    <Plus size={15} /> Add to Portfolio
                  </button>
                </div>
              </div>
            )}

            {/* TAB: SKILLS */}
            {activeTab === 'skills' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Skills & Tools</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {selectedSkills.map((s, i) => (
                    <span key={i} className="chip active">
                      {s}{' '}
                      <button
                        onClick={() => {
                          const updated = selectedSkills.filter((_, idx) => idx !== i);
                          setSelectedSkills(updated);
                          setPortfolio(prev => ({ ...prev, skills: updated }));
                        }}
                        style={{ marginLeft: '4px' }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Add custom skill"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
                        const updated = [...selectedSkills, customSkill.trim()];
                        setSelectedSkills(updated);
                        setPortfolio(prev => ({ ...prev, skills: updated }));
                        setCustomSkill('');
                      }
                    }}
                    className="btn btn-secondary"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* TAB: EDUCATION */}
            {activeTab === 'education' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Education & Academics</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  {educationList.map((edu, idx) => (
                    <div key={edu.id || idx} style={{
                      padding: '16px',
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>
                          {edu.degree} {edu.branch ? `— ${edu.branch}` : ''}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {edu.college} {edu.university ? `(${edu.university})` : ''}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          {edu.startYear} — {edu.endYear || 'Present'} {edu.cgpa ? `• CGPA: ${edu.cgpa}` : ''}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = educationList.filter((_, i) => i !== idx);
                          setEducationList(updated);
                          setPortfolio(prev => ({ ...prev, education: updated }));
                        }}
                        style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Delete education"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {educationList.length === 0 && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '12px 0' }}>
                      No education added yet. Add your current college or degree below.
                    </div>
                  )}
                </div>

                <div style={{ padding: '18px', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '14px' }}>+ Add Education</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="B.Tech / B.E. / B.Sc"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Branch / Major</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Computer Science"
                        value={newEducation.branch}
                        onChange={(e) => setNewEducation({ ...newEducation, branch: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">College / Institute</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="University or College Name"
                      value={newEducation.college}
                      onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Start Year</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="2023"
                        value={newEducation.startYear}
                        onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Year</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="2027 / Present"
                        value={newEducation.endYear}
                        onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CGPA / % (Optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="8.5 / 10"
                        value={newEducation.cgpa}
                        onChange={(e) => setNewEducation({ ...newEducation, cgpa: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!newEducation.college && !newEducation.degree) return;
                      const added = [...educationList, { ...newEducation, id: 'edu-' + Date.now() }];
                      setEducationList(added);
                      setPortfolio(prev => ({ ...prev, education: added }));
                      setNewEducation({ degree: 'B.Tech', branch: '', college: '', university: '', startYear: '2023', endYear: '2027', cgpa: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '6px' }}
                  >
                    <Plus size={15} /> Add to Education
                  </button>
                </div>
              </div>
            )}

            {/* TAB: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Experience & Leadership</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  {experienceList.map((exp, idx) => (
                    <div key={exp.id || idx} style={{
                      padding: '16px',
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{exp.role}</span>
                          {exp.type && <span className="chip" style={{ fontSize: '0.6875rem', padding: '2px 8px' }}>{exp.type}</span>}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {exp.organization} • {exp.startDate || '2024'} — {exp.endDate || 'Present'}
                        </div>
                        {exp.description && (
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                            {exp.description}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = experienceList.filter((_, i) => i !== idx);
                          setExperienceList(updated);
                          setPortfolio(prev => ({ ...prev, experience: updated }));
                        }}
                        style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Delete experience"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {experienceList.length === 0 && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '12px 0' }}>
                      No experience listed. Add internships, clubs, freelancing, or roles below.
                    </div>
                  )}
                </div>

                <div style={{ padding: '18px', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '14px' }}>+ Add Experience</div>
                  
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['Internship', 'College Club', 'Freelancing', 'Volunteer', 'Part-time', 'Full-time'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setNewExperience({ ...newExperience, type: t })}
                          className={`chip ${newExperience.type === t ? 'active' : ''}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Role / Title</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Frontend Intern / Club Lead"
                        value={newExperience.role}
                        onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company / Organization</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Acme Tech / IEEE Student Branch"
                        value={newExperience.organization}
                        onChange={(e) => setNewExperience({ ...newExperience, organization: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="May 2024"
                        value={newExperience.startDate}
                        onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Aug 2024 / Present"
                        value={newExperience.endDate}
                        onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Briefly describe what you built, learned, or led."
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      style={{ minHeight: '65px' }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!newExperience.role && !newExperience.organization) return;
                      const added = [...experienceList, { ...newExperience, id: 'exp-' + Date.now() }];
                      setExperienceList(added);
                      setPortfolio(prev => ({ ...prev, experience: added }));
                      setNewExperience({ type: 'Internship', role: '', organization: '', startDate: '', endDate: 'Present', description: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '6px' }}
                  >
                    <Plus size={15} /> Add to Experience
                  </button>
                </div>
              </div>
            )}

            {/* TAB: ACHIEVEMENTS */}
            {activeTab === 'achievements' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Awards & Achievements</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  {achievementsList.map((ach, idx) => (
                    <div key={ach.id || idx} style={{
                      padding: '16px',
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{ach.title}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {ach.organization} {ach.year ? `• ${ach.year}` : ''}
                        </div>
                        {ach.description && (
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                            {ach.description}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = achievementsList.filter((_, i) => i !== idx);
                          setAchievementsList(updated);
                          setPortfolio(prev => ({ ...prev, achievements: updated }));
                        }}
                        style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        title="Delete achievement"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {achievementsList.length === 0 && (
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '12px 0' }}>
                      No achievements added. Showcase hackathons, certifications, or awards below.
                    </div>
                  )}
                </div>

                <div style={{ padding: '18px', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '14px' }}>+ Add Award or Achievement</div>
                  
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Winner — Smart India Hackathon / AWS Certified"
                      value={newAchievement.title}
                      onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div className="form-group">
                      <label className="form-label">Issuing Organization</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Google / AICTE / HackerRank"
                        value={newAchievement.organization}
                        onChange={(e) => setNewAchievement({ ...newAchievement, organization: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="2025"
                        value={newAchievement.year}
                        onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Brief details or impact of this recognition"
                      value={newAchievement.description}
                      onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!newAchievement.title) return;
                      const added = [...achievementsList, { ...newAchievement, id: 'ach-' + Date.now() }];
                      setAchievementsList(added);
                      setPortfolio(prev => ({ ...prev, achievements: added }));
                      setNewAchievement({ title: '', organization: '', year: new Date().getFullYear().toString(), description: '' });
                    }}
                    className="btn btn-secondary"
                    style={{ width: '100%', marginTop: '6px' }}
                  >
                    <Plus size={15} /> Add to Achievements
                  </button>
                </div>
              </div>
            )}

            {/* TAB: APPEARANCE */}
            {activeTab === 'appearance' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Design & Appearance</h3>
                <div className="form-group">
                  <label className="form-label">Template</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {TEMPLATE_OPTIONS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => updateSettings({ template: t.id })}
                        style={{
                          padding: '12px 16px',
                          border: (portfolio.settings?.template || 'editorial') === t.id ? '2px solid var(--brand-orange)' : '1px solid var(--border-default)',
                          backgroundColor: (portfolio.settings?.template || 'editorial') === t.id ? 'var(--brand-orange-light)' : 'transparent',
                          borderRadius: 'var(--radius-sm)',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ fontWeight: 700 }}>{t.name}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{t.description}</div>
                      </button>
                    ))}
                  </div>
                </div>


                {/* Color & Theme Styling (Presets + Custom UI Option) */}
                <CustomUiColorPicker 
                  settings={portfolio.settings || {}} 
                  updateSettings={updateSettings} 
                />

                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label className="form-label">Avatar Shape</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['circle', 'square', 'none'].map((shape) => (
                      <button
                        key={shape}
                        onClick={() => updateSettings({ avatarShape: shape })}
                        className={`chip ${(portfolio.settings?.avatarShape || 'circle') === shape ? 'active' : ''}`}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label className="form-label">Text Inversion</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
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
                  <span className="form-hint" style={{ marginTop: '6px' }}>
                    Inverted title gives your name a high-contrast black/white block highlight.
                  </span>
                </div>

                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label className="form-label">Background Design</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                  <span className="form-hint" style={{ marginTop: '6px' }}>
                    Architectural subtle patterns engineered for optimal readability and zero eye strain.
                  </span>
                </div>
              </div>
            )}

            {/* TAB: LINKS & RESUME */}
            {activeTab === 'links' && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Links, Socials & Contact</h3>
                <div className="form-group">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="student@example.com"
                    value={links.email || ''}
                    onChange={(e) => {
                      const updated = { ...links, email: e.target.value };
                      setLinks(updated);
                      setPortfolio(prev => ({ ...prev, links: updated }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp or Phone (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="+91 9876543210"
                    value={links.whatsapp || ''}
                    onChange={(e) => {
                      const updated = { ...links, whatsapp: e.target.value };
                      setLinks(updated);
                      setPortfolio(prev => ({ ...prev, links: updated }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://linkedin.com/in/username"
                    value={links.linkedin || ''}
                    onChange={(e) => {
                      const updated = { ...links, linkedin: e.target.value };
                      setLinks(updated);
                      setPortfolio(prev => ({ ...prev, links: updated }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">GitHub</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/username"
                    value={links.github || ''}
                    onChange={(e) => {
                      const updated = { ...links, github: e.target.value };
                      setLinks(updated);
                      setPortfolio(prev => ({ ...prev, links: updated }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">LeetCode Profile</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://leetcode.com/u/username"
                    value={links.leetcode || ''}
                    onChange={(e) => {
                      const updated = { ...links, leetcode: e.target.value };
                      setLinks(updated);
                      setPortfolio(prev => ({ ...prev, links: updated }));
                    }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">PDF Resume Link</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://drive.google.com/..."
                    value={resumeUrl}
                    onChange={(e) => {
                      setResumeUrl(e.target.value);
                      setPortfolio(prev => ({ ...prev, resumeUrl: e.target.value }));
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Interactive Preview */}
          {showLivePreview && (
            <div className="editor-preview-column" style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              position: 'sticky',
              top: '140px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Live Responsive Preview</span>
                <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--bg-main)', padding: '4px', borderRadius: 'var(--radius-sm)' }}>
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`btn btn-sm ${previewDevice === 'desktop' ? 'btn-secondary' : 'btn-ghost'}`}
                    aria-label="Desktop preview mode"
                  >
                    <Laptop size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`btn btn-sm ${previewDevice === 'tablet' ? 'btn-secondary' : 'btn-ghost'}`}
                    aria-label="Tablet preview mode"
                  >
                    <Tablet size={14} />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`btn btn-sm ${previewDevice === 'mobile' ? 'btn-secondary' : 'btn-ghost'}`}
                    aria-label="Mobile preview mode"
                  >
                    <Smartphone size={14} />
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: '650px', overflowY: 'auto', backgroundColor: '#F0F0EE', borderRadius: 'var(--radius-sm)' }}>
                <TemplateRenderer
                  data={portfolio}
                  device={previewDevice}
                  isPreview={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .editor-grid {
            grid-template-columns: 1fr !important;
          }
          .editor-preview-column {
            position: static !important;
            top: auto !important;
            margin-top: 24px;
            padding: 16px !important;
          }
          .editor-form-col {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Editor;
