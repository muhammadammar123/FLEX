import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/layout';
import { ACADEMIC_RULES } from '../../constants/academicRules';

export function GpaTrendChart({ history = [] }) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth  = Math.min(screenWidth - 48, 500);

  if (!history.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No historical GPA records available.</Text>
      </View>
    );
  }

  const labels     = history.map((item) => item.semester);
  const dataPoints = history.map((item) => item.gpa);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataPoints,
        color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor:       COLORS.surface,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo:   COLORS.surfaceElevated,
    decimalPlaces: 2,
    color:      (opacity = 1) => `rgba(167, 139, 250, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style:      { borderRadius: RADIUS.lg },
    propsForDots: {
      r: '6',
      strokeWidth: '2.5',
      stroke: COLORS.accentLight,
      fill: COLORS.surface,
    },
    propsForBackgroundLines: {
      strokeDasharray: '4 4',
      stroke: 'rgba(124, 58, 237, 0.10)',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>GPA Progression</Text>
          <Text style={styles.subtitle}>Semester-by-semester SGPA trajectory</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⭐ Dean's ≥{ACADEMIC_RULES.DEANS_LIST_GPA.toFixed(2)}</Text>
        </View>
      </View>

      <LineChart
        data={chartData}
        width={chartWidth}
        height={210}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        fromZero={false}
        yAxisInterval={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { marginVertical: SPACING.xs, alignItems: 'center' },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  title:    { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  badge: {
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: COLORS.accentLight },
  chart:    { borderRadius: RADIUS.lg, paddingRight: 32, marginVertical: 4 },
  emptyContainer: { padding: SPACING.lg, alignItems: 'center' },
  emptyText:      { color: COLORS.textMuted, fontSize: 12 },
});
