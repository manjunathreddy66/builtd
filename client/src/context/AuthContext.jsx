import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

const DEMO_AUTH_KEY = 'builtd_auth_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL
          });
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
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
  }, []);

  const signup = async (email, password, displayName = '') => {
    if (isFirebaseConfigured && auth) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: displayName || email.split('@')[0]
      };
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
        displayName: res.user.displayName || email.split('@')[0]
      };
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
        displayName: res.user.displayName,
        photoURL: res.user.photoURL
      };
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
      await signOut(auth);
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
