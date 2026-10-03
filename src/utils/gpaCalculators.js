import { GRADE_SCALE } from '../constants/academicRules';

export function calculateCourseMarks(evaluations = []) {
  if (!evaluations.length) {
    return { obtainedTotal: 0, conductedWeightage: 0, pendingWeightage: 0, percentageOnConducted: 0 };
  }

  const result = evaluations.reduce(
    (acc, item) => {
      if (item.isPending) {
        return { ...acc, pendingWeightage: acc.pendingWeightage + (item.weightage || 0) };
      }
      return {
        obtainedTotal: acc.obtainedTotal + (item.obtained || 0),
        conductedWeightage: acc.conductedWeightage + (item.weightage || 0),
        pendingWeightage: acc.pendingWeightage,
      };
    },
    { obtainedTotal: 0, conductedWeightage: 0, pendingWeightage: 0 }
  );

  const percentageOnConducted =
    result.conductedWeightage > 0
      ? Number(((result.obtainedTotal / result.conductedWeightage) * 100).toFixed(1))
      : 0;

  return {
    ...result,
    obtainedTotal: Number(result.obtainedTotal.toFixed(2)),
    percentageOnConducted,
  };
}

export function getGradeFromPercentage(percentage) {
  const matched = GRADE_SCALE.find((entry) => percentage >= entry.minPercentage);
  return matched || GRADE_SCALE[GRADE_SCALE.length - 1]; // fallback to F
}

export function calculateRequiredFinalMarks(
  currentObtained,
  finalWeightage,
  finalMaxMarks = 100,
  targetGradeLetter = 'A'
) {
  const targetEntry = GRADE_SCALE.find((g) => g.grade === targetGradeLetter);
  if (!targetEntry) return { feasible: false, requiredMarks: 0, note: 'Unknown grade target' };

  const targetPercentage = targetEntry.minPercentage;
  const neededWeightage = targetPercentage - currentObtained;

  if (neededWeightage <= 0) {
    return {
      feasible: true,
      requiredMarks: 0,
      percentageNeededOnFinal: 0,
      difficulty: 'ALREADY_ACHIEVED',
      note: `You have already secured ${targetGradeLetter} with your current sessional marks!`,
    };
  }

  const marksNeeded = (neededWeightage / finalWeightage) * finalMaxMarks;
  const percentageNeededOnFinal = (marksNeeded / finalMaxMarks) * 100;

  if (marksNeeded > finalMaxMarks) {
    return {
      feasible: false,
      requiredMarks: Number(marksNeeded.toFixed(1)),
      percentageNeededOnFinal: Number(percentageNeededOnFinal.toFixed(1)),
      difficulty: 'IMPOSSIBLE',
      note: `Mathematically unreachable (requires ${marksNeeded.toFixed(1)} / ${finalMaxMarks}). Consider aiming for a realistic grade.`,
    };
  }

  let difficulty = 'ACHIEVABLE';
  if (percentageNeededOnFinal >= 85) difficulty = 'CHALLENGING';
  else if (percentageNeededOnFinal <= 65) difficulty = 'EASY';

  return {
    feasible: true,
    requiredMarks: Number(marksNeeded.toFixed(1)),
    percentageNeededOnFinal: Number(percentageNeededOnFinal.toFixed(1)),
    difficulty,
    note: `You need ${marksNeeded.toFixed(1)} / ${finalMaxMarks} (${percentageNeededOnFinal.toFixed(0)}%) in Finals.`,
  };
}

export function calculateSemesterSgpa(courses = []) {
  if (!courses.length) return 0.0;

  let totalQualityPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const { obtainedTotal, conductedWeightage } = calculateCourseMarks(course.evaluations);
    // Project final grade based on current sessional run-rate
    const projectedPercentage = conductedWeightage > 0 ? (obtainedTotal / conductedWeightage) * 100 : 80;
    const gradeObj = getGradeFromPercentage(projectedPercentage);
    const credits = course.creditHours || 3;

    totalQualityPoints += gradeObj.gpa * credits;
    totalCredits += credits;
  });

  if (totalCredits === 0) return 0.0;
  return Number((totalQualityPoints / totalCredits).toFixed(2));
}
