import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  savePortfolio, 
  getAllStoredPortfolios, 
  saveToLocalPortfolios,
  readFromCloud,
  normalizeUsername 
} from '../services/portfolioService';
import confetti from 'canvas-confetti';

const PortfolioContext = createContext(null);

const DEFAULT_PORTFOLIO_STATE = {
  uid: '',
  username: '',
  published: false,
  createdAt: null,
  updatedAt: null,
  profile: {
    name: '',
    headline: '',
    bio: '',
    location: '',
    profileImage: '',
    email: ''
  },
  education: [],
  skills: [],
  projects: [],
  experience: [],
  achievements: [],
  certifications: [],
  links: {
    github: '',
    linkedin: '',
    leetcode: '',
    codechef: '',
    codeforces: '',
    hackerrank: '',
    other: '',
    email: '',
    whatsapp: ''
  },
  resumeUrl: '',
  settings: {
    template: 'editorial', // minimal, editorial, grid, creative, professional
    theme: 'light',        // light, dark
    accent: 'orange',      // orange, blue, purple, green, red
    font: 'space',         // space, inter, mono
    layout: 'editorial',   // editorial, centered, left
    avatarShape: 'circle', // circle, square, none
    textInversion: false,  // high-contrast inverted title
    bgPattern: 'dots',     // dots, grid, clean, soft
    colorMode: 'preset',
    customUiEnabled: false,
    customBgColor: '#F8F9FA',
    customTextColor: '#111827',
    customHighlightColor: '#F25C22'
  }
};

const mergePortfolioData = (existing, incoming) => {
  if (!incoming) return existing || DEFAULT_PORTFOLIO_STATE;
  return {
    ...DEFAULT_PORTFOLIO_STATE,
    ...existing,
    ...incoming,
    profile: {
      ...DEFAULT_PORTFOLIO_STATE.profile,
      ...(existing?.profile || {}),
      ...(incoming.profile || {})
    },
    settings: {
      ...DEFAULT_PORTFOLIO_STATE.settings,
      ...(existing?.settings || {}),
      ...(incoming.settings || {})
    },
    links: {
      ...DEFAULT_PORTFOLIO_STATE.links,
      ...(existing?.links || {}),
      ...(incoming.links || {})
    },
    education: Array.isArray(incoming.education) && incoming.education.length > 0 
      ? incoming.education 
      : (existing?.education || []),
    skills: Array.isArray(incoming.skills) && incoming.skills.length > 0 
      ? incoming.skills 
      : (existing?.skills || []),
    projects: Array.isArray(incoming.projects) && incoming.projects.length > 0 
      ? incoming.projects 
      : (existing?.projects || []),
    experience: Array.isArray(incoming.experience) && incoming.experience.length > 0 
      ? incoming.experience 
      : (existing?.experience || []),
    achievements: Array.isArray(incoming.achievements) && incoming.achievements.length > 0 
      ? incoming.achievements 
      : (existing?.achievements || [])
  };
};

export const PortfolioProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  // Lazily load portfolio immediately from local cache on mount (0ms delay)
  const [portfolio, setPortfolio] = useState(() => {
    try {
      const storedAuth = localStorage.getItem('builtd_auth_user');
      const all = getAllStoredPortfolios();
      if (storedAuth) {
        const u = JSON.parse(storedAuth);
        const found = Object.values(all).find(p => 
          p.uid === u.uid || 
          (p.profile?.email && p.profile.email.toLowerCase() === u.email?.toLowerCase())
        );
        if (found) {
          return mergePortfolioData(DEFAULT_PORTFOLIO_STATE, found);
        }
      }
      const list = Object.values(all);
      if (list.length === 1) {
        return mergePortfolioData(DEFAULT_PORTFOLIO_STATE, list[0]);
      }
    } catch (e) {
      console.warn('Initial portfolio load note:', e);
    }
    return DEFAULT_PORTFOLIO_STATE;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load and synchronize portfolio for currentUser (local first, then cloud)
  useEffect(() => {
    if (!currentUser) return;

    let isMounted = true;

    const loadPortfolioData = async () => {
      // 1. Instant check in local storage
      const all = getAllStoredPortfolios();
      let found = Object.values(all).find(p => 
        p.uid === currentUser.uid || 
        (p.profile?.email && p.profile.email.toLowerCase() === currentUser.email?.toLowerCase())
      );

      if (found && isMounted) {
        setPortfolio(prev => mergePortfolioData(prev, found));
      }

      // 2. Cross-device sync check via Cloud RTDB
      try {
        let cloudData = await readFromCloud(`users/${currentUser.uid}`);
        if (!cloudData && currentUser.email) {
          const cleanUser = normalizeUsername(currentUser.displayName || currentUser.email.split('@')[0]);
          cloudData = await readFromCloud(`portfolios/${cleanUser}`);
        }

        if (cloudData && cloudData.username && isMounted) {
          saveToLocalPortfolios(cloudData.username, cloudData);
          setPortfolio(prev => mergePortfolioData(prev, cloudData));
          return;
        }
      } catch (e) {
        console.warn('Portfolio cloud sync note:', e.message);
      }

      // 3. Fallback for brand-new users
      if (!found && isMounted) {
        setPortfolio(prev => ({
          ...DEFAULT_PORTFOLIO_STATE,
          ...prev,
          uid: currentUser.uid,
          profile: {
            ...DEFAULT_PORTFOLIO_STATE.profile,
            ...prev.profile,
            name: prev.profile?.name || currentUser.displayName || '',
            email: prev.profile?.email || currentUser.email || ''
          }
        }));
      }
    };

    loadPortfolioData();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  // Update specific portfolio sections and automatically update local cache
  const updateProfile = (profileData) => {
    setPortfolio(prev => {
      const updated = {
        ...prev,
        profile: { ...prev.profile, ...profileData }
      };
      if (updated.username) {
        saveToLocalPortfolios(updated.username, updated);
      }
      return updated;
    });
  };

  const updateUsername = (username) => {
    const norm = normalizeUsername(username);
    setPortfolio(prev => {
      const updated = {
        ...prev,
        username: norm
      };
      if (norm) {
        saveToLocalPortfolios(norm, updated);
      }
      return updated;
    });
  };

  const updateSettings = (newSettings) => {
    setPortfolio(prev => {
      const updated = {
        ...prev,
        settings: { ...prev.settings, ...newSettings }
      };
      if (updated.username) {
        saveToLocalPortfolios(updated.username, updated);
      }
      return updated;
    });
  };

  const addProject = (project) => {
    const id = project.id || 'proj-' + Date.now();
    setPortfolio(prev => ({
      ...prev,
      projects: [...prev.projects, { ...project, id }]
    }));
  };

  const updateProject = (id, updated) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updated } : p)
    }));
  };

  const deleteProject = (id) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const addEducation = (edu) => {
    const id = edu.id || 'edu-' + Date.now();
    setPortfolio(prev => ({
      ...prev,
      education: [...prev.education, { ...edu, id }]
    }));
  };

  const updateEducation = (id, updated) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, ...updated } : e)
    }));
  };

  const deleteEducation = (id) => {
    setPortfolio(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  const setSkills = (skillsArray) => {
    setPortfolio(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const addExperience = (exp) => {
    const id = exp.id || 'exp-' + Date.now();
    setPortfolio(prev => ({
      ...prev,
      experience: [...prev.experience, { ...exp, id }]
    }));
  };

  const updateExperience = (id, updated) => {
    setPortfolio(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...updated } : e)
    }));
  };

  const deleteExperience = (id) => {
    setPortfolio(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  const addAchievement = (ach) => {
    const id = ach.id || 'ach-' + Date.now();
    setPortfolio(prev => ({
      ...prev,
      achievements: [...prev.achievements, { ...ach, id }]
    }));
  };

  const deleteAchievement = (id) => {
    setPortfolio(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id)
    }));
  };

  const updateLinks = (linksData) => {
    setPortfolio(prev => ({
      ...prev,
      links: { ...prev.links, ...linksData }
    }));
  };

  const setResumeUrl = (url) => {
    setPortfolio(prev => ({
      ...prev,
      resumeUrl: url
    }));
  };

  // Save changes
  const saveCurrentPortfolio = async (customData = null) => {
    setIsSaving(true);
    try {
      const toSave = customData || portfolio;
      const finalData = mergePortfolioData(portfolio, {
        ...toSave,
        uid: toSave.uid || portfolio.uid || currentUser?.uid || 'guest-user',
        username: toSave.username || portfolio.username || '',
        updatedAt: new Date().toISOString()
      });
      if (!finalData.createdAt) {
        finalData.createdAt = portfolio.createdAt || new Date().toISOString();
      }
      
      const saveRes = await savePortfolio(finalData);
      setPortfolio(finalData);
      setLastSaved(new Date());
      return { ...saveRes, data: finalData };
    } finally {
      setIsSaving(false);
    }
  };

  // Publish flow with celebration
  const publishCurrentPortfolio = async () => {
    setIsSaving(true);
    try {
      const publishedData = {
        ...portfolio,
        uid: portfolio.uid || currentUser?.uid || 'guest-user',
        published: true,
        updatedAt: new Date().toISOString()
      };
      if (!publishedData.createdAt) {
        publishedData.createdAt = new Date().toISOString();
      }

      const saveRes = await savePortfolio(publishedData);
      if (!saveRes.success) {
        throw new Error(saveRes.error || 'Failed to save published portfolio.');
      }

      setPortfolio(publishedData);
      setLastSaved(new Date());

      // Subtle celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F25C22', '#111111', '#BDBDBD']
        });
      } catch (e) {
        // non-critical
      }

      return { ...saveRes, data: publishedData };
    } finally {
      setIsSaving(false);
    }
  };

  const unpublishCurrentPortfolio = async () => {
    setIsSaving(true);
    try {
      const unpublishedData = {
        ...portfolio,
        published: false,
        updatedAt: new Date().toISOString()
      };
      const saveRes = await savePortfolio(unpublishedData);
      setPortfolio(unpublishedData);
      return { ...saveRes, data: unpublishedData };
    } finally {
      setIsSaving(false);
    }
  };

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let score = 0;
    if (portfolio.username) score += 15;
    if (portfolio.profile.name) score += 15;
    if (portfolio.profile.headline) score += 10;
    if (portfolio.profile.bio) score += 10;
    if (portfolio.education && portfolio.education.length > 0) score += 15;
    if (portfolio.skills && portfolio.skills.length > 0) score += 15;
    if (portfolio.projects && portfolio.projects.length > 0) score += 15;
    if (portfolio.links && (portfolio.links.github || portfolio.links.linkedin)) score += 5;
    return Math.min(score, 100);
  };

  return (
    <PortfolioContext.Provider value={{
      portfolio,
      setPortfolio,
      isSaving,
      lastSaved,
      updateProfile,
      updateUsername,
      updateSettings,
      addProject,
      updateProject,
      deleteProject,
      addEducation,
      updateEducation,
      deleteEducation,
      setSkills,
      addExperience,
      updateExperience,
      deleteExperience,
      addAchievement,
      deleteAchievement,
      updateLinks,
      setResumeUrl,
      saveCurrentPortfolio,
      publishCurrentPortfolio,
      unpublishCurrentPortfolio,
      completionPercentage: calculateCompletion()
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
