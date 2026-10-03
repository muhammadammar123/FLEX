import { Platform } from 'react-native';

export const SPACING = {
  xs:  4,
  sm:  8,
  md:  14,
  lg:  20,
  xl:  28,
  xxl: 40,
};

export const RADIUS = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  28,
  full: 9999,
};

export const SHADOWS = {
  card: Platform.select({
    ios: {
      shadowColor: '#7C3AED',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
    },
    android: { elevation: 4 },
    default: { boxShadow: '0px 2px 12px rgba(124, 58, 237, 0.08)' },
  }),
  cardHover: Platform.select({
    ios: {
      shadowColor: '#7C3AED',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.20,
      shadowRadius: 20,
    },
    android: { elevation: 8 },
    default: { boxShadow: '0px 6px 20px rgba(124, 58, 237, 0.20)' },
  }),
  button: Platform.select({
    ios: {
      shadowColor: '#7C3AED',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.40,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
    default: { boxShadow: '0px 4px 12px rgba(124, 58, 237, 0.40)' },
  }),
  glow: Platform.select({
    ios: {
      shadowColor: '#7C3AED',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.50,
      shadowRadius: 20,
    },
    android: { elevation: 10 },
    default: { boxShadow: '0px 0px 20px rgba(124, 58, 237, 0.50)' },
  }),
};
