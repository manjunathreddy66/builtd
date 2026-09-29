import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BUILTD Brand Logo Component
 * - built.png brand mark
 */
export const Logo = ({ 
  variant = 'compact', 
  height, 
  width, 
  to = '/', 
  className = '', 
  withLink = true 
}) => {
  const isMain = variant === 'main';
  const src = '/built.png';
  const altText = 'BUILTD';

  // Default optimal heights ensuring 0 distortion and native aspect ratio
  const defaultHeight = isMain ? 48 : 32;
  const appliedHeight = height || defaultHeight;

  const imageElement = (
    <img
      src={src}
      alt={altText}
      style={{
        height: typeof appliedHeight === 'number' ? `${appliedHeight}px` : appliedHeight,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
      className={`builtd-logo builtd-logo-${variant} ${className}`}
      loading="eager"
    />
  );

  if (!withLink) {
    return imageElement;
  }

  return (
    <Link 
      to={to} 
      className="builtd-logo-link"
      style={{ display: 'inline-flex', alignItems: 'center' }}
      aria-label="BUILTD Home"
    >
      {imageElement}
    </Link>
  );
};

export default Logo;
