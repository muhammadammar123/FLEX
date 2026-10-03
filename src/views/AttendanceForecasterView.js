import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../constants/layout';
import { useAcademic } from '../state/AcademicContext';
import { AuraCard } from '../components/common/AuraCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { ProgressBar } from '../components/common/ProgressBar';
import { EmptyState } from '../components/common/EmptyState';
import {
  calculatePercentage,
  getAttendanceStatus,
  calculateBunkMargin,
  calculateClassesToRecover,
} from '../utils/attendanceCalculators';

export function AttendanceForecasterView() {
  const {
    courses,
    attendanceSafeThreshold,
    setAttendanceSafeThreshold,
    searchQuery,
    setSearchQuery,
    attendanceFilter,
    setAttendanceFilter,
    simulateAttendance,
    resetCourseAttendance,
    setActiveView,
    setSelectedCourseId,
  } = useAcademic();

  // Filter + Search pipeline
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        course.code.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query);
      if (!matchesSearch) return false;
      if (attendanceFilter === 'ALL') return true;
      const pct = calculatePercentage(course.attendance?.attended, course.attendance?.total);
      const status = getAttendanceStatus(pct, attendanceSafeThreshold);
      return status === attendanceFilter;
    });
  }, [courses, searchQuery, attendanceFilter, attendanceSafeThreshold]);

  // Counts for filter pills
  const counts = useMemo(() => {
    let safe = 0, warning = 0, critical = 0;
    courses.forEach((c) => {
      const pct = calculatePercentage(c.attendance?.attended, c.attendance?.total);
      const st = getAttendanceStatus(pct, attendanceSafeThreshold);
      if (st === 'SAFE') safe++;
      else if (st === 'WARNING') warning++;
      else critical++;
    });
    return { all: courses.length, safe, warning, critical };
  }, [courses, attendanceSafeThreshold]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Policy Card ──────────────────────────────────── */}
      <AuraCard variant="bordered" style={styles.policyCard}>
        <Text style={styles.policyTitle}>🎯 Bunk Forecaster</Text>
        <Text style={styles.policyDesc}>
          Active Policy Threshold:{' '}
          <Text style={styles.policyHighlight}>{attendanceSafeThreshold}%</Text>
        </Text>

        <View style={styles.vivaSection}>
          <Text style={styles.vivaLabel}>Change Threshold:</Text>
          <View style={styles.thresholdRow}>
            {[75, 80, 85].map((thresh) => (
              <TouchableOpacity
                key={thresh}
                activeOpacity={0.8}
                onPress={() => setAttendanceSafeThreshold(thresh)}
                style={[
                  styles.thresholdBtn,
                  attendanceSafeThreshold === thresh && styles.thresholdBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.thresholdBtnText,
                    attendanceSafeThreshold === thresh && styles.thresholdBtnTextActive,
                  ]}
                >
                  {thresh}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </AuraCard>

      {/* ─── Search Bar ───────────────────────────────────── */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search course, code or instructor..."
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ─── Filter Chips ─────────────────────────────────── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {[
          { key: 'ALL', label: `All (${counts.all})` },
          { key: 'SAFE', label: `Safe (${counts.safe})`, color: COLORS.safe },
          { key: 'WARNING', label: `Warning (${counts.warning})`, color: COLORS.warning },
          { key: 'CRITICAL', label: `Critical (${counts.critical})`, color: COLORS.critical },
        ].map((filterItem) => {
          const isActive = attendanceFilter === filterItem.key;
          return (
            <TouchableOpacity
              key={filterItem.key}
              activeOpacity={0.8}
              onPress={() => setAttendanceFilter(filterItem.key)}
              style={[
                styles.filterChip,
                isActive
                  ? { backgroundColor: COLORS.gold, borderColor: COLORS.goldDark }
                  : { backgroundColor: COLORS.surfaceSubtle, borderColor: COLORS.border },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  { color: isActive ? COLORS.textInverse : COLORS.textSecondary },
                ]}
              >
                {filterItem.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ─── Course Cards ─────────────────────────────────── */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon="📚"
          title="No Courses Match"
          message="Adjust your search or select a different filter."
          actionTitle="Reset Filters"
          onAction={() => { setSearchQuery(''); setAttendanceFilter('ALL'); }}
        />
      ) : (
        filteredCourses.map((course) => {
          const attended = course.attendance?.attended || 0;
          const total = course.attendance?.total || 0;
          const percentage = calculatePercentage(attended, total);
          const status = getAttendanceStatus(percentage, attendanceSafeThreshold);
          const safeBunks = calculateBunkMargin(attended, total, attendanceSafeThreshold);
          const classesToRecover = calculateClassesToRecover(attended, total, attendanceSafeThreshold);

          const statusColor =
            status === 'SAFE' ? COLORS.safe :
            status === 'WARNING' ? COLORS.warning :
            COLORS.critical;

          return (
            <AuraCard key={course.id} style={styles.courseCard}>
              {/* Header */}
              <View style={styles.cardHeader}>
                <View style={styles.titleBlock}>
                  <View style={styles.codeRow}>
                    <Text style={styles.courseCode}>{course.code}</Text>
                    <Text style={styles.creditTag}>{course.creditHours} Cr</Text>
                  </View>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                </View>
                <StatusBadge status={status} />
              </View>

              {/* Meta */}
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>👤 {course.instructor}</Text>
                <Text style={styles.metaText}>📍 {course.room}</Text>
                <Text style={styles.metaText}>🕒 {course.schedule}</Text>
              </View>

              {/* Stats */}
              <View style={styles.statsRow}>
                <View>
                  <Text style={styles.classesRatio}>
                    <Text style={styles.attendedNum}>{attended}</Text>
                    {' / '}{total} classes
                  </Text>
                  <Text style={styles.ratioSub}>Conducted Lectures</Text>
                </View>
                <Text style={[styles.bigPercentage, { color: statusColor }]}>
                  {percentage}%
                </Text>
              </View>

              <ProgressBar progress={percentage} status={status} height={9} />

              {/* Bunk-o-Meter */}
              <View style={[styles.bunkBox, {
                backgroundColor: `${statusColor}15`,
                borderColor: `${statusColor}55`,
              }]}>
                <View style={styles.bunkContent}>
                  <Text style={styles.bunkIcon}>
                    {status === 'SAFE' ? '🛡️' : '🚨'}
                  </Text>
                  <View style={styles.bunkTextGroup}>
                    <Text style={[styles.bunkTitle, { color: statusColor }]}>
                      {status === 'SAFE' ? 'Safe Leave Margin:' : 'Recovery Required:'}
                    </Text>
                    <Text style={styles.bunkDesc}>
                      {status === 'SAFE' ? (
                        <>You can miss{' '}
                          <Text style={[styles.bunkBold, { color: statusColor }]}>{safeBunks}</Text>
                          {' '}more lecture{safeBunks !== 1 ? 's' : ''} and stay ≥{attendanceSafeThreshold}%.
                        </>
                      ) : (
                        <>Must attend next{' '}
                          <Text style={[styles.bunkBold, { color: statusColor }]}>{classesToRecover}</Text>
                          {' '}consecutive lecture{classesToRecover !== 1 ? 's' : ''} to recover.
                        </>
                      )}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Simulation Controls */}
              <View style={styles.simBar}>
                <Text style={styles.simLabel}>🧪 Test Next Class:</Text>
                <View style={styles.simBtnsRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => simulateAttendance(course.id, true)}
                    style={[styles.simBtn, styles.simBtnPresent]}
                  >
                    <Text style={styles.simTextPresent}>+ Present</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => simulateAttendance(course.id, false)}
                    style={[styles.simBtn, styles.simBtnAbsent]}
                  >
                    <Text style={styles.simTextAbsent}>+ Absent</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => resetCourseAttendance(course.id)}
                    style={styles.simResetBtn}
                  >
                    <Text style={styles.simResetText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Jump to Marks */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => { setSelectedCourseId(course.id); setActiveView('MARKS'); }}
                style={styles.marksLink}
              >
                <Text style={styles.marksLinkText}>View Marks for {course.code} →</Text>
              </TouchableOpacity>
            </AuraCard>
          );
        })
      )}

      <View style={{ height: 48 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.md },

  // Policy Card
  policyCard: {},
  policyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  policyDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  policyHighlight: {
    fontWeight: '800',
    color: COLORS.gold,
  },
  vivaSection: {
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  vivaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gold,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  thresholdRow: { flexDirection: 'row', gap: SPACING.sm },
  thresholdBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  thresholdBtnActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.goldDark,
    ...SHADOWS.button,
  },
  thresholdBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  thresholdBtnTextActive: { color: COLORS.textInverse },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginVertical: SPACING.sm,
    height: 48,
    ...SHADOWS.card,
  },
  searchIcon: { fontSize: 14, marginRight: SPACING.sm },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary },
  clearBtn: { padding: 4 },
  clearBtnText: { fontSize: 14, color: COLORS.textMuted, fontWeight: '700' },

  // Filter row
  filterRow: { paddingVertical: SPACING.xs, marginBottom: SPACING.xs },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
    marginRight: SPACING.xs + 2,
    borderWidth: 1,
  },
  filterChipText: { fontSize: 12, fontWeight: '700' },

  // Course card
  courseCard: { marginVertical: SPACING.xs + 2 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  titleBlock: { flex: 1, marginRight: SPACING.sm },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  courseCode: { fontSize: 13, fontWeight: '800', color: COLORS.gold },
  creditTag: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: RADIUS.sm,
  },
  courseTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginTop: 3 },

  metaRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: SPACING.xs },
  metaText: { fontSize: 11, color: COLORS.textMuted, marginRight: SPACING.md, marginVertical: 1 },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  classesRatio: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  attendedNum: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary },
  ratioSub: { fontSize: 10, color: COLORS.textMuted, marginTop: 1 },
  bigPercentage: { fontSize: 26, fontWeight: '900', letterSpacing: -0.8 },

  // Bunk box
  bunkBox: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    borderWidth: 1,
  },
  bunkContent: { flexDirection: 'row', alignItems: 'flex-start' },
  bunkIcon: { fontSize: 18, marginRight: SPACING.sm, marginTop: 1 },
  bunkTextGroup: { flex: 1 },
  bunkTitle: { fontSize: 12, fontWeight: '800', marginBottom: 3 },
  bunkDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 17 },
  bunkBold: { fontWeight: '800' },

  // Simulation
  simBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  simLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textSecondary },
  simBtnsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  simBtn: {
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  simBtnPresent: { backgroundColor: COLORS.safeSoft, borderColor: COLORS.safeBorder },
  simTextPresent: { fontSize: 11, fontWeight: '700', color: COLORS.safe },
  simBtnAbsent: { backgroundColor: COLORS.criticalSoft, borderColor: COLORS.criticalBorder },
  simTextAbsent: { fontSize: 11, fontWeight: '700', color: COLORS.critical },
  simResetBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  simResetText: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },

  // Marks link
  marksLink: { marginTop: SPACING.xs, paddingTop: SPACING.xs, alignItems: 'flex-end' },
  marksLinkText: { fontSize: 12, fontWeight: '700', color: COLORS.gold },
});
