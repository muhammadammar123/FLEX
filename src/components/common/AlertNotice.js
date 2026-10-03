import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/layout';

export function AlertNotice({
  type = 'warning',
  title,
  message,
  actionLabel,
  onAction,
  onDismiss,
  style,
}) {
  let bg          = COLORS.warningSoft;
  let borderColor = COLORS.warningBorder;
  let textCol     = COLORS.warning;
  let icon        = '⚠️';

  if (type === 'critical') {
    bg = COLORS.criticalSoft; borderColor = COLORS.criticalBorder;
    textCol = COLORS.critical; icon = '🚨';
  } else if (type === 'success') {
    bg = COLORS.safeSoft; borderColor = COLORS.safeBorder;
    textCol = COLORS.safe; icon = '✅';
  } else if (type === 'info') {
    bg = COLORS.accentSoft; borderColor = COLORS.accentBorder;
    textCol = COLORS.accentLight; icon = 'ℹ️';
  }

  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor }, style]}>
      <View style={styles.contentRow}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.textContainer}>
          {title   && <Text style={[styles.title,   { color: textCol }]}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
        {onDismiss && (
          <TouchableOpacity
            onPress={onDismiss}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.dismiss, { color: textCol }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {actionLabel && onAction && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onAction}
          style={[styles.actionBtn, { borderColor }]}
        >
          <Text style={[styles.actionText, { color: textCol }]}>{actionLabel} →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    padding: SPACING.md,
    marginVertical: SPACING.xs + 2,
  },
  contentRow:    { flexDirection: 'row', alignItems: 'flex-start' },
  icon:          { fontSize: 18, marginRight: SPACING.sm, marginTop: 1 },
  textContainer: { flex: 1 },
  title: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  message: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textSecondary,
    lineHeight: 17,
  },
  dismiss: {
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: SPACING.sm,
    opacity: 0.8,
  },
  actionBtn: {
    marginTop: SPACING.sm,
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  actionText: { fontSize: 12, fontWeight: '700' },
});
