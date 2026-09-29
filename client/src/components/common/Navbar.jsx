import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { Menu, X, ArrowRight, LayoutDashboard, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { portfolio } = usePortfolio();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ['/login', '/signup', '/onboarding'].includes(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(245, 245, 243, 0.88)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-default)',
      transition: 'background-color var(--transition-base)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo: builtd.png */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center' }} aria-label="BUILTD">
            <img 
              src="/builtd.png" 
              alt="BUILTD" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
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
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              {portfolio?.username && (
                <Link
                  to={`/${portfolio.username}`}
                  target="_blank"
                  className="btn btn-brand btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <User size={15} />
                  My Portfolio
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="btn btn-ghost btn-sm"
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
                className="btn btn-ghost btn-sm"
                style={{ fontWeight: 600 }}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-brand btn-sm"
              >
                Build My Portfolio <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            padding: '8px',
            color: 'var(--text-primary)'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{
          backgroundColor: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-default)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>

          {currentUser ? (
            <>
              <Link 
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              {portfolio?.username && (
                <Link
                  to={`/${portfolio.username}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-brand"
                  style={{ width: '100%' }}
                >
                  <User size={16} /> View My Portfolio
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <LogOut size={16} /> Log out
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                Login
              </Link>
              <Link 
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-brand"
                style={{ width: '100%' }}
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
