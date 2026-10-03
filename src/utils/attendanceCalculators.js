import { ACADEMIC_RULES } from '../constants/academicRules';

export function calculatePercentage(attended, total) {
  if (!total || total <= 0) return 0;
  return Number(((attended / total) * 100).toFixed(1));
}

export function getAttendanceStatus(
  percentage,
  safeThreshold = ACADEMIC_RULES.ATTENDANCE_SAFE_THRESHOLD,
  warningThreshold = ACADEMIC_RULES.ATTENDANCE_WARNING_THRESHOLD
) {
  if (percentage >= safeThreshold) return 'SAFE';
  if (percentage >= warningThreshold) return 'WARNING';
  return 'CRITICAL';
}

export function calculateBunkMargin(
  attended,
  total,
  threshold = ACADEMIC_RULES.ATTENDANCE_SAFE_THRESHOLD
) {
  if (!total || total <= 0) return 0;
  const currentPct = (attended / total) * 100;
  if (currentPct < threshold) return 0;

  const t = threshold;
  const maxSafeBunks = Math.floor((100 * attended - t * total) / t);
  return Math.max(0, maxSafeBunks);
}

export function calculateClassesToRecover(
  attended,
  total,
  threshold = ACADEMIC_RULES.ATTENDANCE_SAFE_THRESHOLD
) {
  if (!total || total <= 0) return 0;
  const currentPct = (attended / total) * 100;
  if (currentPct >= threshold) return 0;

  const t = threshold;
  if (t >= 100) return 99; // Edge case
  const classesNeeded = Math.ceil((t * total - 100 * attended) / (100 - t));
  return Math.max(0, classesNeeded);
}

export function calculateOverallAttendance(courses = []) {
  if (!courses.length) return { attended: 0, total: 0, percentage: 0 };

  const aggregate = courses.reduce(
    (acc, course) => {
      const att = course.attendance?.attended || 0;
      const tot = course.attendance?.total || 0;
      return {
        attended: acc.attended + att,
        total: acc.total + tot,
      };
    },
    { attended: 0, total: 0 }
  );

  const percentage = calculatePercentage(aggregate.attended, aggregate.total);
  return {
    attended: aggregate.attended,
    total: aggregate.total,
    percentage,
    status: getAttendanceStatus(percentage),
  };
}

export function filterCoursesByAttendance(courses = [], filterType = 'ALL') {
  if (filterType === 'ALL') return courses;

  return courses.filter((course) => {
    const pct = calculatePercentage(course.attendance?.attended, course.attendance?.total);
    const status = getAttendanceStatus(pct);
    return status === filterType;
  });
}
