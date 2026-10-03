import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/layout';

export function AuraButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) {
  const isPrimary   = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline   = variant === 'outline';
  const isDanger    = variant === 'danger';
  const isGhost     = variant === 'ghost';

  const containerStyles = [
    styles.button,
    isPrimary   && styles.btnPrimary,
    isSecondary && styles.btnSecondary,
    isOutline   && styles.btnOutline,
    isDanger    && styles.btnDanger,
    isGhost     && styles.btnGhost,
    size === 'sm' && styles.btnSm,
    size === 'lg' && styles.btnLg,
    disabled && styles.btnDisabled,
    style,
  ];

  const textStyles = [
    styles.text,
    isPrimary   && styles.textPrimary,
    isSecondary && styles.textSecondary,
    isOutline   && styles.textOutline,
    isDanger    && styles.textDanger,
    isGhost     && styles.textGhost,
    size === 'sm' && styles.textSm,
    size === 'lg' && styles.textLg,
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary || isDanger ? '#FFF' : COLORS.accent}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: { marginRight: SPACING.sm },

  btnPrimary:   { backgroundColor: COLORS.accent, ...SHADOWS.button },
  btnSecondary: { backgroundColor: COLORS.surfaceSubtle, borderWidth: 1, borderColor: COLORS.border },
  btnOutline:   { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.accent },
  btnDanger:    { backgroundColor: COLORS.critical },
  btnGhost:     { backgroundColor: 'transparent', paddingVertical: SPACING.sm, paddingHorizontal: SPACING.sm },

  btnSm: { paddingVertical: SPACING.xs + 3, paddingHorizontal: SPACING.md, borderRadius: RADIUS.md },
  btnLg: { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl, borderRadius: RADIUS.xl },
  btnDisabled: { backgroundColor: COLORS.surfaceMuted, borderColor: COLORS.border, shadowOpacity: 0, elevation: 0 },

  text:          { fontWeight: '700', fontSize: 14, textAlign: 'center' },
  textPrimary:   { color: '#FFFFFF' },
  textSecondary: { color: COLORS.textPrimary },
  textOutline:   { color: COLORS.accentLight },
  textDanger:    { color: '#FFFFFF' },
  textGhost:     { color: COLORS.accentLight },
  textSm:        { fontSize: 12 },
  textLg:        { fontSize: 16, fontWeight: '800' },
  textDisabled:  { color: COLORS.textMuted },
});
