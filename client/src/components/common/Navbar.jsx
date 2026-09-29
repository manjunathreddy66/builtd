import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X, ArrowRight, LayoutDashboard, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const { portfolio } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();

  // iOS-style scroll status listener for dynamic blur and elevation
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthPage = ['/login', '/signup', '/onboarding'].includes(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        {/* Brand Logo: built.png */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }} 
            aria-label="BUILTD"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src="/built.png" 
              alt="BUILTD" 
              style={{ 
                height: '36px', 
                width: 'auto', 
                objectFit: 'contain'
              }} 
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {currentUser && (
            <Link
              to="/editor"
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: location.pathname === '/editor' ? 'var(--brand-orange)' : 'var(--text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
            >
              Editor
            </Link>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="desktop-actions" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link 
                to="/dashboard" 
                className="btn btn-secondary btn-sm ios-btn"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              {portfolio?.username && (
                <Link
                  to={`/${portfolio.username}`}
                  target="_blank"
                  className="btn btn-brand btn-sm ios-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <User size={15} />
                  My Portfolio
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="btn btn-ghost btn-sm ios-btn"
                title="Log out"
                style={{ color: 'var(--text-muted)' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link 
                to="/login" 
                className="btn btn-ghost btn-sm ios-btn"
                style={{ fontWeight: 600 }}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-brand btn-sm ios-btn"
              >
                Build My Portfolio <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle ios-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            padding: '8px 10px',
            color: 'var(--text-primary)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            border: '1px solid var(--border-default)',
            borderRadius: '10px'
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer (iOS Frosted Glass Sheet) */}
      {mobileMenuOpen && (
        <div className="mobile-menu ios-mobile-sheet" style={{
          padding: '20px 18px 26px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>

          {currentUser ? (
            <>
              <Link 
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary ios-btn"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              {portfolio?.username && (
                <Link
                  to={`/${portfolio.username}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-brand ios-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <User size={16} /> View My Portfolio
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn btn-ghost ios-btn"
                style={{ width: '100%', justifyContent: 'center', color: 'var(--accent-red)' }}
              >
                <LogOut size={16} /> Log out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary ios-btn"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Login
              </Link>
              <Link 
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-brand ios-btn"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Build My Portfolio →
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Media query styling inline */}
      <style>{`
        @media (max-width: 820px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
