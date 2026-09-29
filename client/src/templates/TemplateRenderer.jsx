import React from 'react';
import MinimalTemplate from './MinimalTemplate';
import EditorialTemplate from './EditorialTemplate';
import GridTemplate from './GridTemplate';
import CreativeTemplate from './CreativeTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import { PortfolioFloatingBar } from '../components/common/PortfolioFloatingBar';

export const TEMPLATE_OPTIONS = [
  {
    id: 'editorial',
    name: '02 — EDITORIAL',
    description: 'Swiss typographic layout with bold asymmetric hierarchy and magazine aesthetics.',
    badge: 'Recommended'
  },
  {
    id: 'minimal',
    name: '01 — MINIMAL',
    description: 'Serene typography, generous whitespace, and pure focus on essential content.',
    badge: 'Classic'
  },
  {
    id: 'grid',
    name: '03 — GRID',
    description: 'Modular Bento-grid layout with high visual density and organized cards.',
    badge: 'Modern'
  },
  {
    id: 'creative',
    name: '04 — CREATIVE',
    description: 'Developer & builder centric with terminal styling and live code accents.',
    badge: 'Tech-First'
  },
  {
    id: 'professional',
    name: '05 — PROFESSIONAL',
    description: 'Executive corporate structure with structured timeline and recruiter clarity.',
    badge: 'Formal'
  }
];

export const TemplateRenderer = ({ data, device = 'desktop', isPreview = false }) => {
  const templateId = data?.settings?.template || 'editorial';

  const renderTemplate = () => {
    switch (templateId) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'editorial':
        return <EditorialTemplate data={data} />;
      case 'grid':
        return <GridTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      default:
        return <EditorialTemplate data={data} />;
    }
  };

  if (!isPreview) {
    return (
      <div className="portfolio-wrapper" style={{ position: 'relative' }}>
        {renderTemplate()}
        <PortfolioFloatingBar data={data} />
      </div>
    );
  }

  // Preview frame wrapper for Desktop / Tablet / Mobile preview simulation
  let frameWidth = '100%';
  let frameHeight = '100%';
  let maxWidth = '100%';

  if (device === 'mobile') {
    maxWidth = '390px';
    frameHeight = '720px';
  } else if (device === 'tablet') {
    maxWidth = '768px';
    frameHeight = '840px';
  }

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: device === 'desktop' ? '0' : '20px 0'
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: maxWidth,
          height: device === 'desktop' ? 'auto' : frameHeight,
          overflowY: 'auto',
          border: device === 'desktop' ? 'none' : '8px solid #222222',
          borderRadius: device === 'desktop' ? '0' : device === 'mobile' ? '36px' : '20px',
          boxShadow: device === 'desktop' ? 'none' : '0 20px 50px rgba(0,0,0,0.2)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          backgroundColor: '#FFFFFF'
        }}
        className="preview-device-frame"
      >
        {/* Mobile speaker notch indicator */}
        {device === 'mobile' && (
          <div style={{
            position: 'sticky',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '18px',
            backgroundColor: '#111111',
            borderRadius: '12px',
            zIndex: 99,
            margin: '0 auto -18px auto'
          }} />
        )}

        {renderTemplate()}
      </div>
    </div>
  );
};

export default TemplateRenderer;
