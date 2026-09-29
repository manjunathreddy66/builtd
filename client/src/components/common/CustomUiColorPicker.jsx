import React, { useState } from 'react';
import { Palette, Sparkles, Check, RotateCcw, Paintbrush, Type, Highlighter } from 'lucide-react';
import { isColorDark, hexToRgba } from '../../templates/templateUtils';

const PRESET_ACCENTS = [
  { id: 'orange', name: 'BUILTD Orange', color: '#F25C22' },
  { id: 'blue', name: 'Electric Blue', color: '#2563EB' },
  { id: 'purple', name: 'Neon Violet', color: '#7C3AED' },
  { id: 'green', name: 'Emerald', color: '#059669' },
  { id: 'red', name: 'Crimson', color: '#DC2626' }
];

const SWATCHES_BG = [
  { label: 'Default', color: '#F8F9FA' },
  { label: 'White', color: '#FFFFFF' },
  { label: 'Warm Cream', color: '#FAF8F5' },
  { label: 'Deep Slate', color: '#0F172A' },
  { label: 'Obsidian', color: '#121212' },
  { label: 'Pure Black', color: '#000000' }
];

const SWATCHES_TEXT = [
  { label: 'Charcoal', color: '#111827' },
  { label: 'Pure Black', color: '#000000' },
  { label: 'Crisp White', color: '#F9FAFB' },
  { label: 'Muted Silver', color: '#CBD5E1' },
  { label: 'Warm Sand', color: '#FDF8F0' },
  { label: 'Cool Slate', color: '#475569' }
];

const SWATCHES_HIGHLIGHT = [
  { label: 'Orange', color: '#F25C22' },
  { label: 'Blue', color: '#2563EB' },
  { label: 'Violet', color: '#8B5CF6' },
  { label: 'Emerald', color: '#10B981' },
  { label: 'Crimson', color: '#EF4444' },
  { label: 'Amber', color: '#F59E0B' },
  { label: 'Neon Pink', color: '#EC4899' },
  { label: 'Cyan', color: '#06B6D4' }
];

export const CustomUiColorPicker = ({ settings = {}, updateSettings, compact = false }) => {
  const isCustom = Boolean(settings.customUiEnabled || settings.colorMode === 'custom');

  const customBg = settings.customBgColor || '#F8F9FA';
  const customText = settings.customTextColor || '#111827';
  const customHighlight = settings.customHighlightColor || '#F25C22';
  const currentAccent = settings.accent || 'orange';

  const handleModeChange = (mode) => {
    if (mode === 'custom') {
      updateSettings({
        colorMode: 'custom',
        customUiEnabled: true,
        customBgColor: customBg,
        customTextColor: customText,
        customHighlightColor: customHighlight
      });
    } else {
      updateSettings({
        colorMode: 'preset',
        customUiEnabled: false
      });
    }
  };

  const handleColorChange = (key, value) => {
    updateSettings({
      [key]: value,
      customUiEnabled: true,
      colorMode: 'custom'
    });
  };

  const resetCustomColors = () => {
    updateSettings({
      colorMode: 'preset',
      customUiEnabled: false,
      customBgColor: '#F8F9FA',
      customTextColor: '#111827',
      customHighlightColor: '#F25C22',
      accent: 'orange'
    });
  };

  const previewDark = isColorDark(customBg);

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Mode Switcher Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <label className="form-label" style={{ margin: 0, fontWeight: 700, fontSize: '0.9375rem' }}>
          Color & Theme Styling
        </label>

        <div style={{
          display: 'inline-flex',
          backgroundColor: 'var(--bg-subtle)',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid var(--border-default)'
        }}>
          <button
            type="button"
            onClick={() => handleModeChange('preset')}
            style={{
              padding: '6px 14px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: !isCustom ? 'var(--bg-card)' : 'transparent',
              color: !isCustom ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: !isCustom ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Palette size={14} /> Presets
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('custom')}
            style={{
              padding: '6px 14px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isCustom ? 'var(--bg-card)' : 'transparent',
              color: isCustom ? 'var(--brand-orange)' : 'var(--text-secondary)',
              boxShadow: isCustom ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Sparkles size={14} /> Custom UI
          </button>
        </div>
      </div>

      {/* MODE 1: PRESETS */}
      {!isCustom && (
        <div style={{
          backgroundColor: 'var(--bg-main)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px'
        }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Choose a curated brand accent color for your portfolio:
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {PRESET_ACCENTS.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => updateSettings({ accent: acc.id })}
                className={`chip ${currentAccent === acc.id ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  cursor: 'pointer'
                }}
              >
                <span style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: acc.color,
                  display: 'inline-block'
                }} />
                <span>{acc.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODE 2: CUSTOM UI OPTION */}
      {isCustom && (
        <div style={{
          backgroundColor: 'var(--bg-main)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-sm)',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '12px'
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Custom UI Configuration
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Colors are applied differently to the background, all texts, and highlighted text.
              </div>
            </div>
            <button
              type="button"
              onClick={resetCustomColors}
              title="Reset to default presets"
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--bg-card)',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* 1. Custom Background Color */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '14px',
            borderRadius: '8px',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Paintbrush size={16} color="var(--brand-orange)" />
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Custom Background Colour</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {customBg.toUpperCase()}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Applied to the entire page background, cards, and canvas.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                position: 'relative',
                width: '40px',
                height: '36px',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid var(--border-default)',
                flexShrink: 0
              }}>
                <input
                  type="color"
                  value={customBg}
                  onChange={(e) => handleColorChange('customBgColor', e.target.value)}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '56px',
                    height: '52px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <input
                type="text"
                className="form-input"
                style={{
                  height: '36px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  maxWidth: '120px'
                }}
                maxLength={7}
                value={customBg}
                onChange={(e) => handleColorChange('customBgColor', e.target.value)}
                placeholder="#F8F9FA"
              />
            </div>

            {/* Quick BG Swatches */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginRight: '4px' }}>Quick:</span>
              {SWATCHES_BG.map((sw) => (
                <button
                  key={sw.color}
                  type="button"
                  onClick={() => handleColorChange('customBgColor', sw.color)}
                  style={{
                    fontSize: '0.6875rem',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: customBg.toLowerCase() === sw.color.toLowerCase() ? '1.5px solid var(--brand-orange)' : '1px solid var(--border-default)',
                    backgroundColor: sw.color,
                    color: isColorDark(sw.color) ? '#FFFFFF' : '#111827',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title={sw.label}
                >
                  {sw.label}
                  {customBg.toLowerCase() === sw.color.toLowerCase() && <Check size={10} />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Custom Text Color (Applied to All Texts) */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '14px',
            borderRadius: '8px',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Type size={16} color="var(--brand-orange)" />
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Custom All Text Colour</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {customText.toUpperCase()}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Applied to all texts — headings, body paragraphs, descriptions, and labels.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                position: 'relative',
                width: '40px',
                height: '36px',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid var(--border-default)',
                flexShrink: 0
              }}>
                <input
                  type="color"
                  value={customText}
                  onChange={(e) => handleColorChange('customTextColor', e.target.value)}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '56px',
                    height: '52px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <input
                type="text"
                className="form-input"
                style={{
                  height: '36px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  maxWidth: '120px'
                }}
                maxLength={7}
                value={customText}
                onChange={(e) => handleColorChange('customTextColor', e.target.value)}
                placeholder="#111827"
              />
            </div>

            {/* Quick Text Swatches */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginRight: '4px' }}>Quick:</span>
              {SWATCHES_TEXT.map((sw) => (
                <button
                  key={sw.color}
                  type="button"
                  onClick={() => handleColorChange('customTextColor', sw.color)}
                  style={{
                    fontSize: '0.6875rem',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: customText.toLowerCase() === sw.color.toLowerCase() ? '1.5px solid var(--brand-orange)' : '1px solid var(--border-default)',
                    backgroundColor: sw.color,
                    color: isColorDark(sw.color) ? '#FFFFFF' : '#111827',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title={sw.label}
                >
                  {sw.label}
                  {customText.toLowerCase() === sw.color.toLowerCase() && <Check size={10} />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Custom Highlighted Text Color */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '14px',
            borderRadius: '8px',
            border: '1px solid var(--border-default)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Highlighter size={16} color="var(--brand-orange)" />
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Custom Highlighted Text Colour</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {customHighlight.toUpperCase()}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Applied specifically to highlighted texts, key metrics, skill tags, active badges, and project links.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                position: 'relative',
                width: '40px',
                height: '36px',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid var(--border-default)',
                flexShrink: 0
              }}>
                <input
                  type="color"
                  value={customHighlight}
                  onChange={(e) => handleColorChange('customHighlightColor', e.target.value)}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '56px',
                    height: '52px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>
              <input
                type="text"
                className="form-input"
                style={{
                  height: '36px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  maxWidth: '120px'
                }}
                maxLength={7}
                value={customHighlight}
                onChange={(e) => handleColorChange('customHighlightColor', e.target.value)}
                placeholder="#F25C22"
              />
            </div>

            {/* Quick Highlight Swatches */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginRight: '4px' }}>Quick:</span>
              {SWATCHES_HIGHLIGHT.map((sw) => (
                <button
                  key={sw.color}
                  type="button"
                  onClick={() => handleColorChange('customHighlightColor', sw.color)}
                  style={{
                    fontSize: '0.6875rem',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: customHighlight.toLowerCase() === sw.color.toLowerCase() ? '1.5px solid #111111' : '1px solid var(--border-default)',
                    backgroundColor: sw.color,
                    color: isColorDark(sw.color) ? '#FFFFFF' : '#111827',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title={sw.label}
                >
                  {sw.label}
                  {customHighlight.toLowerCase() === sw.color.toLowerCase() && <Check size={10} />}
                </button>
              ))}
            </div>
          </div>

          {/* Live Mini Preview Box */}
          <div style={{
            backgroundColor: customBg,
            border: `1.5px solid ${previewDark ? hexToRgba('#FFFFFF', 0.18) : hexToRgba('#000000', 0.12)}`,
            borderRadius: '10px',
            padding: '16px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: previewDark ? hexToRgba(customText, 0.6) : hexToRgba(customText, 0.6)
              }}>
                Live Custom UI Preview
              </span>
              <span style={{
                backgroundColor: hexToRgba(customHighlight, 0.15),
                color: customHighlight,
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '999px',
                border: `1px solid ${hexToRgba(customHighlight, 0.3)}`
              }}>
                ⭐ Highlighted Badge
              </span>
            </div>

            <div style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: customText,
              letterSpacing: '-0.02em',
              marginBottom: '4px'
            }}>
              Heading in Your Custom Text Colour
            </div>

            <p style={{
              fontSize: '0.875rem',
              color: hexToRgba(customText, 0.78),
              margin: '0 0 12px 0',
              lineHeight: 1.5
            }}>
              This paragraph is displayed using your <strong style={{ color: customText }}>Custom Text Colour</strong>, while key callouts shine in your <span style={{ color: customHighlight, fontWeight: 700 }}>Custom Highlight Colour</span> against the <strong style={{ color: customText }}>Custom Background Colour</strong>.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: customHighlight,
                textDecoration: 'underline'
              }}>
                Active Link Text →
              </span>
              <span style={{
                fontSize: '0.75rem',
                backgroundColor: customHighlight,
                color: isColorDark(customHighlight) ? '#FFFFFF' : '#111827',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600
              }}>
                Accent Button
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomUiColorPicker;
