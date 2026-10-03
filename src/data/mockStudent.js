
export const INITIAL_STUDENT_PROFILE = {
  rollNo: '21K-3210',
  name: 'Muhammad Saad',
  degree: 'BS Computer Science',
  campus: 'FAST-NUCES Main Campus',
  semester: '6th Semester',
  section: 'BCS-6A',
  advisor: 'Dr. Zeeshan Ali',
  cgpa: 3.64,
  currentSgpa: 3.72,
  completedCredits: 84,
  totalDegreeCredits: 134,
  standing: "Dean's Honor List",

  gpaHistory: [
    { semester: 'Sem 1', gpa: 3.28 },
    { semester: 'Sem 2', gpa: 3.45 },
    { semester: 'Sem 3', gpa: 3.19 },
    { semester: 'Sem 4', gpa: 3.68 },
    { semester: 'Sem 5', gpa: 3.72 },
  ],

  creditBreakdown: {
    coreCompleted: 54,
    coreTotal: 72,
    electivesCompleted: 18,
    electivesTotal: 36,
    genEdCompleted: 12,
    genEdTotal: 26,
  },

  notifications: [
    {
      id: 'notif-1',
      title: 'Debarment Risk Warning',
      message: 'Operating Systems attendance has dropped to 73.3%. Attend upcoming lectures to stay above 75%.',
      type: 'critical',
      date: 'Today, 10:30 AM',
    },
    {
      id: 'notif-2',
      title: 'Midterm 2 Results Posted',
      message: 'Mobile Application Development Midterm 2 marks (18.5/20) have been published on FLEX.',
      type: 'info',
      date: 'Yesterday',
    },
    {
      id: 'notif-3',
      title: 'Course Evaluation Open',
      message: 'QEC Student Feedback survey for Spring 2026 is now open. Please complete before finals.',
      type: 'warning',
      date: '3 days ago',
    },
  ],
};
