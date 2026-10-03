import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/layout';

export function StatusBadge({ status = 'SAFE', label, size = 'md' }) {
  let bg          = COLORS.safeSoft;
  let textCol     = COLORS.safe;
  let borderColor = COLORS.safeBorder;
  let displayLabel = label || status;

  switch (status.toUpperCase()) {
    case 'SAFE':
      bg = COLORS.safeSoft; textCol = COLORS.safe; borderColor = COLORS.safeBorder;
      displayLabel = label || '≥80% Safe';
      break;
    case 'WARNING':
      bg = COLORS.warningSoft; textCol = COLORS.warning; borderColor = COLORS.warningBorder;
      displayLabel = label || 'Warning';
      break;
    case 'CRITICAL':
      bg = COLORS.criticalSoft; textCol = COLORS.critical; borderColor = COLORS.criticalBorder;
      displayLabel = label || 'Debarment Risk';
      break;
    case 'CORE':
      bg = COLORS.accentSoft; textCol = COLORS.accentLight; borderColor = COLORS.accentBorder;
      displayLabel = label || 'Core';
      break;
    case 'ELECTIVE':
      bg = COLORS.goldSoft; textCol = COLORS.gold; borderColor = COLORS.goldBorder;
      displayLabel = label || 'Elective';
      break;
    case 'HONOR':
      bg = COLORS.accentSoft; textCol = COLORS.accentLight; borderColor = COLORS.accentBorder;
      displayLabel = label || "Dean's List";
      break;
    default:
      bg = COLORS.surfaceMuted; textCol = COLORS.textSecondary; borderColor = COLORS.border;
  }

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg, borderColor },
        size === 'sm' && styles.badgeSm,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: textCol }]} />
      <Text style={[styles.text, { color: textCol }, size === 'sm' && styles.textSm]}>
        {displayLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: SPACING.xs + 1,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: SPACING.xs + 2,
    paddingVertical: 2,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  text:   { fontSize: 12, fontWeight: '700', letterSpacing: 0.2 },
  textSm: { fontSize: 10, fontWeight: '600' },
});
