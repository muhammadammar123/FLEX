import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_STUDENT_PROFILE } from '../data/mockStudent';
import { INITIAL_COURSES } from '../data/mockCourses';
import { ACADEMIC_RULES } from '../constants/academicRules';
import { calculateOverallAttendance } from '../utils/attendanceCalculators';
import { calculateSemesterSgpa } from '../utils/gpaCalculators';

const AcademicContext = createContext(null);

export function AcademicProvider({ children }) {
  const [student, setStudent] = useState(INITIAL_STUDENT_PROFILE);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [activeView, setActiveView] = useState('DASHBOARD'); // 'DASHBOARD' | 'ATTENDANCE' | 'MARKS' | 'STUDIO'
  const [selectedCourseId, setSelectedCourseId] = useState('c-1');
  const [attendanceSafeThreshold, setAttendanceSafeThreshold] = useState(
    ACADEMIC_RULES.ATTENDANCE_SAFE_THRESHOLD
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('ALL'); // 'ALL' | 'SAFE' | 'WARNING' | 'CRITICAL'
  const [notifications, setNotifications] = useState(INITIAL_STUDENT_PROFILE.notifications);
  const [feedbackNotice, setFeedbackNotice] = useState(null); // { message, type: 'success'|'info' }

  // Dynamic Derived Metrics
  const overallAttendance = useMemo(() => {
    return calculateOverallAttendance(courses);
  }, [courses]);

  const currentSgpa = useMemo(() => {
    return calculateSemesterSgpa(courses);
  }, [courses]);

  const totalRegisteredCredits = useMemo(() => {
    return courses.reduce((acc, c) => acc + (c.creditHours || 3), 0);
  }, [courses]);

  // Identify courses currently at risk (< safe threshold)
  const atRiskCourses = useMemo(() => {
    return courses.filter((c) => {
      const pct = (c.attendance.attended / c.attendance.total) * 100;
      return pct < attendanceSafeThreshold;
    });
  }, [courses, attendanceSafeThreshold]);

  const addCourse = (courseData) => {
    const newCourse = {
      id: `c-${Date.now()}`,
      code: courseData.code.trim().toUpperCase(),
      title: courseData.title.trim(),
      creditHours: Number(courseData.creditHours),
      type: courseData.type || 'Elective',
      instructor: courseData.instructor.trim(),
      room: courseData.room || 'TBA',
      schedule: courseData.schedule || 'TBA',
      attendance: {
        attended: 0,
        total: 0,
        recentHistory: [],
      },
      evaluations: [
        { id: `ev-${Date.now()}-1`, title: 'Assignments & Quizzes', weightage: 25, obtained: 0, total: 25, isPending: true },
        { id: `ev-${Date.now()}-2`, title: 'Midterm Exam', weightage: 25, obtained: 0, total: 25, isPending: true },
        { id: `ev-${Date.now()}-3`, title: 'Final Examination', weightage: 50, obtained: 0, total: 50, isPending: true },
      ],
    };

    setCourses((prev) => [newCourse, ...prev]);
    setStudent((prev) => ({
      ...prev,
      completedCredits: prev.completedCredits + Number(courseData.creditHours),
    }));

    setFeedbackNotice({
      title: 'Course Enrolled Successfully',
      message: `${newCourse.code} - ${newCourse.title} added to your 6th Semester curriculum.`,
      type: 'success',
    });
  };

  const simulateAttendance = (courseId, isPresent) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id !== courseId) return c;
        const newAttended = isPresent ? c.attendance.attended + 1 : c.attendance.attended;
        const newTotal = c.attendance.total + 1;
        const newHistory = [
          { date: 'Simulated', status: isPresent ? 'P' : 'A' },
          ...c.attendance.recentHistory.slice(0, 3),
        ];

        return {
          ...c,
          attendance: {
            ...c.attendance,
            attended: newAttended,
            total: newTotal,
            recentHistory: newHistory,
          },
        };
      })
    );
  };

  const resetCourseAttendance = (courseId) => {
    const original = INITIAL_COURSES.find((c) => c.id === courseId);
    if (!original) return;

    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, attendance: { ...original.attendance } } : c))
    );
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearFeedbackNotice = () => {
    setFeedbackNotice(null);
  };

  const value = {
    student,
    courses,
    activeView,
    setActiveView,
    selectedCourseId,
    setSelectedCourseId,
    attendanceSafeThreshold,
    setAttendanceSafeThreshold,
    searchQuery,
    setSearchQuery,
    attendanceFilter,
    setAttendanceFilter,
    notifications,
    dismissNotification,
    feedbackNotice,
    clearFeedbackNotice,
    overallAttendance,
    currentSgpa,
    totalRegisteredCredits,
    atRiskCourses,
    addCourse,
    simulateAttendance,
    resetCourseAttendance,
  };

  return <AcademicContext.Provider value={value}>{children}</AcademicContext.Provider>;
}

export function useAcademic() {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
}
