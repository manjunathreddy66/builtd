export const getThemeStyles = (settings = {}) => {
  const theme = settings.theme || 'light';
  const accent = settings.accent || 'orange';
  const font = settings.font || 'space';
  const textInversion = Boolean(settings.textInversion);
  const bgPattern = settings.bgPattern || 'dots'; // 'dots', 'grid', 'clean', 'soft'

  // Accent mapping
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

  // Generate clear, readable background pattern style
  const getPatternStyle = (isDark) => {
    if (bgPattern === 'clean') {
      return { backgroundImage: 'none' };
    }
    if (bgPattern === 'grid') {
      const lineColor = isDark ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.04)';
      return {
        backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: '36px 36px',
        backgroundAttachment: 'fixed'
      };
    }
    if (bgPattern === 'soft') {
      const glowColor = isDark ? 'rgba(242, 92, 34, 0.07)' : 'rgba(242, 92, 34, 0.04)';
      return {
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${glowColor} 0%, transparent 65%)`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      };
    }
    // Default 'dots': Subtle micro-dots for clean engineering structure
    const dotColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)';
    return {
      backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      backgroundAttachment: 'fixed'
    };
  };

  // Crisp Modern Light Theme (Black theme removed)
  const bgPatternStyle = getPatternStyle(false);
  return {
    bgMain: '#F8F9FA',
    bgCard: '#FFFFFF',
    bgSubtle: '#F1F3F5',
    textPrimary: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    borderDefault: '#E5E7EB',
    borderLight: '#F3F4F6',
    accent: selectedAccent.primary,
    accentHover: selectedAccent.hover,
    accentSubtle: selectedAccent.subtle,
    fontFamily: selectedFont,
    isDark: false,
    textInversion,
    bgPattern,
    bgPatternStyle,
    rootStyle: {
      backgroundColor: '#F8F9FA',
      ...bgPatternStyle,
      color: '#111827',
      fontFamily: selectedFont,
      minHeight: '100vh',
      lineHeight: 1.6,
      transition: 'background-color 0.2s ease, color 0.2s ease'
    },
    // Inverted typography styling for high-contrast presentation
    invertedTitleStyle: textInversion ? {
      backgroundColor: '#111827',
      color: '#FFFFFF',
      padding: '2px 14px',
      display: 'inline-block',
      borderRadius: '4px',
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone'
    } : {},
    invertedBadgeStyle: textInversion ? {
      backgroundColor: '#F3F4F6',
      color: '#111827',
      fontWeight: 700
    } : {}
  };
};
