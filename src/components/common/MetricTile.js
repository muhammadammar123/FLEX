import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/layout';

export function MetricTile({
  icon,
  label,
  value,
  sublabel,
  accentColor = COLORS.accent,
  onPress,
}) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.container, { borderTopColor: accentColor }]}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconCircle, { backgroundColor: `${accentColor}20` }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      </View>
      <Text style={[styles.value, { color: accentColor }]}>{value}</Text>
      {sublabel && (
        <Text style={styles.sublabel} numberOfLines={1}>
          {sublabel}
        </Text>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 140,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    margin: SPACING.xs + 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderTopWidth: 3,
    ...SHADOWS.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 15 },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    flexShrink: 1,
    lineHeight: 15,
  },
  value: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginVertical: 2,
  },
  sublabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
