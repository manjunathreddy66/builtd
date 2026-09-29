import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';
import { AuthErrorAlert } from '../components/common/AuthErrorAlert';
import { 
  normalizeUsername, 
  checkUsernameAvailability, 
  registerNewUserPortfolio 
} from '../services/portfolioService';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const Signup = () => {
  const [searchParams] = useSearchParams();
  const initialHandle = searchParams.get('handle') || '';

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState(initialHandle);
  const [usernameEdited, setUsernameEdited] = useState(Boolean(initialHandle));
  const [usernameStatus, setUsernameStatus] = useState({ checking: false, available: null, message: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signup, loginWithGoogle } = useAuth();
  const { setPortfolio, updateProfile, updateUsername } = usePortfolio();
  const navigate = useNavigate();

  // Auto-generate username from full name if user hasn't manually customized it
  useEffect(() => {
    if (!usernameEdited && fullName.trim()) {
      const generated = normalizeUsername(fullName);
      setUsername(generated);
    }
  }, [fullName, usernameEdited]);

  // Check username availability with debouncing
  useEffect(() => {
    if (!username || username.length < 3) {
      setUsernameStatus({ checking: false, available: null, message: '' });
      return;
    }

    let isMounted = true;
    setUsernameStatus({ checking: true, available: null, message: '' });

    const timer = setTimeout(async () => {
      const result = await checkUsernameAvailability(username);
      if (isMounted) {
        setUsernameStatus({
          checking: false,
          available: result.available,
          message: result.available ? 'Link available!' : (result.reason || 'Username is taken.')
        });
      }
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError({
        title: 'Full Name Required',
        description: 'Please enter your full name to set up your portfolio profile.'
      });
      return;
    }

    const cleanUsername = normalizeUsername(username);
    if (!cleanUsername || cleanUsername.length < 3) {
      setError({
        title: 'Valid Username Required',
        description: 'Your portfolio handle must be at least 3 characters (e.g. yourname).'
      });
      return;
    }

    if (usernameStatus.available === false) {
      setError({
        title: 'Username Unavailable',
        description: usernameStatus.message || 'Please choose a different username for your portfolio URL.'
      });
      return;
    }

    if (!email.trim()) {
      setError({
        title: 'Email Address Required',
        description: 'Please enter a valid email address.'
      });
      return;
    }
    if (password.length < 6) {
      setError({
        title: 'Password Too Short',
        description: 'Your password must be at least 6 characters long.'
      });
      return;
    }
    if (password !== confirmPassword) {
      setError({
        title: 'Passwords Do Not Match',
        description: 'Please make sure both passwords match.'
      });
      return;
    }

    try {
      setLoading(true);
      const user = await signup(email, password, fullName);
      
      // Immediately register new user's live portfolio and dedicated folder
      const initialPortfolio = await registerNewUserPortfolio(cleanUsername, fullName, email, {
        uid: user?.uid
      });

      if (initialPortfolio) {
        setPortfolio(initialPortfolio);
      } else {
        updateProfile({ name: fullName, email });
        updateUsername(cleanUsername);
      }

      // Redirect to onboarding
      navigate('/onboarding');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await loginWithGoogle();
      const cleanUsername = normalizeUsername(username || user.displayName || user.email.split('@')[0]);

      // Initialize live portfolio and user folder
      const initialPortfolio = await registerNewUserPortfolio(cleanUsername, user.displayName, user.email, {
        uid: user.uid,
        profileImage: user.photoURL || ''
      });

      if (initialPortfolio) {
        setPortfolio(initialPortfolio);
      } else {
        updateProfile({ name: user.displayName, email: user.email });
        updateUsername(cleanUsername);
      }

      navigate('/onboarding');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: 'var(--bg-main)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-md)',
        padding: '40px 32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Logo variant="compact" height={36} to="/" />
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginTop: '16px',
            marginBottom: '6px'
          }}>
            Create your <img src="/built.png" alt="BUILTD" style={{ height: '24px', verticalAlign: 'middle', margin: '0 4px', display: 'inline-block' }} /> account.
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Start building your digital identity in minutes.
          </p>
        </div>

        <AuthErrorAlert
          error={error}
          onClose={() => setError(null)}
        />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              className="form-input"
              placeholder="e.g. Alex Morgan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" htmlFor="username" style={{ margin: 0 }}>
                Portfolio Username / Handle
              </label>
              {usernameStatus.checking && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Loader2 size={12} className="spinner-orange" /> Checking...
                </span>
              )}
              {!usernameStatus.checking && usernameStatus.available === true && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <CheckCircle2 size={13} /> {usernameStatus.message}
                </span>
              )}
              {!usernameStatus.checking && usernameStatus.available === false && (
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <AlertCircle size={13} /> {usernameStatus.message}
                </span>
              )}
            </div>
            
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                id="username"
                type="text"
                className="form-input"
                placeholder="yourname"
                value={username}
                onChange={(e) => {
                  setUsernameEdited(true);
                  setUsername(normalizeUsername(e.target.value));
                }}
                required
                style={{
                  fontFamily: 'var(--font-mono)',
                  borderColor: usernameStatus.available === false ? 'var(--accent-red)' : usernameStatus.available === true ? 'var(--accent-green)' : undefined
                }}
              />
            </div>

            <div style={{
              marginTop: '6px',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap'
            }}>
              <span>Live link:</span>
              <code style={{
                color: 'var(--brand-orange)',
                fontWeight: 600,
                backgroundColor: 'var(--brand-orange-light)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                builtd.vercel.app/{username || 'yourname'}
              </code>
            </div>
          </div>


          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Re-type your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-brand"
            style={{ width: '100%', marginTop: '12px', padding: '14px' }}
          >
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '24px 0',
          color: 'var(--text-muted)',
          fontSize: '0.8125rem'
        }}>
          <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--border-default)' }} />
          <span>OR</span>
          <div style={{ flexGrow: 1, height: '1px', backgroundColor: 'var(--border-default)' }} />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="btn btn-secondary"
          style={{ width: '100%', padding: '12px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Continue with Google
        </button>

        <p style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          marginTop: '24px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--brand-orange)', fontWeight: 600 }}>
            Login →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
