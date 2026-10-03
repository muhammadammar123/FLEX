import React from 'react';
import { StyleSheet, SafeAreaView, View, Platform, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { COLORS } from './src/constants/colors';
import { AcademicProvider, useAcademic } from './src/state/AcademicContext';
import { AppHeader } from './src/components/layout/AppHeader';
import { CommandPills } from './src/components/layout/CommandPills';
import { DashboardView } from './src/views/DashboardView';
import { AttendanceForecasterView } from './src/views/AttendanceForecasterView';
import { MarksAndGpaView } from './src/views/MarksAndGpaView';
import { CourseStudioView } from './src/views/CourseStudioView';

function AppContent() {
  const { activeView } = useAcademic();

  return (
    <View style={styles.mainContainer}>
      <AppHeader />
      <CommandPills />
      <View style={styles.viewViewport}>
        {activeView === 'DASHBOARD'  && <DashboardView />}
        {activeView === 'ATTENDANCE' && <AttendanceForecasterView />}
        {activeView === 'MARKS'      && <MarksAndGpaView />}
        {activeView === 'STUDIO'     && <CourseStudioView />}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <AcademicProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* Dark status bar for gold theme */}
        <ExpoStatusBar style="light" backgroundColor={COLORS.surface} />
        <AppContent />
      </SafeAreaView>
    </AcademicProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  viewViewport: {
    flex: 1,
  },
});
