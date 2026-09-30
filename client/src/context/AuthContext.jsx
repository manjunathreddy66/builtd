import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

const DEMO_AUTH_KEY = 'builtd_auth_user';

export const AuthProvider = ({ children }) => {
  // Synchronously initialize currentUser from persistent storage to eliminate 0-second logout flicker
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem(DEMO_AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn('Error reading stored session:', e);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;

    if (isFirebaseConfigured && auth) {
      // Enforce browser local persistence for resilient session across tabs and refreshes
      setPersistence(auth, browserLocalPersistence).catch((err) => {
        console.warn('Firebase setPersistence warning:', err.message);
      });

      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL
          };
          setCurrentUser(userData);
          try {
            localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(userData));
          } catch (e) {}
        } else {
          // If Firebase reports no user, check if we have an active demo mode session
          const stored = localStorage.getItem(DEMO_AUTH_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed && (parsed.uid?.startsWith('user-') || parsed.uid?.startsWith('google-user-'))) {
                // Retain demo user
                setCurrentUser(parsed);
                setLoading(false);
                return;
              }
            } catch (e) {}
          }
          setCurrentUser(null);
          localStorage.removeItem(DEMO_AUTH_KEY);
        }
        setLoading(false);
      });
    } else {
      // Demo / Local storage mode fallback
      try {
        const stored = localStorage.getItem(DEMO_AUTH_KEY);
        if (stored) {
          setCurrentUser(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Error reading demo user:', e);
      }
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signup = async (email, password, displayName = '') => {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: displayName || email.split('@')[0],
        photoURL: res.user.photoURL || ''
      };
      try {
        localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(user));
      } catch (e) {}
      setCurrentUser(user);
      return user;
    }

    // Demo Mode fallback
    const user = {
      uid: 'user-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: displayName || email.split('@')[0]
    };
    localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const login = async (email, password) => {
    if (isFirebaseConfigured && auth) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || email.split('@')[0],
        photoURL: res.user.photoURL || ''
      };
      try {
        localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(user));
      } catch (e) {}
      setCurrentUser(user);
      return user;
    }

    // Demo Mode fallback
    const user = {
      uid: 'user-' + Math.random().toString(36).substring(2, 9),
      email,
      displayName: email.split('@')[0]
    };
    localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      const res = await signInWithPopup(auth, googleProvider);
      const user = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || res.user.email.split('@')[0],
        photoURL: res.user.photoURL || ''
      };
      try {
        localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(user));
      } catch (e) {}
      setCurrentUser(user);
      return user;
    }

    // Demo Mode fallback
    const user = {
      uid: 'google-user-' + Math.random().toString(36).substring(2, 9),
      email: 'student@example.com',
      displayName: 'Student Builder',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };
    localStorage.setItem(DEMO_AUTH_KEY, JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Firebase sign out error:', e);
      }
    }
    localStorage.removeItem(DEMO_AUTH_KEY);
    setCurrentUser(null);
  };

  const resetPassword = async (email) => {
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      signup,
      login,
      loginWithGoogle,
      logout,
      resetPassword,
      isFirebaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
