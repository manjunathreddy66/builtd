import { ref as dbRefHelper, set, get } from 'firebase/database';
import { rtdb, RTDB_BASE_URL } from './firebase';
import { RESERVED_USERNAMES, INITIAL_STUDENT_PORTFOLIOS } from './initialData';

const LOCAL_STORAGE_KEY = 'builtd_portfolios_v1';
const USER_FOLDERS_KEY = 'builtd_user_folders_v1';

// Purge any old legacy seed data (arjun, rahul, priya, ananya) from localStorage
const purgeOldSeedData = () => {
  try {
    const legacyNames = ['arjun', 'rahul', 'ananya', 'priya'];
    const rawPortfolios = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (rawPortfolios) {
      const parsed = JSON.parse(rawPortfolios);
      let changed = false;
      legacyNames.forEach(legacy => {
        if (parsed[legacy]) {
          delete parsed[legacy];
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed));
      }
    }

    const rawFolders = localStorage.getItem(USER_FOLDERS_KEY);
    if (rawFolders) {
      const parsed = JSON.parse(rawFolders);
      let changed = false;
      legacyNames.forEach(legacy => {
        if (parsed[legacy]) {
          delete parsed[legacy];
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem(USER_FOLDERS_KEY, JSON.stringify(parsed));
      }
    }
  } catch (e) {
    // Ignore storage parse issues
  }
};
purgeOldSeedData();

// Cloud write helper (uses RTDB SDK with resilient direct REST fallback)
const writeToCloud = async (path, data) => {
  // Method 1: RTDB SDK
  try {
    if (rtdb) {
      const dbRef = dbRefHelper(rtdb, path);
      await set(dbRef, data);
      return true;
    }
  } catch (e) {
    console.warn(`RTDB SDK write failed for ${path}, trying REST fallback:`, e.message);
  }

  // Method 2: Direct REST PUT fallback
  try {
    const url = `${RTDB_BASE_URL}/${path}.json`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (e) {
    console.warn(`RTDB REST write failed for ${path}:`, e.message);
    return false;
  }
};

// Cloud read helper (uses RTDB SDK with direct REST fallback)
const readFromCloud = async (path) => {
  // Method 1: RTDB SDK
  try {
    if (rtdb) {
      const dbRef = dbRefHelper(rtdb, path);
      const snap = await get(dbRef);
      if (snap.exists()) {
        return snap.val();
      }
    }
  } catch (e) {
    console.warn(`RTDB SDK read failed for ${path}, trying REST fallback:`, e.message);
  }

  // Method 2: Direct REST GET fallback
  try {
    const url = `${RTDB_BASE_URL}/${path}.json`;
    const res = await fetch(url, { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    console.warn(`RTDB REST read failed for ${path}:`, e.message);
  }

  return null;
};

// Get all user virtual folders
export const getAllUserFolders = () => {
  try {
    const raw = localStorage.getItem(USER_FOLDERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

// Retrieve a specific user folder (e.g. /username)
export const getUserFolder = (rawUsername) => {
  const username = normalizeUsername(rawUsername);
  if (!username) return null;
  const folders = getAllUserFolders();
  if (folders[username]) return folders[username];

  const localPortfolio = getLocalPortfolioByUsername(username);
  if (localPortfolio) {
    saveUserFolder(username, localPortfolio);
    return getAllUserFolders()[username] || null;
  }
  return null;
};

// Async fetch for user folder ensuring cloud sync across devices
export const fetchUserFolder = async (rawUsername) => {
  const username = normalizeUsername(rawUsername);
  if (!username) return null;
  const local = getUserFolder(username);
  if (local) return local;

  const cloudFolder = await readFromCloud(`user_folders/${username}`);
  if (cloudFolder) {
    const folders = getAllUserFolders();
    folders[username] = cloudFolder;
    try {
      localStorage.setItem(USER_FOLDERS_KEY, JSON.stringify(folders));
    } catch (e) {}
    return cloudFolder;
  }
  return null;
};

// Save / update a user folder with portfolio data and asset files
export const saveUserFolder = (rawUsername, portfolioData, newFile = null) => {
  const username = normalizeUsername(rawUsername);
  if (!username) return null;
  try {
    const folders = getAllUserFolders();
    const existing = folders[username] || {
      username,
      folderPath: `/${username}`,
      createdAt: new Date().toISOString(),
      files: []
    };

    let updatedFiles = [...(existing.files || [])];
    if (newFile) {
      updatedFiles = updatedFiles.filter(f => f.name !== newFile.name);
      updatedFiles.push({
        name: newFile.name,
        path: `/${username}/${newFile.name}`,
        type: newFile.type || 'file',
        size: newFile.size || 'unknown',
        url: newFile.url || '',
        updatedAt: new Date().toISOString()
      });
    }

    // Always maintain portfolio.json in the user folder
    updatedFiles = updatedFiles.filter(f => f.name !== 'portfolio.json');
    updatedFiles.unshift({
      name: 'portfolio.json',
      path: `/${username}/portfolio.json`,
      type: 'application/json',
      size: `${JSON.stringify(portfolioData).length} bytes`,
      updatedAt: new Date().toISOString()
    });

    const folderData = {
      ...existing,
      updatedAt: new Date().toISOString(),
      portfolioData,
      files: updatedFiles
    };

    folders[username] = folderData;
    localStorage.setItem(USER_FOLDERS_KEY, JSON.stringify(folders));

    // Non-blocking cloud sync for user folder
    writeToCloud(`user_folders/${username}`, folderData).catch(() => {});

    return folderData;
  } catch (e) {
    console.error('Error saving user folder:', e);
    return null;
  }
};

// Helper to get all stored portfolios (local storage only, no stale seeds)
export const getAllStoredPortfolios = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return { ...parsed };
  } catch (e) {
    return {};
  }
};

export const saveToLocalPortfolios = (username, data) => {
  try {
    const current = getAllStoredPortfolios();
    const cleanUser = username.toLowerCase();
    current[cleanUser] = {
      ...current[cleanUser],
      ...data,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
    // Keep user folder in sync as well
    saveUserFolder(cleanUser, current[cleanUser]);
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

// Normalize username: "Alex Morgan" -> "alex-morgan"
export const normalizeUsername = (raw) => {
  if (!raw) return '';
  return raw
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .slice(0, 30);
};

// Username validation rules
export const validateUsername = (username) => {
  if (!username || username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters.' };
  }
  if (username.length > 30) {
    return { valid: false, message: 'Username cannot exceed 30 characters.' };
  }
  if (!/^[a-z0-9-]+$/.test(username)) {
    return { valid: false, message: 'Only lowercase letters, numbers, and hyphens are allowed.' };
  }
  if (username.startsWith('-') || username.endsWith('-')) {
    return { valid: false, message: 'Username cannot start or end with a hyphen.' };
  }
  if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
    return { valid: false, message: `"${username}" is a reserved system route.` };
  }
  return { valid: true };
};

// Real-time username availability check with smart suggestions
export const checkUsernameAvailability = async (rawUsername, currentUid = null) => {
  const username = normalizeUsername(rawUsername);
  const validation = validateUsername(username);

  if (!validation.valid) {
    return {
      available: false,
      normalized: username,
      reason: validation.message,
      suggestions: generateSuggestions(username)
    };
  }

  // 1. Check cloud database (Realtime Database)
  try {
    const cloudRecord = await readFromCloud(`usernames/${username}`);
    if (cloudRecord) {
      if (currentUid && cloudRecord.uid === currentUid) {
        return { available: true, normalized: username };
      }
      return {
        available: false,
        normalized: username,
        reason: 'This portfolio name is already taken.',
        suggestions: generateSuggestions(username)
      };
    }
  } catch (e) {
    console.warn('Cloud username check note:', e.message);
  }

  // 2. Check local database
  const all = getAllStoredPortfolios();
  const existing = all[username];

  if (existing) {
    if (currentUid && existing.uid === currentUid) {
      return { available: true, normalized: username };
    }
    return {
      available: false,
      normalized: username,
      reason: 'This portfolio name is already taken.',
      suggestions: generateSuggestions(username)
    };
  }

  return {
    available: true,
    normalized: username
  };
};

function generateSuggestions(base) {
  const clean = base ? base.replace(/-+/g, '') : 'portfolio';
  return [
    `${base}-student`,
    `${base}25`,
    `${clean}-dev`,
    `build-${base}`
  ].filter(s => !RESERVED_USERNAMES.includes(s)).slice(0, 3);
}

// Synchronous fast local cache lookup for 0ms initial render
export const getLocalPortfolioByUsername = (rawUsername) => {
  if (!rawUsername) return null;
  const username = normalizeUsername(rawUsername);
  const all = getAllStoredPortfolios();
  return all[username] || null;
};

// Fetch portfolio by username (fast instant local with cloud sync across all devices)
export const getPortfolioByUsername = async (rawUsername) => {
  if (!rawUsername) return null;
  const username = normalizeUsername(rawUsername);
  if (!username) return null;

  const localData = getLocalPortfolioByUsername(username);

  // ALWAYS check cloud database so portfolio is immediately visible on any device/phone
  try {
    const remoteData = await readFromCloud(`portfolios/${username}`);
    if (remoteData && remoteData.username) {
      // Cache locally on this device so future visits load with 0ms delay
      saveToLocalPortfolios(username, remoteData);
      return remoteData;
    }
  } catch (e) {
    console.warn('Error fetching portfolio from cloud:', e);
  }

  return localData;
};

// Save or publish portfolio with instant local persistence and reliable cloud sync
export const savePortfolio = async (portfolioData) => {
  const { uid, username } = portfolioData;
  const normalizedUser = normalizeUsername(username);

  if (!normalizedUser) {
    return { success: false, error: 'A valid portfolio username is required to publish.' };
  }

  const completePortfolio = {
    ...portfolioData,
    username: normalizedUser,
    published: true,
    updatedAt: new Date().toISOString()
  };

  // 1. Instant local persistence
  try {
    saveToLocalPortfolios(normalizedUser, completePortfolio);
  } catch (localErr) {
    console.error('Local save error:', localErr);
    return { success: false, error: 'Failed to save portfolio to local storage.' };
  }

  // 2. Multi-point Cloud Persistence for cross-device visibility
  let syncedToCloud = false;
  let cloudError = null;

  try {
    const cloudPromises = [
      // Direct portfolio document by username (so builtd.vercel.app/:username finds it on any device)
      writeToCloud(`portfolios/${normalizedUser}`, completePortfolio),
      // Username registration index
      writeToCloud(`usernames/${normalizedUser}`, {
        uid: uid || 'user-' + Date.now(),
        username: normalizedUser,
        updatedAt: new Date().toISOString()
      })
    ];

    if (uid) {
      cloudPromises.push(writeToCloud(`users/${uid}`, completePortfolio));
    }

    const results = await Promise.all(cloudPromises);
    syncedToCloud = results.some(Boolean);
  } catch (e) {
    console.warn('Cloud sync note:', e.message);
    cloudError = e.message;
  }

  return { 
    success: true, 
    username: normalizedUser, 
    syncedToCloud, 
    cloudError 
  };
};

// Upload image file (saves in folder `portfolio-assets/username/filename` and registers in user folder)
export const uploadPortfolioAsset = async (file, username, assetName) => {
  const sanitizedUsername = normalizeUsername(username) || 'guest';
  const cleanName = assetName.replace(/[^a-zA-Z0-9._-]/g, '');

  let fileUrl = '';

  // Convert to data URL for guaranteed cross-device rendering
  try {
    fileUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch (e) {
    console.warn('FileReader error:', e);
  }

  // Automatically register this image file in the user's folder & cloud
  const currentPortfolio = getLocalPortfolioByUsername(sanitizedUsername) || {};
  saveUserFolder(sanitizedUsername, currentPortfolio, {
    name: cleanName,
    type: file.type || 'image/png',
    size: `${(file.size / 1024).toFixed(1)} KB`,
    url: fileUrl
  });

  return fileUrl;
};

// Immediately initialize and register a user's folder and live portfolio on signup
export const registerNewUserPortfolio = async (rawUsername, fullName, email, customData = {}) => {
  const username = normalizeUsername(rawUsername);
  if (!username) return null;

  const initialPortfolio = {
    uid: customData.uid || 'user-' + Date.now(),
    username,
    published: true, // Make publicly accessible at builtd.vercel.app/:username immediately!
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profile: {
      name: fullName || username,
      headline: customData.headline || 'Engineering Student & Developer',
      bio: customData.bio || `Welcome to ${fullName || username}'s digital identity on BUILTD.`,
      location: customData.location || '',
      profileImage: customData.profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName || username)}&backgroundColor=F25C22`,
      email: email || ''
    },
    education: customData.education || [],
    skills: customData.skills || ['JavaScript', 'Web Development', 'Git', 'Problem Solving'],
    projects: customData.projects || [],
    experience: customData.experience || [],
    achievements: customData.achievements || [],
    certifications: customData.certifications || [],
    links: {
      github: customData.links?.github || '',
      linkedin: customData.links?.linkedin || '',
      leetcode: '',
      codechef: '',
      codeforces: '',
      hackerrank: '',
      other: '',
      email: email || '',
      whatsapp: ''
    },
    resumeUrl: '',
    settings: {
      template: customData.settings?.template || 'editorial',
      theme: customData.settings?.theme || 'light',
      accent: 'orange',
      font: 'space',
      layout: 'editorial',
      avatarShape: 'circle',
      textInversion: false,
      bgPattern: 'dots'
    }
  };

  // 1. Save locally
  saveToLocalPortfolios(username, initialPortfolio);

  // 2. Initialize user folder with profile.png and portfolio.json
  saveUserFolder(username, initialPortfolio, {
    name: 'profile.png',
    type: 'image/png',
    size: 'auto',
    url: initialPortfolio.profile.profileImage
  });

  // 3. Save to cloud immediately so portfolio works on ALL devices
  try {
    await savePortfolio(initialPortfolio);
  } catch (e) {
    console.warn('Initial cloud save note:', e.message);
  }

  return initialPortfolio;
};
