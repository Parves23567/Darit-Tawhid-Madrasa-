// ─── Grade Calculator ─────────────────────────────────────────────────────────
// বাংলাদেশ জাতীয় শিক্ষাক্রম অনুযায়ী গ্রেড ও GPA গণনা

export const GRADE_SCALE = [
  { min: 80, max: 100, grade: 'A+', point: 5.0, label: 'এ প্লাস' },
  { min: 70, max: 79,  grade: 'A',  point: 4.0, label: 'এ' },
  { min: 60, max: 69,  grade: 'A-', point: 3.5, label: 'এ মাইনাস' },
  { min: 50, max: 59,  grade: 'B',  point: 3.0, label: 'বি' },
  { min: 40, max: 49,  grade: 'C',  point: 2.0, label: 'সি' },
  { min: 33, max: 39,  grade: 'D',  point: 1.0, label: 'ডি' },
  { min: 0,  max: 32,  grade: 'F',  point: 0.0, label: 'ফেল' },
];

// Get grade info from marks
export const getGrade = (marks) => {
  const m = Number(marks);
  const found = GRADE_SCALE.find((g) => m >= g.min && m <= g.max);
  return found || GRADE_SCALE[GRADE_SCALE.length - 1];
};

// Calculate GPA from array of marks
export const calculateGPA = (marksArray) => {
  if (!marksArray || marksArray.length === 0) return 0;
  const validMarks = marksArray.filter((m) => m !== null && m !== undefined);
  if (validMarks.length === 0) return 0;
  const totalPoints = validMarks.reduce((sum, m) => sum + getGrade(m).point, 0);
  const gpa = totalPoints / validMarks.length;
  return parseFloat(gpa.toFixed(2));
};

// Get grade color class
export const getGradeColor = (grade) => {
  const colors = {
    'A+': 'text-green-700 bg-green-100',
    'A':  'text-green-600 bg-green-50',
    'A-': 'text-teal-700 bg-teal-100',
    'B':  'text-blue-700 bg-blue-100',
    'C':  'text-amber-700 bg-amber-100',
    'D':  'text-orange-700 bg-orange-100',
    'F':  'text-red-700 bg-red-100',
  };
  return colors[grade] || 'text-gray-700 bg-gray-100';
};

// Calculate result summary
export const calculateResult = (subjectMarks) => {
  const marks = Object.values(subjectMarks).filter((m) => m !== null && m !== undefined);
  const total = marks.reduce((sum, m) => sum + Number(m), 0);
  const average = marks.length > 0 ? total / marks.length : 0;
  const gpa = calculateGPA(marks);
  const grade = getGrade(average);
  const passed = !marks.some((m) => Number(m) < 33);

  return {
    total,
    average: parseFloat(average.toFixed(2)),
    gpa,
    grade: grade.grade,
    gradeLabel: grade.label,
    passed,
  };
};
