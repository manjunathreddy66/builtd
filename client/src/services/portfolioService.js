import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';
import { RESERVED_USERNAMES, INITIAL_STUDENT_PORTFOLIOS } from './initialData';

const LOCAL_STORAGE_KEY = 'builtd_portfolios_v1';

// Helper to get all stored portfolios (merging initial seeds + local saves)
export const getAllStoredPortfolios = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_STUDENT_PORTFOLIOS));
      return { ...INITIAL_STUDENT_PORTFOLIOS };
    }
    const parsed = JSON.parse(raw);
    return { ...INITIAL_STUDENT_PORTFOLIOS, ...parsed };
  } catch (e) {
    return { ...INITIAL_STUDENT_PORTFOLIOS };
  }
};

export const saveToLocalPortfolios = (username, data) => {
  try {
    const current = getAllStoredPortfolios();
    current[username.toLowerCase()] = {
      ...current[username.toLowerCase()],
      ...data,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(current));
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

  // 1. If Firebase is active, check Firestore collection
  if (isFirebaseConfigured && db) {
    try {
      const usernameRef = doc(db, 'usernames', username);
      const snap = await getDoc(usernameRef);
      if (snap.exists()) {
        const data = snap.data();
        if (currentUid && data.uid === currentUid) {
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
      console.warn('Firestore username check fallback to local:', e.message);
    }
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

// Fetch portfolio by username (fast instant local with quick remote revalidation)
export const getPortfolioByUsername = async (rawUsername) => {
  const username = normalizeUsername(rawUsername);
  const localData = getLocalPortfolioByUsername(username);

  if (isFirebaseConfigured && db) {
    try {
      const fetchPromise = (async () => {
        const usernameRef = doc(db, 'usernames', username);
        const usernameSnap = await getDoc(usernameRef);
        if (usernameSnap.exists()) {
          const uid = usernameSnap.data().uid;
          const userRef = doc(db, 'users', uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            return userSnap.data();
          }
        }
        return null;
      })();

      // Fast timeout so users never wait on network latency
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1500));
      const remoteData = await Promise.race([fetchPromise, timeoutPromise]);
      if (remoteData) return remoteData;
    } catch (e) {
      console.warn('Firestore getPortfolio fallback to local:', e.message);
    }
  }

  return localData;
};

// Save or publish portfolio with instant local persistence and non-blocking cloud sync
export const savePortfolio = async (portfolioData) => {
  const { uid, username } = portfolioData;
  const normalizedUser = normalizeUsername(username);

  if (!normalizedUser) {
    return { success: false, error: 'A valid portfolio username is required to publish.' };
  }

  // 1. Update locally first for 0ms instantaneous responsiveness
  try {
    saveToLocalPortfolios(normalizedUser, portfolioData);
  } catch (localErr) {
    console.error('Local save error:', localErr);
    return { success: false, error: 'Failed to save portfolio to local storage.' };
  }

  let syncedToCloud = false;
  let cloudError = null;

  // 2. Cloud Firestore sync with timeout guard so user is NEVER blocked
  if (isFirebaseConfigured && db && uid) {
    try {
      const cloudSyncTask = (async () => {
        await Promise.all([
          // 1. Claim username document
          setDoc(doc(db, 'usernames', normalizedUser), {
            uid,
            username: normalizedUser,
            updatedAt: new Date().toISOString()
          }, { merge: true }),

          // 2. Save user profile document
          setDoc(doc(db, 'users', uid), {
            ...portfolioData,
            username: normalizedUser,
            updatedAt: new Date().toISOString()
          }, { merge: true })
        ]);
      })();

      // Timeout at 1200ms: if Firestore is slow or offline, complete immediately
      const timeoutGuard = new Promise((resolve) => 
        setTimeout(() => resolve('TIMEOUT'), 1200)
      );

      const syncResult = await Promise.race([cloudSyncTask, timeoutGuard]);
      if (syncResult !== 'TIMEOUT') {
        syncedToCloud = true;
      }
    } catch (e) {
      console.warn('Cloud sync note:', e.message);
      cloudError = e.message;
    }
  }

  return { 
    success: true, 
    username: normalizedUser, 
    syncedToCloud, 
    cloudError 
  };
};

// Upload image file (saves as `username.png` or `project-X.png`)
export const uploadPortfolioAsset = async (file, username, assetName) => {
  const sanitizedUsername = normalizeUsername(username) || 'guest';
  const cleanName = assetName.replace(/[^a-zA-Z0-9._-]/g, '');

  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, `portfolio-assets/${sanitizedUsername}/${cleanName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (e) {
      console.warn('Firebase storage upload failed, falling back to local ObjectURL:', e.message);
    }
  }

  // Fallback for instant preview / demo mode
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
};
