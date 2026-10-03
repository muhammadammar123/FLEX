import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/layout';
import { useAcademic } from '../../state/AcademicContext';

export function AppHeader() {
  const {
    student,
    activeView,
    setActiveView,
    atRiskCourses,
    attendanceSafeThreshold,
  } = useAcademic();

  const isHome = activeView === 'DASHBOARD';

  const viewTitles = {
    DASHBOARD:  'Academic Hub',
    ATTENDANCE: 'Attendance Forecaster',
    MARKS:      'Marks & GPA Solver',
    STUDIO:     'Course Studio',
  };

  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.headerContainer}>
      {/* Top Brand Row */}
      <View style={styles.topRow}>
        <View style={styles.brandGroup}>
          <View style={styles.brandIcon}>
            <Text style={styles.brandIconText}>⚡</Text>
          </View>
          <View>
            <Text style={styles.portalName}>FLEX 3.0</Text>
            <Text style={styles.campusSubtitle}>{student.campus}</Text>
          </View>
        </View>

        {/* Student Chip */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveView('DASHBOARD')}
          style={styles.profileChip}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1}>{student.name}</Text>
            <Text style={styles.profileRoll}>{student.rollNo}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Title Row */}
      <View style={styles.titleRow}>
        {!isHome && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveView('DASHBOARD')}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        )}

        <View style={styles.activeTitleContainer}>
          <Text style={styles.screenTitle}>{viewTitles[activeView] || 'Portal'}</Text>
        </View>

        {atRiskCourses.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveView('ATTENDANCE')}
            style={styles.alertBadge}
          >
            <Text style={styles.alertBadgeText}>
              🚨 {atRiskCourses.length} at risk
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.safeBadge}>
            <Text style={styles.safeBadgeText}>✓ All Safe</Text>
          </View>
        )}
      </View>

      {/* Violet divider */}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.surface,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingBottom: 0,
    ...SHADOWS.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.button,
  },
  brandIconText: { fontSize: 20, color: '#FFF' },
  portalName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.accentLight,
    letterSpacing: 0.3,
  },
  campusSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  profileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    paddingVertical: SPACING.xs + 1,
    paddingHorizontal: SPACING.sm + 2,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    gap: SPACING.xs + 2,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  profileInfo: {},
  profileName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    maxWidth: 90,
  },
  profileRoll: {
    fontSize: 9,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.sm,
  },
  backButton: {
    marginRight: SPACING.sm,
    paddingVertical: 4,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.accentSoft,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentLight,
  },
  activeTitleContainer: { flex: 1 },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  alertBadge: {
    backgroundColor: COLORS.criticalSoft,
    borderWidth: 1,
    borderColor: COLORS.criticalBorder,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  alertBadgeText: { fontSize: 11, fontWeight: '700', color: COLORS.critical },
  safeBadge: {
    backgroundColor: COLORS.safeSoft,
    borderWidth: 1,
    borderColor: COLORS.safeBorder,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  safeBadgeText: { fontSize: 11, fontWeight: '700', color: COLORS.safe },
  divider: {
    height: 1,
    backgroundColor: COLORS.accentBorder,
    marginHorizontal: -SPACING.lg,
  },
});
