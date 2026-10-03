import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/layout';

export function ProgressBar({
  progress = 0,
  color,
  trackColor = COLORS.surfaceMuted,
  height = 8,
  showLabel = false,
  labelPrefix = '',
  status,
}) {
  const clamped = Math.min(100, Math.max(0, progress));

  let fillColor = color;
  if (!fillColor) {
    if (status === 'SAFE'     || clamped >= 80) fillColor = COLORS.safe;
    else if (status === 'WARNING' || clamped >= 75) fillColor = COLORS.warning;
    else                                            fillColor = COLORS.critical;
  }

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>
            {labelPrefix}{clamped.toFixed(1)}%
          </Text>
        </View>
      )}
      <View style={[styles.track, { backgroundColor: trackColor, height }]}>
        <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: fillColor, height }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 4 },
  labelRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4 },
  labelText: { fontSize: 11, fontWeight: '700', color: COLORS.textSecondary },
  track: { width: '100%', borderRadius: RADIUS.full, overflow: 'hidden' },
  fill:  { borderRadius: RADIUS.full },
});
