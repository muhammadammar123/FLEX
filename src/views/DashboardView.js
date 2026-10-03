import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../constants/layout';
import { useAcademic } from '../state/AcademicContext';
import { AuraCard } from '../components/common/AuraCard';
import { MetricTile } from '../components/common/MetricTile';
import { AlertNotice } from '../components/common/AlertNotice';
import { GpaTrendChart } from '../components/charts/GpaTrendChart';
import { AttendanceBarChart } from '../components/charts/AttendanceBarChart';

export function DashboardView() {
  const {
    student,
    courses,
    overallAttendance,
    totalRegisteredCredits,
    atRiskCourses,
    attendanceSafeThreshold,
    setActiveView,
    notifications,
    dismissNotification,
    feedbackNotice,
    clearFeedbackNotice,
  } = useAcademic();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Feedback Notice (e.g. from Course Studio) */}
      {feedbackNotice && (
        <AlertNotice
          type={feedbackNotice.type || 'success'}
          title={feedbackNotice.title}
          message={feedbackNotice.message}
          onDismiss={clearFeedbackNotice}
        />
      )}

      {/* Debarment Alert Banner */}
      {atRiskCourses.length > 0 && (
        <AlertNotice
          type="critical"
          title={`⚠ Debarment Risk — ${atRiskCourses.length} Course${atRiskCourses.length > 1 ? 's' : ''}`}
          message={`${atRiskCourses.map((c) => `${c.code} (${((c.attendance.attended / c.attendance.total) * 100).toFixed(1)}%)`).join(', ')} below ${attendanceSafeThreshold}% threshold.`}
          actionLabel="Open Forecaster"
          onAction={() => setActiveView('ATTENDANCE')}
        />
      )}

      {/* ─── Hero Welcome Banner ───────────────────────────── */}
      <AuraCard variant="accent" style={styles.heroCard}>
        <View style={styles.heroRow}>
          <View style={styles.heroTextGroup}>
            <Text style={styles.heroGreeting}>Welcome back,</Text>
            <Text style={styles.heroName}>{student.name}</Text>
            <Text style={styles.heroSub}>
              {student.degree}  ·  {student.semester}  ·  {student.section}
            </Text>
          </View>

          <View style={styles.heroRight}>
            {/* CGPA Badge */}
            <View style={styles.cgpaBadge}>
              <Text style={styles.cgpaLabel}>CGPA</Text>
              <Text style={styles.cgpaValue}>{student.cgpa.toFixed(2)}</Text>
            </View>
            {/* Standing */}
            <View style={styles.standingBadge}>
              <Text style={styles.standingText}>⭐ {student.standing}</Text>
            </View>
          </View>
        </View>

        {/* Quick stats strip */}
        <View style={styles.heroStatsRow}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatVal}>{student.semester}</Text>
            <Text style={styles.heroStatLabel}>Standing</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatVal}>{student.completedCredits}</Text>
            <Text style={styles.heroStatLabel}>Credits Done</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={styles.heroStatVal}>{courses.length}</Text>
            <Text style={styles.heroStatLabel}>Courses</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStat}>
            <Text style={[styles.heroStatVal, { color: atRiskCourses.length > 0 ? COLORS.critical : COLORS.safe }]}>
              {atRiskCourses.length}
            </Text>
            <Text style={styles.heroStatLabel}>At Risk</Text>
          </View>
        </View>
      </AuraCard>

      {/* ─── KPI Metric Tiles ─────────────────────────────── */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          <MetricTile
            icon="🎓"
            label="Cumulative GPA"
            value={student.cgpa.toFixed(2)}
            sublabel="Target: 3.75"
            accentColor={COLORS.gold}
            onPress={() => setActiveView('MARKS')}
          />
          <MetricTile
            icon="📊"
            label="Avg Attendance"
            value={`${overallAttendance.percentage}%`}
            sublabel={overallAttendance.percentage >= attendanceSafeThreshold ? 'Safe Zone ✓' : 'Needs Attention'}
            accentColor={overallAttendance.percentage >= attendanceSafeThreshold ? COLORS.safe : COLORS.critical}
            onPress={() => setActiveView('ATTENDANCE')}
          />
        </View>
        <View style={styles.metricRow}>
          <MetricTile
            icon="📚"
            label="Enrolled Courses"
            value={`${courses.length}`}
            sublabel={`${totalRegisteredCredits} Total Credits`}
            accentColor={COLORS.info}
            onPress={() => setActiveView('STUDIO')}
          />
          <MetricTile
            icon="🚨"
            label="At-Risk Courses"
            value={`${atRiskCourses.length}`}
            sublabel={`Threshold: ${attendanceSafeThreshold}%`}
            accentColor={atRiskCourses.length > 0 ? COLORS.critical : COLORS.safe}
            onPress={() => setActiveView('ATTENDANCE')}
          />
        </View>
      </View>

      {/* ─── Quick Action Shortcuts ───────────────────────── */}
      <View style={styles.shortcutsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveView('ATTENDANCE')}
          style={[styles.shortcutCard, styles.shortcutGold]}
        >
          <Text style={styles.shortcutIcon}>🎯</Text>
          <Text style={styles.shortcutTitle}>Bunk Forecaster</Text>
          <Text style={styles.shortcutSub}>Calculate safe leaves</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveView('MARKS')}
          style={[styles.shortcutCard, styles.shortcutAmber]}
        >
          <Text style={styles.shortcutIcon}>🔮</Text>
          <Text style={styles.shortcutTitle}>Final Solver</Text>
          <Text style={styles.shortcutSub}>Target marks planner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveView('STUDIO')}
          style={[styles.shortcutCard, styles.shortcutGreen]}
        >
          <Text style={styles.shortcutIcon}>✦</Text>
          <Text style={styles.shortcutTitle}>Add Course</Text>
          <Text style={styles.shortcutSub}>Enroll & simulate</Text>
        </TouchableOpacity>
      </View>

      {/* ─── Chart 1: GPA Trend ───────────────────────────── */}
      <AuraCard variant="elevated">
        <GpaTrendChart history={student.gpaHistory} />
      </AuraCard>

      {/* ─── Chart 2: Attendance Bar ──────────────────────── */}
      <AuraCard variant="elevated">
        <AttendanceBarChart courses={courses} safeThreshold={attendanceSafeThreshold} />
      </AuraCard>


      {/* ─── Notifications Feed ───────────────────────────── */}
      <AuraCard>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🔔 Announcements</Text>
          <Text style={styles.sectionSub}>FLEX Academic Board Notices</Text>
        </View>

        {notifications.length === 0 ? (
          <View style={styles.noNotifsBox}>
            <Text style={styles.noNotifsText}>All notifications dismissed.</Text>
          </View>
        ) : (
          notifications.map((notif) => (
            <AlertNotice
              key={notif.id}
              type={notif.type}
              title={notif.title}
              message={notif.message}
              onDismiss={() => dismissNotification(notif.id)}
            />
          ))
        )}
      </AuraCard>

      <View style={{ height: 48 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
  },

  // ── Hero Card ───────────────────────────────────────────────────
  heroCard: {
    marginBottom: SPACING.xs,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTextGroup: {
    flex: 1,
    marginRight: SPACING.md,
  },
  heroGreeting: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  heroName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginVertical: 3,
  },
  heroSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  heroRight: {
    alignItems: 'flex-end',
    gap: SPACING.xs,
  },
  cgpaBadge: {
    backgroundColor: COLORS.goldSoft,
    borderWidth: 1.5,
    borderColor: COLORS.goldBorder,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    ...SHADOWS.glow,
  },
  cgpaLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cgpaValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.gold,
    letterSpacing: -0.5,
  },
  standingBadge: {
    backgroundColor: COLORS.goldSoft,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  standingText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.gold,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.gold,
    letterSpacing: -0.3,
  },
  heroStatLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },

  // ── Metric Tiles ────────────────────────────────────────────────
  metricsGrid: {
    marginVertical: SPACING.xs,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // ── Shortcuts ───────────────────────────────────────────────────
  shortcutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.sm,
    gap: SPACING.xs + 2,
  },
  shortcutCard: {
    flex: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  shortcutGold: {
    backgroundColor: COLORS.goldSoft,
    borderColor: COLORS.goldBorder,
  },
  shortcutAmber: {
    backgroundColor: COLORS.warningSoft,
    borderColor: COLORS.warningBorder,
  },
  shortcutGreen: {
    backgroundColor: COLORS.safeSoft,
    borderColor: COLORS.safeBorder,
  },
  shortcutIcon: {
    fontSize: 22,
    marginBottom: 5,
  },
  shortcutTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  shortcutSub: {
    fontSize: 9,
    fontWeight: '500',
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },

  // ── Section Header ──────────────────────────────────────────────
  sectionHeader: {
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  sectionSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  noNotifsBox: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  noNotifsText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
  },
});
