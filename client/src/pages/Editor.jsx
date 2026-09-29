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

  // Experience
  const [experienceList, setExperienceList] = useState(portfolio.experience || []);

  // Achievements
  const [achievementsList, setAchievementsList] = useState(portfolio.achievements || []);

  // Links
  const [links, setLinks] = useState(portfolio.links || {});
  const [resumeUrl, setResumeUrl] = useState(portfolio.resumeUrl || '');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  // Synchronize on save
  const handleSaveAll = async () => {
    const updated = {
      ...portfolio,
      profile: {
        ...portfolio.profile,
        name,
        headline,
        bio,
        location,
        profileImage
      },
      skills: selectedSkills,
      projects: projectsList,
      education: educationList,
      experience: experienceList,
      achievements: achievementsList,
      links,
      resumeUrl
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
                          {p.technologies?.join(', ')}
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
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                    />
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
