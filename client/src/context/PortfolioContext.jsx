import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { 
  savePortfolio, 
  getAllStoredPortfolios, 
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
    bgPattern: 'dots'      // dots, grid, clean, soft
  }
};

export const PortfolioProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [portfolio, setPortfolio] = useState(DEFAULT_PORTFOLIO_STATE);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load portfolio for currentUser
  useEffect(() => {
    if (!currentUser) return;

    const all = getAllStoredPortfolios();
    // Look for matching portfolio by uid or by username
    const found = Object.values(all).find(p => p.uid === currentUser.uid);

    if (found) {
      setPortfolio(found);
    } else {
      // Initialize with user name if available
      setPortfolio(prev => ({
        ...prev,
        uid: currentUser.uid,
        profile: {
          ...prev.profile,
          name: currentUser.displayName || '',
          email: currentUser.email || ''
        }
      }));
    }
  }, [currentUser]);

  // Update specific portfolio sections
  const updateProfile = (profileData) => {
    setPortfolio(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileData }
    }));
  };

  const updateUsername = (username) => {
    const norm = normalizeUsername(username);
    setPortfolio(prev => ({
      ...prev,
      username: norm
    }));
  };

  const updateSettings = (newSettings) => {
    setPortfolio(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
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
      const finalData = {
        ...toSave,
        uid: toSave.uid || currentUser?.uid || 'guest-user',
        updatedAt: new Date().toISOString()
      };
      if (!finalData.createdAt) {
        finalData.createdAt = new Date().toISOString();
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
