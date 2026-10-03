import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../constants/layout';
import { useAcademic } from '../state/AcademicContext';
import { AuraCard } from '../components/common/AuraCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { ProgressBar } from '../components/common/ProgressBar';
import { GRADE_SCALE } from '../constants/academicRules';
import {
  calculateCourseMarks,
  getGradeFromPercentage,
  calculateRequiredFinalMarks,
} from '../utils/gpaCalculators';

export function MarksAndGpaView() {
  const { courses, selectedCourseId, setSelectedCourseId } = useAcademic();
  const [targetGrade, setTargetGrade] = useState('A');

  const activeCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourseId) || courses[0],
    [courses, selectedCourseId]
  );

  const marksSummary = useMemo(
    () => (activeCourse ? calculateCourseMarks(activeCourse.evaluations) : null),
    [activeCourse]
  );

  const currentProjectedGrade = useMemo(
    () => (marksSummary ? getGradeFromPercentage(marksSummary.percentageOnConducted) : null),
    [marksSummary]
  );

  const finalExamComponent = useMemo(() => {
    if (!activeCourse) return null;
    return (
      activeCourse.evaluations.find(
        (ev) => ev.title.toLowerCase().includes('final') || ev.isPending
      ) || { weightage: 40, total: 40 }
    );
  }, [activeCourse]);

  const solverOutput = useMemo(() => {
    if (!marksSummary || !finalExamComponent) return null;
    return calculateRequiredFinalMarks(
      marksSummary.obtainedTotal,
      finalExamComponent.weightage,
      finalExamComponent.total || 100,
      targetGrade
    );
  }, [marksSummary, finalExamComponent, targetGrade]);

  if (!activeCourse) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noCoursesText}>No courses available to evaluate.</Text>
      </View>
    );
  }

  const runRate = marksSummary?.percentageOnConducted || 0;
  const runRateColor =
    runRate >= 80 ? COLORS.safe : runRate >= 70 ? COLORS.warning : COLORS.critical;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Course Selector Pills ────────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsScroll}
      >
        {courses.map((course) => {
          const isSelected = course.id === activeCourse.id;
          return (
            <TouchableOpacity
              key={course.id}
              activeOpacity={0.8}
              onPress={() => setSelectedCourseId(course.id)}
              style={[
                styles.coursePill,
                isSelected ? styles.pillActive : styles.pillInactive,
              ]}
            >
              <Text style={[styles.pillCode, isSelected ? styles.pillCodeActive : styles.pillCodeInactive]}>
                {course.code}
              </Text>
              <Text
                style={[styles.pillTitle, isSelected ? styles.pillTitleActive : styles.pillTitleInactive]}
                numberOfLines={1}
              >
                {course.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ─── Selected Course Banner ───────────────────────── */}
      <AuraCard variant="accent" style={styles.courseHeaderCard}>
        <View style={styles.headerTop}>
          <View style={styles.courseInfoBlock}>
            <Text style={styles.bannerCode}>{activeCourse.code}</Text>
            <Text style={styles.bannerTitle}>{activeCourse.title}</Text>
            <Text style={styles.bannerInstructor}>
              {activeCourse.instructor}  ·  {activeCourse.creditHours} Credits
            </Text>
          </View>
          <StatusBadge status={activeCourse.type === 'Core' ? 'CORE' : 'ELECTIVE'} />
        </View>

        {/* Score Pulse Row */}
        <View style={styles.scorePulseRow}>
          <View style={styles.pulseItem}>
            <Text style={styles.pulseLabel}>SESSIONAL</Text>
            <Text style={styles.pulseValue}>
              {marksSummary?.obtainedTotal}{' '}
              <Text style={styles.pulseTotal}>/ {marksSummary?.conductedWeightage}</Text>
            </Text>
          </View>
          <View style={styles.pulseDivider} />
          <View style={styles.pulseItem}>
            <Text style={styles.pulseLabel}>RUN-RATE</Text>
            <Text style={[styles.pulseValue, { color: runRateColor }]}>
              {runRate}%
            </Text>
          </View>
          <View style={styles.pulseDivider} />
          <View style={styles.pulseItem}>
            <Text style={styles.pulseLabel}>GRADE</Text>
            <Text style={[styles.pulseValue, { color: COLORS.gold }]}>
              {currentProjectedGrade?.grade}
            </Text>
          </View>
        </View>
      </AuraCard>

      {/* ─── Assessment Breakdown ─────────────────────────── */}
      <AuraCard>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>📋 Assessment Breakdown</Text>
          <Text style={styles.sectionSub}>Sessional & Exam Weightages</Text>
        </View>

        {activeCourse.evaluations.map((item) => {
          const itemPct =
            item.weightage > 0 && !item.isPending
              ? Number(((item.obtained / item.total) * 100).toFixed(0))
              : 0;

          const barColor =
            itemPct >= 80 ? COLORS.safe : itemPct >= 65 ? COLORS.gold : COLORS.warning;

          return (
            <View key={item.id} style={styles.evalItem}>
              <View style={styles.evalHeader}>
                <View style={styles.evalTitleBlock}>
                  <Text style={styles.evalTitle}>{item.title}</Text>
                  <Text style={styles.evalWeight}>Weight: {item.weightage}%</Text>
                </View>

                {item.isPending ? (
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingText}>Pending Final</Text>
                  </View>
                ) : (
                  <View style={styles.evalScoreBlock}>
                    <Text style={styles.evalObtained}>
                      {item.obtained}{' '}
                      <Text style={styles.evalTotal}>/ {item.total}</Text>
                    </Text>
                    <Text style={styles.evalPercent}>{itemPct}%</Text>
                  </View>
                )}
              </View>

              {!item.isPending && (
                <ProgressBar progress={itemPct} height={6} color={barColor} />
              )}
            </View>
          );
        })}
      </AuraCard>

      {/* ─── What-If Final Exam Solver ────────────────────── */}
      <AuraCard variant="bordered" style={styles.solverCard}>
        <View style={styles.solverHeader}>
          <View style={styles.solverIconCircle}>
            <Text style={styles.solverIconText}>🔮</Text>
          </View>
          <View style={styles.solverTitleBlock}>
            <Text style={styles.solverHeading}>Final Exam Target Solver</Text>
            <Text style={styles.solverSubheading}>
              Select target grade → see required final marks ({finalExamComponent?.weightage}% weightage)
            </Text>
          </View>
        </View>

        {/* Grade Selector */}
        <View style={styles.gradeChipsRow}>
          {['A', 'A-', 'B+', 'B', 'B-', 'C+'].map((letter) => {
            const isSelected = targetGrade === letter;
            return (
              <TouchableOpacity
                key={letter}
                activeOpacity={0.8}
                onPress={() => setTargetGrade(letter)}
                style={[
                  styles.gradeChip,
                  isSelected
                    ? { backgroundColor: COLORS.gold, borderColor: COLORS.goldDark }
                    : { backgroundColor: COLORS.surfaceSubtle, borderColor: COLORS.border },
                ]}
              >
                <Text style={[
                  styles.gradeChipText,
                  { color: isSelected ? COLORS.textInverse : COLORS.textSecondary },
                ]}>
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Solver Result */}
        {solverOutput && (
          <View
            style={[
              styles.solverResultBox,
              solverOutput.difficulty === 'IMPOSSIBLE'
                ? { backgroundColor: COLORS.criticalSoft, borderColor: COLORS.criticalBorder }
                : solverOutput.difficulty === 'CHALLENGING'
                ? { backgroundColor: COLORS.warningSoft, borderColor: COLORS.warningBorder }
                : { backgroundColor: COLORS.goldSoft, borderColor: COLORS.goldBorder },
            ]}
          >
            <View style={styles.resultTopRow}>
              <Text style={styles.resultTitle}>Required Score in Final Exam:</Text>
              <View style={[styles.diffBadge, {
                backgroundColor:
                  solverOutput.difficulty === 'IMPOSSIBLE' ? COLORS.critical :
                  solverOutput.difficulty === 'CHALLENGING' ? COLORS.warning :
                  COLORS.gold,
              }]}>
                <Text style={styles.diffText}>{solverOutput.difficulty}</Text>
              </View>
            </View>

            <Text style={[styles.resultMarks, {
              color:
                solverOutput.difficulty === 'IMPOSSIBLE' ? COLORS.critical :
                solverOutput.difficulty === 'CHALLENGING' ? COLORS.warning :
                COLORS.gold,
            }]}>
              {solverOutput.requiredMarks}{' '}
              <Text style={styles.resultMax}>/ {finalExamComponent?.total || 40}</Text>
            </Text>

            <Text style={styles.resultNote}>{solverOutput.note}</Text>
          </View>
        )}
      </AuraCard>

      <View style={{ height: 48 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.md },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.xl },
  noCoursesText: { fontSize: 14, color: COLORS.textMuted },

  // Selector Pills
  pillsScroll: { paddingBottom: SPACING.xs, marginBottom: SPACING.xs },
  coursePill: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    marginRight: SPACING.sm,
    borderWidth: 1.5,
    minWidth: 110,
  },
  pillActive: { backgroundColor: COLORS.gold, borderColor: COLORS.goldDark, ...SHADOWS.button },
  pillInactive: { backgroundColor: COLORS.surface, borderColor: COLORS.border },
  pillCode: { fontSize: 13, fontWeight: '800' },
  pillCodeActive: { color: COLORS.textInverse },
  pillCodeInactive: { color: COLORS.gold },
  pillTitle: { fontSize: 10, marginTop: 2 },
  pillTitleActive: { color: 'rgba(13, 14, 18, 0.75)' },
  pillTitleInactive: { color: COLORS.textSecondary },

  // Course Header Card
  courseHeaderCard: {},
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  courseInfoBlock: { flex: 1, marginRight: SPACING.sm },
  bannerCode: { fontSize: 13, fontWeight: '800', color: COLORS.gold },
  bannerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginVertical: 3 },
  bannerInstructor: { fontSize: 11, color: COLORS.textMuted, fontWeight: '500' },

  // Score Pulse
  scorePulseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
  },
  pulseItem: { alignItems: 'center' },
  pulseLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  pulseValue: { fontSize: 20, fontWeight: '900', color: COLORS.textPrimary },
  pulseTotal: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  pulseDivider: { width: 1, height: 34, backgroundColor: COLORS.border },

  // Assessment
  sectionTitleRow: { marginBottom: SPACING.md },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  sectionSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  evalItem: {
    marginVertical: SPACING.sm,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  evalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  evalTitleBlock: {},
  evalTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  evalWeight: { fontSize: 10, color: COLORS.textMuted, marginTop: 1 },
  evalScoreBlock: { alignItems: 'flex-end' },
  evalObtained: { fontSize: 14, fontWeight: '800', color: COLORS.gold },
  evalTotal: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  evalPercent: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary },
  pendingBadge: {
    backgroundColor: COLORS.goldSoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
  },
  pendingText: { fontSize: 10, fontWeight: '700', color: COLORS.gold },

  // Solver
  solverCard: {},
  solverHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md, gap: SPACING.sm },
  solverIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.goldSoft,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solverIconText: { fontSize: 18 },
  solverTitleBlock: { flex: 1 },
  solverHeading: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  solverSubheading: { fontSize: 11, color: COLORS.textMuted, marginTop: 2, lineHeight: 15 },

  gradeChipsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: SPACING.sm, gap: 4 },
  gradeChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
  },
  gradeChipText: { fontSize: 13, fontWeight: '800' },

  solverResultBox: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    borderWidth: 1.5,
  },
  resultTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultTitle: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.full },
  diffText: { fontSize: 9, fontWeight: '800', color: COLORS.textInverse },
  resultMarks: { fontSize: 30, fontWeight: '900', letterSpacing: -1, marginVertical: 4 },
  resultMax: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted },
  resultNote: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
});
