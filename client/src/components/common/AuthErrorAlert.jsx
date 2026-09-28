import React from 'react';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatAuthError } from '../../utils/authErrors';

export const AuthErrorAlert = ({ error, onClose, onForgotPassword }) => {
  if (!error) return null;

  const formatted = typeof error === 'object' && error.title && error.description 
    ? error 
    : formatAuthError(error);

  if (!formatted) return null;

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        backgroundColor: '#FFF1F2',
        border: '1px solid #FECDD3',
        borderLeft: '4px solid #E11D48',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(225, 29, 72, 0.06)',
        animation: 'authAlertFadeIn 0.25s ease-out'
      }}
    >
      {/* Icon badge */}
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#FFE4E6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: '1px'
      }}>
        <AlertTriangle size={16} color="#E11D48" />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 700,
          color: '#9F1239',
          letterSpacing: '-0.01em',
          marginBottom: '3px'
        }}>
          {formatted.title}
        </div>
        <p style={{
          fontSize: '0.8125rem',
          color: '#881337',
          lineHeight: '1.45',
          margin: 0,
          opacity: 0.95
        }}>
          {formatted.description}
        </p>

        {/* Action Link / Button if applicable */}
        {formatted.actionType === 'forgot-password' && onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78125rem',
              fontWeight: 700,
              color: '#BE123C',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {formatted.actionText || 'Reset your password'} <ArrowRight size={12} />
          </button>
        )}

        {formatted.actionType === 'signup' && (
          <Link
            to="/signup"
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78125rem',
              fontWeight: 700,
              color: '#BE123C',
              textDecoration: 'underline'
            }}
          >
            {formatted.actionText || 'Create an account'} <ArrowRight size={12} />
          </Link>
        )}

        {formatted.actionType === 'login' && (
          <Link
            to="/login"
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.78125rem',
              fontWeight: 700,
              color: '#BE123C',
              textDecoration: 'underline'
            }}
          >
            {formatted.actionText || 'Go to login'} <ArrowRight size={12} />
          </Link>
        )}
      </div>

      {/* Dismiss Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss error"
          style={{
            background: 'none',
            border: 'none',
            color: '#BE123C',
            opacity: 0.7,
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'opacity 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};
