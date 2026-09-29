import React, { useState } from 'react';
import { Share2, Download, Mail, Check, ExternalLink, UserPlus, FileText } from 'lucide-react';

/**
 * Downloads a standard .vcf (vCard 3.0) file directly to the user's device.
 * Supported by iOS Contacts, Android Contacts, macOS, and Windows.
 */
export const downloadVCard = (profile = {}, links = {}, username = '') => {
  const name = profile.name || username || 'Candidate';
  const title = profile.headline || 'Student / Engineer';
  const email = links.email || '';
  const phone = links.phone || '';
  const url = `https://builtd.vercel.app/${username}`;

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `TITLE:${title}`,
    email ? `EMAIL;TYPE=INTERNET:${email}` : '',
    phone ? `TEL;TYPE=CELL:${phone}` : '',
    `URL:${url}`,
    `NOTE:Portfolio built with BUILTD: ${url}`,
    'END:VCARD'
  ].filter(Boolean).join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = `${username || 'contact'}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
};

export const PortfolioFloatingBar = ({ data = {} }) => {
  const [copied, setCopied] = useState(false);
  const { profile = {}, links = {}, resumeUrl = '', username = '' } = data;

  const publicUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://builtd.vercel.app/${username}`;

  // Native share or clipboard fallback
  const handleShare = async () => {
    const shareTitle = `${profile.name || username} — BUILTD Portfolio`;
    const shareText = profile.headline || `Check out ${profile.name || username}'s portfolio on BUILTD.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: publicUrl
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    // Fallback: Copy link
    navigator.clipboard?.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSaveContact = () => {
    downloadVCard(profile, links, username);
  };

  return (
    <>
      {/* Toast Notification */}
      {copied && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          padding: '10px 18px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
          zIndex: 9999,
          animation: 'iosSpringUp 0.35s cubic-bezier(0.32, 0.72, 0, 1)'
        }}>
          <Check size={16} color="#10B981" />
          <span>Portfolio link copied to clipboard!</span>
        </div>
      )}

      {/* Floating Bottom Island Bar */}
      <div 
        className="portfolio-floating-dock"
        style={{
          position: 'fixed',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 900,
          maxWidth: '92vw',
          width: 'auto'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px) saturate(190%)',
          WebkitBackdropFilter: 'blur(20px) saturate(190%)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '999px',
          boxShadow: '0 16px 38px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
        }}>
          
          {/* Candidate Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 6px 0 4px' }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.25)',
              display: 'inline-block'
            }} />
            <span style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: '#111827',
              whiteSpace: 'nowrap',
              maxWidth: '120px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {profile.name || username}
            </span>
          </div>

          <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(0, 0, 0, 0.08)', margin: '0 2px' }} />

          {/* Action 1: Share Link */}
          <button
            onClick={handleShare}
            className="ios-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              border: 'none',
              borderRadius: '999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#1F2937',
              cursor: 'pointer'
            }}
            title="Share portfolio"
          >
            <Share2 size={14} color="#F25C22" />
            <span className="dock-label">Share</span>
          </button>

          {/* Action 2: Save Contact (vCard) */}
          <button
            onClick={handleSaveContact}
            className="ios-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              border: 'none',
              borderRadius: '999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#1F2937',
              cursor: 'pointer'
            }}
            title="Save contact card to phone (.vcf)"
          >
            <UserPlus size={14} color="#2563EB" />
            <span className="dock-label">Save Contact</span>
          </button>

          {/* Action 3: Resume (if available) */}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="ios-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                backgroundColor: 'rgba(242, 92, 34, 0.1)',
                border: 'none',
                borderRadius: '999px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#F25C22',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              title="Open Resume"
            >
              <FileText size={14} />
              <span className="dock-label">Resume</span>
            </a>
          )}

          {/* Action 4: Email / Contact */}
          {links.email && (
            <a
              href={`mailto:${links.email}`}
              className="ios-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                backgroundColor: '#F25C22',
                color: '#FFFFFF',
                borderRadius: '50%',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              title={`Email ${profile.name || username}`}
            >
              <Mail size={15} />
            </a>
          )}

        </div>
      </div>

      {/* Floating dock responsive style */}
      <style>{`
        @media (max-width: 480px) {
          .dock-label {
            display: none;
          }
          .portfolio-floating-dock {
            bottom: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioFloatingBar;
