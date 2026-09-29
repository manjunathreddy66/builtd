// Color manipulation & contrast helpers
export const hexToRgba = (hex, alpha = 1) => {
  if (!hex || typeof hex !== 'string') return `rgba(0, 0, 0, ${alpha})`;
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  if (c.length !== 6) return hex;
  const num = parseInt(c, 16);
  if (isNaN(num)) return hex;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const isColorDark = (hex) => {
  if (!hex || typeof hex !== 'string') return false;
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  if (c.length !== 6) return false;
  const num = parseInt(c, 16);
  if (isNaN(num)) return false;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  // Perceived relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};

export const adjustBrightness = (hex, percent) => {
  if (!hex || typeof hex !== 'string') return hex;
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  if (c.length !== 6) return hex;
  const num = parseInt(c, 16);
  if (isNaN(num)) return hex;
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const getThemeStyles = (settings = {}) => {
  const theme = settings.theme || 'light';
  const accent = settings.accent || 'orange';
  const font = settings.font || 'space';
  const textInversion = Boolean(settings.textInversion);
  const bgPattern = settings.bgPattern || 'dots'; // 'dots', 'grid', 'clean', 'soft'

  // Custom UI evaluation
  const isCustomUi = Boolean(
    settings.customUiEnabled ||
    settings.customUi ||
    settings.colorMode === 'custom'
  );

  const customBgColor = settings.customBgColor || '#F8F9FA';
  const customTextColor = settings.customTextColor || '#111827';
  const customHighlightColor = settings.customHighlightColor || '#F25C22';

  // Accent mapping for presets
  const accentColors = {
    orange: {
      primary: '#F25C22',
      hover: '#D84811',
      subtle: 'rgba(242, 92, 34, 0.08)',
      glow: 'rgba(242, 92, 34, 0.25)'
    },
    blue: {
      primary: '#2563EB',
      hover: '#1D4ED8',
      subtle: 'rgba(37, 99, 235, 0.08)',
      glow: 'rgba(37, 99, 235, 0.25)'
    },
    purple: {
      primary: '#7C3AED',
      hover: '#6D28D9',
      subtle: 'rgba(124, 58, 237, 0.08)',
      glow: 'rgba(124, 58, 237, 0.25)'
    },
    green: {
      primary: '#059669',
      hover: '#047857',
      subtle: 'rgba(5, 150, 105, 0.08)',
      glow: 'rgba(5, 150, 105, 0.25)'
    },
    red: {
      primary: '#DC2626',
      hover: '#B91C1C',
      subtle: 'rgba(220, 38, 38, 0.08)',
      glow: 'rgba(220, 38, 38, 0.25)'
    }
  };

  const selectedAccent = accentColors[accent] || accentColors.orange;

  // Font family mapping
  const fonts = {
    space: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    inter: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', monospace"
  };

  const selectedFont = fonts[font] || fonts.space;

  // Determine whether current background is dark
  const isDark = isCustomUi ? isColorDark(customBgColor) : false;

  // Compute theme variables based on Custom UI or Preset Mode
  let bgMain, bgCard, bgSubtle, textPrimary, textSecondary, textMuted, borderDefault, borderLight;
  let accentColor, accentHover, accentSubtle, accentGlow, accentText;

  if (isCustomUi) {
    // 1. Custom Background Colour
    bgMain = customBgColor;
    if (isDark) {
      bgCard = adjustBrightness(customBgColor, 7);
      bgSubtle = hexToRgba('#FFFFFF', 0.07);
      borderDefault = hexToRgba('#FFFFFF', 0.12);
      borderLight = hexToRgba('#FFFFFF', 0.06);
    } else {
      bgCard = '#FFFFFF';
      bgSubtle = hexToRgba('#000000', 0.04);
      borderDefault = hexToRgba('#000000', 0.09);
      borderLight = hexToRgba('#000000', 0.05);
    }

    // 2. Custom Text Colour (Applied to all texts)
    textPrimary = customTextColor;
    textSecondary = hexToRgba(customTextColor, 0.78);
    textMuted = hexToRgba(customTextColor, 0.52);

    // 3. Custom Highlighted Text Colour (Applied to highlighted texts)
    accentColor = customHighlightColor;
    accentHover = adjustBrightness(customHighlightColor, -12);
    accentSubtle = hexToRgba(customHighlightColor, 0.14);
    accentGlow = hexToRgba(customHighlightColor, 0.3);
    accentText = isColorDark(customHighlightColor) ? '#FFFFFF' : '#111827';
  } else {
    // Preset Theme Mode
    bgMain = '#F8F9FA';
    bgCard = '#FFFFFF';
    bgSubtle = '#F1F3F5';
    textPrimary = '#111827';
    textSecondary = '#4B5563';
    textMuted = '#9CA3AF';
    borderDefault = '#E5E7EB';
    borderLight = '#F3F4F6';
    accentColor = selectedAccent.primary;
    accentHover = selectedAccent.hover;
    accentSubtle = selectedAccent.subtle;
    accentGlow = selectedAccent.glow;
    accentText = '#FFFFFF';
  }

  // Generate clear, readable background pattern style
  const getPatternStyle = (dark) => {
    if (bgPattern === 'clean') {
      return { backgroundImage: 'none' };
    }
    if (bgPattern === 'grid') {
      const lineColor = dark ? 'rgba(255, 255, 255, 0.045)' : 'rgba(0, 0, 0, 0.04)';
      return {
        backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
        backgroundAttachment: 'fixed'
      };
    }
    if (bgPattern === 'soft') {
      return dark ? {
        backgroundImage: `radial-gradient(ellipse at top, ${hexToRgba(accentColor, 0.08)}, transparent 70%)`,
        backgroundAttachment: 'fixed'
      } : {
        backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
        backgroundAttachment: 'fixed'
      };
    }
    // Default 'dots': Subtle micro-dots for clean engineering structure
    const dotColor = dark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.07)';
    return {
      backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      backgroundAttachment: 'fixed'
    };
  };

  const bgPatternStyle = getPatternStyle(isDark);

  return {
    isCustomUi,
    bgMain,
    bgCard,
    bgSubtle,
    textPrimary,
    textSecondary,
    textMuted,
    borderDefault,
    borderLight,
    accent: accentColor,
    accentHover,
    accentSubtle,
    accentGlow,
    accentText,
    fontFamily: selectedFont,
    isDark,
    textInversion,
    bgPattern,
    bgPatternStyle,
    rootStyle: {
      backgroundColor: bgMain,
      ...bgPatternStyle,
      color: textPrimary,
      fontFamily: selectedFont,
      minHeight: '100vh',
      lineHeight: 1.6,
      transition: 'background-color 0.2s ease, color 0.2s ease',
      '--text-primary': textPrimary,
      '--text-secondary': textSecondary,
      '--text-muted': textMuted,
      '--brand-orange': accentColor,
      '--brand-primary': accentColor,
      '--bg-main': bgMain,
      '--bg-card': bgCard,
      '--border-default': borderDefault,
      '--border-light': borderLight
    },
    // Inverted typography styling for high-contrast presentation
    invertedTitleStyle: textInversion ? {
      backgroundColor: isCustomUi ? accentColor : (isDark ? '#FFFFFF' : '#111827'),
      color: isCustomUi ? (isColorDark(accentColor) ? '#FFFFFF' : '#111827') : (isDark ? '#111827' : '#FFFFFF'),
      padding: '2px 14px',
      display: 'inline-block',
      borderRadius: '4px',
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone'
    } : {},
    invertedBadgeStyle: textInversion ? {
      backgroundColor: bgSubtle,
      color: textPrimary,
      fontWeight: 700
    } : {}
  };
};
