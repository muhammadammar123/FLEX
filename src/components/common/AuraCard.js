import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/layout';

export function AuraCard({ children, style, variant = 'default' }) {
  const cardStyle = [
    styles.card,
    variant === 'elevated' && styles.elevated,
    variant === 'accent'   && styles.accent,
    variant === 'bordered' && styles.bordered,
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  elevated: {
    backgroundColor: COLORS.surfaceElevated,
    borderColor: COLORS.accentBorder,
    ...SHADOWS.cardHover,
  },
  accent: {
    backgroundColor: COLORS.surfaceElevated,
    borderWidth: 1.5,
    borderColor: COLORS.accentBorder,
    ...SHADOWS.glow,
  },
  bordered: {
    borderWidth: 1.5,
    borderColor: COLORS.accentBorder,
  },
});
