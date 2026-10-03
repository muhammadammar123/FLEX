
export const INITIAL_COURSES = [
  {
    id: 'c-1',
    code: 'CS-3005',
    title: 'Software Engineering',
    creditHours: 3,
    type: 'Core',
    instructor: 'Dr. Farhan Tariq',
    room: 'CS-Lab 3 / E-201',
    schedule: 'Mon / Wed 08:30 - 10:00',
    attendance: {
      attended: 26,
      total: 30,
      recentHistory: [
        { date: '12-Sep', status: 'P' },
        { date: '10-Sep', status: 'P' },
        { date: '05-Sep', status: 'A' },
        { date: '03-Sep', status: 'P' },
      ],
    },
    evaluations: [
      { id: 'ev-1', title: 'Assignments (4)', weightage: 10, obtained: 8.5, total: 10 },
      { id: 'ev-2', title: 'Quizzes (3)', weightage: 15, obtained: 13.0, total: 15 },
      { id: 'ev-3', title: 'Midterm 1', weightage: 15, obtained: 13.5, total: 15 },
      { id: 'ev-4', title: 'Midterm 2', weightage: 15, obtained: 14.0, total: 15 },
      { id: 'ev-5', title: 'Course Project', weightage: 10, obtained: 9.0, total: 10 },
      { id: 'ev-6', title: 'Final Examination', weightage: 35, obtained: 0, total: 35, isPending: true },
    ],
  },
  {
    id: 'c-2',
    code: 'CS-3008',
    title: 'Operating Systems',
    creditHours: 3,
    type: 'Core',
    instructor: 'Engr. Bilal Masood',
    room: 'CS-Lecture Hall 1',
    schedule: 'Tue / Thu 10:00 - 11:30',
    attendance: {
      attended: 22,
      total: 30, // 73.3% - Critical debarment risk!
      recentHistory: [
        { date: '11-Sep', status: 'A' },
        { date: '09-Sep', status: 'A' },
        { date: '04-Sep', status: 'P' },
        { date: '02-Sep', status: 'P' },
      ],
    },
    evaluations: [
      { id: 'ev-7', title: 'Lab Tasks & Quizzes', weightage: 20, obtained: 15.0, total: 20 },
      { id: 'ev-8', title: 'Midterm 1', weightage: 20, obtained: 16.5, total: 20 },
      { id: 'ev-9', title: 'Midterm 2', weightage: 20, obtained: 15.0, total: 20 },
      { id: 'ev-10', title: 'Final Examination', weightage: 40, obtained: 0, total: 40, isPending: true },
    ],
  },
  {
    id: 'c-3',
    code: 'CS-3012',
    title: 'Mobile App Development',
    creditHours: 3,
    type: 'Core',
    instructor: 'Ms. Ayesha Siddiqui',
    room: 'Smart Lab 4',
    schedule: 'Mon / Wed 11:30 - 01:00',
    attendance: {
      attended: 27,
      total: 30, // 90.0% - Safe
      recentHistory: [
        { date: '12-Sep', status: 'P' },
        { date: '10-Sep', status: 'P' },
        { date: '05-Sep', status: 'P' },
        { date: '03-Sep', status: 'P' },
      ],
    },
    evaluations: [
      { id: 'ev-11', title: 'Assignments (3)', weightage: 15, obtained: 14.5, total: 15 },
      { id: 'ev-12', title: 'Quizzes (3)', weightage: 10, obtained: 9.5, total: 10 },
      { id: 'ev-13', title: 'Midterm 1 (App Prototype)', weightage: 15, obtained: 14.0, total: 15 },
      { id: 'ev-14', title: 'Midterm 2 (State & Charts)', weightage: 20, obtained: 18.5, total: 20 },
      { id: 'ev-15', title: 'Final Capstone App', weightage: 40, obtained: 0, total: 40, isPending: true },
    ],
  },
  {
    id: 'c-4',
    code: 'CS-3002',
    title: 'Database Systems',
    creditHours: 3,
    type: 'Core',
    instructor: 'Dr. Kashif Munir',
    room: 'Hall B',
    schedule: 'Tue / Thu 01:00 - 02:30',
    attendance: {
      attended: 23,
      total: 30, // 76.7% - Warning
      recentHistory: [
        { date: '11-Sep', status: 'P' },
        { date: '09-Sep', status: 'A' },
        { date: '04-Sep', status: 'P' },
        { date: '02-Sep', status: 'P' },
      ],
    },
    evaluations: [
      { id: 'ev-16', title: 'SQL Queries & Schema Lab', weightage: 15, obtained: 12.0, total: 15 },
      { id: 'ev-17', title: 'Quizzes (4)', weightage: 10, obtained: 7.5, total: 10 },
      { id: 'ev-18', title: 'Midterm 1', weightage: 15, obtained: 11.5, total: 15 },
      { id: 'ev-19', title: 'Midterm 2', weightage: 15, obtained: 13.0, total: 15 },
      { id: 'ev-20', title: 'Term Project', weightage: 10, obtained: 8.5, total: 10 },
      { id: 'ev-21', title: 'Final Examination', weightage: 35, obtained: 0, total: 35, isPending: true },
    ],
  },
  {
    id: 'c-5',
    code: 'MT-2005',
    title: 'Probability & Statistics',
    creditHours: 3,
    type: 'University Elective',
    instructor: 'Prof. Noman Raza',
    room: 'Auditorium 2',
    schedule: 'Fri 09:00 - 12:00',
    attendance: {
      attended: 25,
      total: 30, // 83.3% - Safe
      recentHistory: [
        { date: '13-Sep', status: 'P' },
        { date: '06-Sep', status: 'P' },
        { date: '30-Aug', status: 'A' },
        { date: '23-Aug', status: 'P' },
      ],
    },
    evaluations: [
      { id: 'ev-22', title: 'Homework Problem Sets', weightage: 10, obtained: 9.0, total: 10 },
      { id: 'ev-23', title: 'Quizzes (4)', weightage: 15, obtained: 13.5, total: 15 },
      { id: 'ev-24', title: 'Midterm 1', weightage: 20, obtained: 17.0, total: 20 },
      { id: 'ev-25', title: 'Midterm 2', weightage: 15, obtained: 13.0, total: 15 },
      { id: 'ev-26', title: 'Final Examination', weightage: 40, obtained: 0, total: 40, isPending: true },
    ],
  },
];
