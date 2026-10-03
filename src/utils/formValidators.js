
export function validateCourseCode(code = '') {
  const trimmed = code.trim().toUpperCase();
  if (!trimmed) {
    return { isValid: false, error: 'Course code is required (e.g. CS-3004)' };
  }
  // Matches e.g. CS-3004, MT-2005, SS-1002, or CS3004
  const codeRegex = /^[A-Z]{2,3}-?[0-9]{4}$/;
  if (!codeRegex.test(trimmed)) {
    return { isValid: false, error: 'Format must be like CS-3004 (2-3 letters, 4 digits)' };
  }
  return { isValid: true, error: null };
}

export function validateCourseTitle(title = '') {
  const trimmed = title.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Course title is required' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Course title must be at least 3 characters' };
  }
  if (trimmed.length > 50) {
    return { isValid: false, error: 'Course title cannot exceed 50 characters' };
  }
  return { isValid: true, error: null };
}

export function validateCreditHours(credits) {
  const num = Number(credits);
  if (isNaN(num) || num < 1 || num > 4 || !Number.isInteger(num)) {
    return { isValid: false, error: 'Credit hours must be an integer between 1 and 4' };
  }
  return { isValid: true, error: null };
}

export function validateInstructor(name = '') {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Instructor name is required' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Instructor name must be at least 3 characters' };
  }
  return { isValid: true, error: null };
}

export function validateCourseForm(formData, existingCourses = []) {
  const errors = {};

  const codeCheck = validateCourseCode(formData.code);
  if (!codeCheck.isValid) {
    errors.code = codeCheck.error;
  } else {
    // Check duplicate
    const normalized = formData.code.trim().toUpperCase().replace('-', '');
    const isDuplicate = existingCourses.some(
      (c) => c.code.toUpperCase().replace('-', '') === normalized
    );
    if (isDuplicate) {
      errors.code = 'Course code is already registered in your semester';
    }
  }

  const titleCheck = validateCourseTitle(formData.title);
  if (!titleCheck.isValid) errors.title = titleCheck.error;

  const creditCheck = validateCreditHours(formData.creditHours);
  if (!creditCheck.isValid) errors.creditHours = creditCheck.error;

  const instructorCheck = validateInstructor(formData.instructor);
  if (!instructorCheck.isValid) errors.instructor = instructorCheck.error;

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
