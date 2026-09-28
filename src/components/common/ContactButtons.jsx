import React, { useState } from 'react';
import { 
  Github, 
  Linkedin, 
  Whatsapp, 
  MailIcon, 
  LeetCode, 
  Codeforces, 
  CodeChef, 
  TwitterX, 
  PhoneCall 
} from './Icons';
import { ExternalLink, Copy, Check } from 'lucide-react';

export const ContactButtons = ({ 
  links = {}, 
  theme = {}, 
  variant = 'hero', // 'hero', 'section', 'nav'
  style = {} 
}) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getCleanUrl = (url, prefix = '') => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      return url;
    }
    return `${prefix}${url}`;
  };

  // Build active contact items
  const items = [];

  if (links.email) {
    items.push({
      key: 'email',
      label: 'Email',
      actionLabel: 'Send Email',
      url: `mailto:${links.email}`,
      displayVal: links.email,
      icon: <MailIcon size={16} />,
      brandColor: '#EA4335',
      brandBg: 'rgba(234, 67, 53, 0.1)',
      isEmail: true
    });
  }

  if (links.linkedin) {
    items.push({
      key: 'linkedin',
      label: 'LinkedIn',
      actionLabel: 'Connect',
      url: getCleanUrl(links.linkedin, 'https://linkedin.com/in/'),
      displayVal: links.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, ''),
      icon: <Linkedin size={16} />,
      brandColor: '#0A66C2',
      brandBg: 'rgba(10, 102, 194, 0.1)'
    });
  }

  if (links.github) {
    items.push({
      key: 'github',
      label: 'GitHub',
      actionLabel: 'Follow',
      url: getCleanUrl(links.github, 'https://github.com/'),
      displayVal: links.github.replace(/^https?:\/\/(www\.)?github\.com\//i, '').replace(/\/$/, ''),
      icon: <Github size={16} />,
      brandColor: theme.isDark ? '#F0F6FC' : '#24292F',
      brandBg: theme.isDark ? 'rgba(240, 246, 252, 0.1)' : 'rgba(36, 41, 47, 0.08)'
    });
  }

  if (links.whatsapp || links.phone) {
    const rawNum = (links.whatsapp || links.phone || '').replace(/[^0-9]/g, '');
    items.push({
      key: 'whatsapp',
      label: 'WhatsApp',
      actionLabel: 'Chat',
      url: `https://wa.me/${rawNum}`,
      displayVal: links.whatsapp || links.phone,
      icon: <Whatsapp size={16} />,
      brandColor: '#25D366',
      brandBg: 'rgba(37, 211, 102, 0.1)'
    });
  }

  if (links.leetcode) {
    items.push({
      key: 'leetcode',
      label: 'LeetCode',
      actionLabel: 'Profile',
      url: getCleanUrl(links.leetcode, 'https://leetcode.com/u/'),
      displayVal: links.leetcode.replace(/^https?:\/\/(www\.)?leetcode\.com\/(u\/)?/i, '').replace(/\/$/, ''),
      icon: <LeetCode size={16} />,
      brandColor: '#FFA116',
      brandBg: 'rgba(255, 161, 22, 0.1)'
    });
  }

  if (links.codeforces) {
    items.push({
      key: 'codeforces',
      label: 'Codeforces',
      actionLabel: 'Profile',
      url: getCleanUrl(links.codeforces, 'https://codeforces.com/profile/'),
      displayVal: links.codeforces.replace(/^https?:\/\/(www\.)?codeforces\.com\/profile\//i, '').replace(/\/$/, ''),
      icon: <Codeforces size={16} />,
      brandColor: '#1F8ACB',
      brandBg: 'rgba(31, 138, 203, 0.1)'
    });
  }

  if (links.codechef) {
    items.push({
      key: 'codechef',
      label: 'CodeChef',
      actionLabel: 'Profile',
      url: getCleanUrl(links.codechef, 'https://www.codechef.com/users/'),
      displayVal: links.codechef.replace(/^https?:\/\/(www\.)?codechef\.com\/users\//i, '').replace(/\/$/, ''),
      icon: <CodeChef size={16} />,
      brandColor: '#5B4638',
      brandBg: 'rgba(91, 70, 56, 0.1)'
    });
  }

  if (links.twitter || links.x) {
    const handle = links.twitter || links.x;
    items.push({
      key: 'twitter',
      label: 'X (Twitter)',
      actionLabel: 'Follow',
      url: getCleanUrl(handle, 'https://x.com/'),
      displayVal: handle.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, '').replace(/\/$/, ''),
      icon: <TwitterX size={16} />,
      brandColor: theme.isDark ? '#FFFFFF' : '#111111',
      brandBg: theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(17, 17, 17, 0.08)'
    });
  }

  if (items.length === 0) return null;

  // HERO VARIANT: Compact, clickable badge-style action buttons with app icons
  if (variant === 'hero') {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center',
        ...style
      }}>
        {items.map((item) => (
          <a
            key={item.key}
            href={item.url}
            target={item.isEmail ? undefined : '_blank'}
            rel={item.isEmail ? undefined : 'noreferrer'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '6px',
              backgroundColor: theme.bgCard || '#FFFFFF',
              border: `1px solid ${theme.borderDefault || '#DDDDDD'}`,
              color: theme.textPrimary || '#111111',
              fontSize: '0.8125rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = item.brandColor;
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${item.brandBg}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.borderDefault || '#DDDDDD';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)';
            }}
          >
            <span style={{ color: item.brandColor, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    );
  }

  // NAV VARIANT: Icon-only buttons for headers
  if (variant === 'nav') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', ...style }}>
        {items.map((item) => (
          <a
            key={item.key}
            href={item.url}
            target={item.isEmail ? undefined : '_blank'}
            rel={item.isEmail ? undefined : 'noreferrer'}
            title={`${item.label}: ${item.displayVal}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: theme.bgCard || 'transparent',
              border: `1px solid ${theme.borderLight || '#EEEEEE'}`,
              color: theme.textSecondary || '#666666',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = item.brandColor;
              e.currentTarget.style.borderColor = item.brandColor;
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.textSecondary || '#666666';
              e.currentTarget.style.borderColor = theme.borderLight || '#EEEEEE';
              e.currentTarget.style.transform = 'none';
            }}
          >
            {item.icon}
          </a>
        ))}
      </div>
    );
  }

  // SECTION VARIANT: Full contact cards with app icon, platform name, copy handle button, and direct link
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '14px',
      ...style
    }}>
      {items.map((item) => {
        const isCopied = copiedKey === item.key;
        return (
          <div
            key={item.key}
            style={{
              backgroundColor: theme.bgCard || '#FFFFFF',
              border: `1px solid ${theme.borderDefault || '#DDDDDD'}`,
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = item.brandColor;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 6px 16px ${item.brandBg}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.borderDefault || '#DDDDDD';
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: item.brandBg,
                color: item.brandColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: theme.textPrimary }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: theme.textSecondary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '130px'
                }}>
                  {item.displayVal}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => copyToClipboard(item.displayVal, item.key)}
                title="Copy Handle/Address"
                style={{
                  background: 'transparent',
                  border: `1px solid ${theme.borderLight || '#DDDDDD'}`,
                  borderRadius: '4px',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  color: isCopied ? '#10B981' : theme.textSecondary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.6875rem',
                  fontWeight: 600
                }}
              >
                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                {isCopied ? 'Copied' : ''}
              </button>

              <a
                href={item.url}
                target={item.isEmail ? undefined : '_blank'}
                rel={item.isEmail ? undefined : 'noreferrer'}
                style={{
                  backgroundColor: item.brandColor,
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{item.actionLabel}</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
