import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/layout';
import { calculatePercentage } from '../../utils/attendanceCalculators';

export function AttendanceBarChart({ courses = [], safeThreshold = 80 }) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth  = Math.min(screenWidth - 48, 500);

  if (!courses.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No registered courses found.</Text>
      </View>
    );
  }

  const labels = courses.map((c) => {
    const parts = c.code.split('-');
    return parts.length > 1 ? parts[1] : c.code.slice(0, 4);
  });

  const dataPoints = courses.map((c) =>
    calculatePercentage(c.attendance?.attended, c.attendance?.total)
  );

  const chartData = {
    labels,
    datasets: [{ data: dataPoints }],
  };

  const chartConfig = {
    backgroundColor:        COLORS.surface,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo:   COLORS.surfaceElevated,
    decimalPlaces: 0,
    color:      (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    barPercentage: 0.65,
    propsForBackgroundLines: {
      strokeDasharray: '3 3',
      stroke: 'rgba(255, 255, 255, 0.05)',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Attendance Health</Text>
          <Text style={styles.subtitle}>Target: ≥{safeThreshold}% to avoid debarment</Text>
        </View>
        <View style={styles.legendTag}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Threshold {safeThreshold}%</Text>
        </View>
      </View>

      <BarChart
        data={chartData}
        width={chartWidth}
        height={220}
        yAxisSuffix="%"
        yAxisInterval={20}
        fromZero
        chartConfig={chartConfig}
        style={styles.chart}
        showValuesOnTopOfBars
      />

      <View style={styles.courseKeyRow}>
        {courses.map((c) => {
          const parts   = c.code.split('-');
          const codeKey = parts.length > 1 ? parts[1] : c.code;
          return (
            <View key={c.id} style={styles.keyItem}>
              <Text style={styles.keyLabel}>{codeKey}:</Text>
              <Text style={styles.keyTitle} numberOfLines={1}>{c.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: SPACING.xs, alignItems: 'center' },
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
  legendTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.safeSoft,
    borderWidth: 1,
    borderColor: COLORS.safeBorder,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  legendDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.safe, marginRight: 4 },
  legendText: { fontSize: 10, fontWeight: '700', color: COLORS.safe },
  chart: { borderRadius: RADIUS.lg, paddingRight: 24, marginVertical: 4 },
  courseKeyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  keyItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 6, marginVertical: 2 },
  keyLabel: { fontSize: 10, fontWeight: '800', color: COLORS.accentLight, marginRight: 2 },
  keyTitle: { fontSize: 10, color: COLORS.textSecondary, maxWidth: 90 },
  emptyContainer: { padding: SPACING.lg, alignItems: 'center' },
  emptyText:      { color: COLORS.textMuted, fontSize: 12 },
});
