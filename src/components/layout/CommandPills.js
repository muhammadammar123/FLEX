import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS, SPACING } from '../../constants/layout';
import { useAcademic } from '../../state/AcademicContext';

export function CommandPills() {
  const { activeView, setActiveView, atRiskCourses } = useAcademic();

  const NAV_ITEMS = [
    { key: 'DASHBOARD',  fullLabel: '◈ Hub' },
    {
      key: 'ATTENDANCE',
      fullLabel: '◎ Attendance',
      badge: atRiskCourses.length > 0 ? atRiskCourses.length : null,
      badgeCritical: true,
    },
    { key: 'MARKS',  fullLabel: '◆ Marks & GPA' },
    { key: 'STUDIO', fullLabel: '✦ Course Studio' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.8}
              onPress={() => setActiveView(item.key)}
              style={[
                styles.pill,
                isActive ? styles.pillActive : styles.pillInactive,
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive ? styles.pillTextActive : styles.pillTextInactive,
                ]}
              >
                {item.fullLabel}
              </Text>

              {item.badge && (
                <View
                  style={[
                    styles.badge,
                    item.badgeCritical ? styles.badgeCritical : styles.badgeNormal,
                  ]}
                >
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs + 4,
    paddingHorizontal: SPACING.md + 2,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accentDark,
    ...SHADOWS.button,
  },
  pillInactive: {
    backgroundColor: COLORS.surfaceSubtle,
    borderColor: COLORS.border,
  },
  pillText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.2 },
  pillTextActive:   { color: '#FFFFFF' },
  pillTextInactive: { color: COLORS.textSecondary },
  badge: {
    marginLeft: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: RADIUS.full,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCritical: { backgroundColor: COLORS.critical },
  badgeNormal:   { backgroundColor: COLORS.accent },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
});
