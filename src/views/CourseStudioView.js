import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../constants/layout';
import { useAcademic } from '../state/AcademicContext';
import { AuraCard } from '../components/common/AuraCard';
import { AuraInput } from '../components/common/AuraInput';
import { AuraButton } from '../components/common/AuraButton';
import { StatusBadge } from '../components/common/StatusBadge';
import { validateCourseForm } from '../utils/formValidators';

export function CourseStudioView() {
  const { courses, addCourse, setActiveView, totalRegisteredCredits } = useAcademic();

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    creditHours: '3',
    instructor: '',
    room: 'CS-Lab 2',
    schedule: 'Mon / Wed 02:30 - 04:00',
    isElective: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const { isValid, errors: validationErrors } = validateCourseForm(formData, courses);

    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    addCourse({
      code: formData.code,
      title: formData.title,
      creditHours: formData.creditHours,
      instructor: formData.instructor,
      room: formData.room,
      schedule: formData.schedule,
      type: formData.isElective ? 'Elective' : 'Core',
    });

    setIsSubmitting(false);
    setFormData({
      code: '',
      title: '',
      creditHours: '3',
      instructor: '',
      room: 'CS-Lab 2',
      schedule: 'Mon / Wed 02:30 - 04:00',
      isElective: true,
    });
    setErrors({});
    setActiveView('DASHBOARD');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Studio Header Banner ─────────────────────────── */}
      <AuraCard variant="accent" style={styles.bannerCard}>
        <View style={styles.bannerRow}>
          <View style={styles.bannerTextGroup}>
            <Text style={styles.bannerTitle}>✦ Course Registration Studio</Text>
            <Text style={styles.bannerDesc}>
              Enroll in electives or core courses. Updates all dashboard metrics and charts in real time.
            </Text>
          </View>
          <View style={styles.creditChip}>
            <Text style={styles.creditChipNum}>{totalRegisteredCredits}</Text>
            <Text style={styles.creditChipLabel}>Active Cr</Text>
          </View>
        </View>
      </AuraCard>

      {/* ─── Registration Form ────────────────────────────── */}
      <AuraCard>
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>📝 Course Registration Form</Text>
          <Text style={styles.formSub}>All fields are validated in real-time</Text>
        </View>

        {/* Course Code */}
        <AuraInput
          label="Course Code"
          placeholder="e.g. CS-3015 or AI-4001"
          value={formData.code}
          onChangeText={(val) => handleInputChange('code', val.toUpperCase())}
          autoCapitalize="characters"
          maxLength={8}
          required
          error={errors.code}
          helperText="Format: 2-3 letters, hyphen, 4 numbers (e.g. CS-3015)"
        />

        {/* Course Title */}
        <AuraInput
          label="Course Title"
          placeholder="e.g. Deep Learning & Neural Networks"
          value={formData.title}
          onChangeText={(val) => handleInputChange('title', val)}
          required
          error={errors.title}
        />

        {/* Credit Hours Stepper */}
        <View style={styles.creditsSection}>
          <Text style={styles.fieldLabel}>Credit Hours *</Text>
          <View style={styles.creditsRow}>
            {['1', '2', '3', '4'].map((cr) => {
              const isSelected = formData.creditHours === cr;
              return (
                <TouchableOpacity
                  key={cr}
                  activeOpacity={0.8}
                  onPress={() => handleInputChange('creditHours', cr)}
                  style={[
                    styles.creditBtn,
                    isSelected ? styles.creditBtnActive : styles.creditBtnInactive,
                  ]}
                >
                  <Text style={[
                    styles.creditBtnText,
                    { color: isSelected ? COLORS.textInverse : COLORS.textSecondary },
                  ]}>
                    {cr} Cr
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {errors.creditHours && (
            <Text style={styles.inlineError}>⚠ {errors.creditHours}</Text>
          )}
        </View>

        {/* Course Type Toggle */}
        <View style={styles.switchRow}>
          <View style={styles.switchLabelGroup}>
            <Text style={styles.switchTitle}>Course Classification</Text>
            <Text style={styles.switchDesc}>
              {formData.isElective ? '🔶 Elective Course' : '🔷 Mandatory Core Course'}
            </Text>
          </View>
          <View style={styles.switchControl}>
            <Text style={[styles.switchOption, !formData.isElective && styles.switchOptionActive]}>Core</Text>
            <Switch
              value={formData.isElective}
              onValueChange={(val) => handleInputChange('isElective', val)}
              trackColor={{ false: COLORS.indigo, true: COLORS.gold }}
              thumbColor={COLORS.surface}
            />
            <Text style={[styles.switchOption, formData.isElective && styles.switchOptionActive]}>Elective</Text>
          </View>
        </View>

        {/* Instructor */}
        <AuraInput
          label="Course Instructor"
          placeholder="e.g. Dr. Hammad Naveed"
          value={formData.instructor}
          onChangeText={(val) => handleInputChange('instructor', val)}
          required
          error={errors.instructor}
        />

        {/* Schedule & Room Row */}
        <View style={styles.rowInputs}>
          <View style={{ flex: 1, marginRight: SPACING.sm }}>
            <AuraInput
              label="Room"
              placeholder="e.g. Hall C"
              value={formData.room}
              onChangeText={(val) => handleInputChange('room', val)}
            />
          </View>
          <View style={{ flex: 1.5 }}>
            <AuraInput
              label="Schedule"
              placeholder="Mon / Wed 10:00 - 11:30"
              value={formData.schedule}
              onChangeText={(val) => handleInputChange('schedule', val)}
            />
          </View>
        </View>

        {/* Submit */}
        <AuraButton
          title="✦ Register & Add to Semester"
          onPress={handleSubmit}
          loading={isSubmitting}
          variant="primary"
          size="lg"
          style={styles.submitButton}
        />
      </AuraCard>

      {/* ─── Enrolled Courses List ────────────────────────── */}
      <AuraCard>
        <View style={styles.enrolledHeader}>
          <Text style={styles.enrolledTitle}>📋 Currently Enrolled Curriculum</Text>
          <Text style={styles.enrolledSub}>{courses.length} Courses  ·  {totalRegisteredCredits} Credits</Text>
        </View>

        {courses.map((course, idx) => (
          <View key={course.id} style={styles.enrolledItem}>
            <View style={styles.enrolledLeft}>
              <View style={styles.enrolledIndex}>
                <Text style={styles.enrolledIndexText}>{idx + 1}</Text>
              </View>
              <View style={styles.enrolledInfo}>
                <Text style={styles.enrolledCode}>{course.code}</Text>
                <Text style={styles.enrolledName} numberOfLines={1}>{course.title}</Text>
              </View>
            </View>
            <View style={styles.enrolledRight}>
              <Text style={styles.enrolledCr}>{course.creditHours} Cr</Text>
              <StatusBadge
                status={course.type === 'Core' ? 'CORE' : 'ELECTIVE'}
                size="sm"
              />
            </View>
          </View>
        ))}
      </AuraCard>

      <View style={{ height: 48 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.md },

  // Banner
  bannerCard: {},
  bannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTextGroup: { flex: 1, marginRight: SPACING.md },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: COLORS.gold, marginBottom: 4 },
  bannerDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 17 },
  creditChip: {
    alignItems: 'center',
    backgroundColor: COLORS.goldSoft,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.goldBorder,
    ...SHADOWS.glow,
  },
  creditChipNum: { fontSize: 22, fontWeight: '900', color: COLORS.gold },
  creditChipLabel: { fontSize: 9, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 0.5 },

  // Form
  formHeader: { marginBottom: SPACING.md },
  formTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  formSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },

  // Credits selector
  creditsSection: { marginVertical: SPACING.sm },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    letterSpacing: 0.3,
  },
  creditsRow: { flexDirection: 'row', gap: SPACING.sm },
  creditBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
  },
  creditBtnActive: { backgroundColor: COLORS.gold, borderColor: COLORS.goldDark, ...SHADOWS.button },
  creditBtnInactive: { backgroundColor: COLORS.surfaceSubtle, borderColor: COLORS.border },
  creditBtnText: { fontSize: 13, fontWeight: '700' },
  inlineError: { color: COLORS.critical, fontSize: 11, fontWeight: '600', marginTop: 5 },

  // Switch
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  switchLabelGroup: { flex: 1 },
  switchTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  switchDesc: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  switchControl: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  switchOption: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  switchOptionActive: { color: COLORS.gold, fontWeight: '800' },

  rowInputs: { flexDirection: 'row' },
  submitButton: { marginTop: SPACING.md },

  // Enrolled list
  enrolledHeader: { marginBottom: SPACING.md },
  enrolledTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  enrolledSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  enrolledItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  enrolledLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: SPACING.sm, gap: SPACING.sm },
  enrolledIndex: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.goldSoft,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enrolledIndexText: { fontSize: 11, fontWeight: '800', color: COLORS.gold },
  enrolledInfo: {},
  enrolledCode: { fontSize: 12, fontWeight: '800', color: COLORS.gold },
  enrolledName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary },
  enrolledRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  enrolledCr: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
});
