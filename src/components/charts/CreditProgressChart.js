import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/layout';

/**
 * CreditProgressChart — Dark gold themed Progress Ring Chart for degree completion.
 * Colors: Gold (Core), Amber (Elective), Green (Gen-Ed)
 */
export function CreditProgressChart({ creditBreakdown, totalCompleted, totalRequired }) {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.min(screenWidth - 48, 500);

  const breakdown = creditBreakdown || {
    coreCompleted: 54,
    coreTotal: 72,
    electivesCompleted: 18,
    electivesTotal: 36,
    genEdCompleted: 12,
    genEdTotal: 26,
  };

  const coreRatio = Math.min(1, breakdown.coreCompleted / breakdown.coreTotal);
  const elecRatio = Math.min(1, breakdown.electivesCompleted / breakdown.electivesTotal);
  const genEdRatio = Math.min(1, breakdown.genEdCompleted / breakdown.genEdTotal);

  const chartData = {
    labels: ['Core', 'Elective', 'Gen-Ed'],
    data: [coreRatio, elecRatio, genEdRatio],
  };

  const chartConfig = {
    backgroundColor: COLORS.surface,
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.surfaceElevated,
    color: (opacity = 1, index) => {
      if (index === 0) return `rgba(212, 160, 23, ${opacity})`;  // Core: Gold
      if (index === 1) return `rgba(251, 191, 36, ${opacity})`;  // Elective: Amber
      return `rgba(34, 197, 94, ${opacity})`;                    // GenEd: Green
    },
    labelColor: (opacity = 1) => `rgba(168, 152, 128, ${opacity})`,
  };

  const overallPercentage = ((totalCompleted / totalRequired) * 100).toFixed(0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Degree Completion</Text>
          <Text style={styles.subtitle}>
            {totalCompleted}/{totalRequired} Credits ({overallPercentage}%)
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>6th Semester</Text>
        </View>
      </View>

      <ProgressChart
        data={chartData}
        width={chartWidth}
        height={180}
        strokeWidth={14}
        radius={30}
        chartConfig={chartConfig}
        hideLegend={false}
        style={styles.chart}
      />

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.gold }]} />
          <Text style={styles.legendText}>
            Core: {breakdown.coreCompleted}/{breakdown.coreTotal} Cr
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.warning }]} />
          <Text style={styles.legendText}>
            Elective: {breakdown.electivesCompleted}/{breakdown.electivesTotal} Cr
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: COLORS.safe }]} />
          <Text style={styles.legendText}>
            Gen-Ed: {breakdown.genEdCompleted}/{breakdown.genEdTotal} Cr
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.xs,
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.goldSoft,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.gold,
  },
  chart: {
    borderRadius: RADIUS.lg,
    marginVertical: 4,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.xs,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
