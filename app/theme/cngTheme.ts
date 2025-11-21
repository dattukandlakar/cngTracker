import type { ImageSourcePropType } from 'react-native';

// Use local image from assets folder
export const CNG_BACKGROUND_IMAGE = require('../../asset/images/background.png');

export const cngColors = {
  // Primary palette: deep blue to teal for backgrounds; fresh lime for CTAs
  primary: '#9DEE73',        // Lime CTA base (less neon)
  primaryDark: '#164B8A',    // Deep blue background base
  primaryDarker: '#0D2A56',  // Darker navy
  
  // Accent colors
  accent: '#00D4FF',         // Cyan accent
  accentSoft: '#8AD9F0',
  
  // Surface colors (neutral, less green)
  surface: 'rgba(255, 255, 255, 0.12)',
  surfaceHover: 'rgba(255, 255, 255, 0.18)',
  surfaceAlt: 'rgba(255, 255, 255, 0.18)',
  
  // Border colors (soft white)
  border: 'rgba(255, 255, 255, 0.28)',
  borderAlt: 'rgba(255, 255, 255, 0.18)',
  
  // Text colors
  textOnDark: '#FFFFFF',
  textMuted: 'rgba(255, 255, 255, 0.72)',
  textButton: '#0F2C3E',     // Dark text for bright buttons
  
  // Status colors
  error: '#EF4444',
  errorSoft: '#FCA5A5',
  success: '#22C55E',
  warning: '#F59E0B',
} as const;

// Button Gradient Colors - Use these globally for all buttons
export const buttonGradients = {
  primary: ['#D5F981', '#A9F06E', '#75DE5F'] as string[],     // Lime CTA gradient
  secondary: ['#7BD9F4', '#39C8EE', '#10B3E6'] as string[],   // Cyan gradient
  success: ['#A8E48C', '#6FD874', '#33C762'] as string[],     // Softer green
  danger: ['#FECACA', '#F87171', '#EF4444'] as string[],      // Red gradient
};

// Common button styles - Import and spread these in your button styles
export const buttonStyles = {
  container: {
    shadowColor: '#A9F06E',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  gradient: {
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center' as const,
  },
  text: {
    color: cngColors.textButton,
    fontWeight: '800' as const,
    fontSize: 16,
    letterSpacing: 0.8,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
};