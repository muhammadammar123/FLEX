// University attendance thresholds and grade scale

export const ACADEMIC_RULES = {
  // University Attendance Policy (FAST-NUCES standard)
  ATTENDANCE_SAFE_THRESHOLD: 80,      // At or above 80%: Safe to appear in final exams
  ATTENDANCE_WARNING_THRESHOLD: 75,   // 75% - 79.9%: Warning zone
  ATTENDANCE_CRITICAL_THRESHOLD: 75,  // Below 75%: Immediate F/A Debarment Risk

  // Academic Honor Cutoffs
  DEANS_LIST_GPA: 3.50,
  RECTORS_LIST_GPA: 4.00,
  PROBATION_GPA_LIMIT: 2.00,

  // Graduation Requirements
  TOTAL_DEGREE_CREDITS: 134,
};

// University 4.00 Scale Grade Conversion Table
export const GRADE_SCALE = [
  { grade: 'A',  minPercentage: 86, gpa: 4.00, description: 'Outstanding' },
  { grade: 'A-', minPercentage: 82, gpa: 3.67, description: 'Excellent' },
  { grade: 'B+', minPercentage: 78, gpa: 3.33, description: 'Very Good' },
  { grade: 'B',  minPercentage: 74, gpa: 3.00, description: 'Good' },
  { grade: 'B-', minPercentage: 70, gpa: 2.67, description: 'Above Average' },
  { grade: 'C+', minPercentage: 66, gpa: 2.33, description: 'Average' },
  { grade: 'C',  minPercentage: 62, gpa: 2.00, description: 'Satisfactory' },
  { grade: 'C-', minPercentage: 58, gpa: 1.67, description: 'Pass' },
  { grade: 'D+', minPercentage: 54, gpa: 1.33, description: 'Bare Pass' },
  { grade: 'D',  minPercentage: 50, gpa: 1.00, description: 'Minimum Pass' },
  { grade: 'F',  minPercentage: 0,  gpa: 0.00, description: 'Fail / Repeat' },
];
