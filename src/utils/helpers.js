// ─── Utility / Helper Functions ───────────────────────────────────────────────

// Format date to Bengali locale
export const formatDate = (date) => {
  if (!date) return '—';
  const d = date?.toDate ? date.toDate() : new Date(date);
  return d.toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format date short (DD/MM/YYYY)
export const formatDateShort = (date) => {
  if (!date) return '—';
  const d = date?.toDate ? date.toDate() : new Date(date);
  return d.toLocaleDateString('bn-BD');
};

// Format currency in Bangladeshi Taka
export const formatTaka = (amount) => {
  if (amount === null || amount === undefined) return '৳০';
  return `৳${Number(amount).toLocaleString('bn-BD')}`;
};

// Convert English digits to Bengali digits
export const toBengaliNumber = (num) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bengaliDigits[d]);
};

// Convert Bengali digits to English digits
export const toEnglishNumber = (str) => {
  const map = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
                 '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  return String(str).replace(/[০-৯]/g, (d) => map[d]);
};

// Get current Bengali month name
export const getBengaliMonth = (date = new Date()) => {
  return date.toLocaleDateString('bn-BD', { month: 'long', year: 'numeric' });
};

// Class names mapping
export const CLASS_NAMES = {
  'play': 'প্লে',
  'nursery': 'নার্সারি',
  'class1': 'শ্রেণী ১',
  'class2': 'শ্রেণী ২',
  'class3': 'শ্রেণী ৩',
  'class4': 'শ্রেণী ৪',
  'class5': 'শ্রেণী ৫',
};

// All class options
export const CLASS_OPTIONS = [
  { value: 'play',    label: 'প্লে' },
  { value: 'nursery', label: 'নার্সারি' },
  { value: 'class1',  label: 'শ্রেণী ১' },
  { value: 'class2',  label: 'শ্রেণী ২' },
  { value: 'class3',  label: 'শ্রেণী ৩' },
  { value: 'class4',  label: 'শ্রেণী ৪' },
  { value: 'class5',  label: 'শ্রেণী ৫' },
];

// Blood group options
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Gender options
export const GENDER_OPTIONS = [
  { value: 'male',   label: 'ছেলে' },
  { value: 'female', label: 'মেয়ে' },
];

// User roles
export const ROLES = {
  ADMIN:   'admin',
  TEACHER: 'teacher',
  PARENT:  'parent',
  STUDENT: 'student',
};

// Role labels in Bangla
export const ROLE_LABELS = {
  admin:   'সুপার অ্যাডমিন',
  teacher: 'শিক্ষক',
  parent:  'অভিভাবক',
  student: 'ছাত্র/ছাত্রী',
};

// Attendance status options
export const ATTENDANCE_STATUS = [
  { value: 'present', label: 'উপস্থিত', color: 'badge-success' },
  { value: 'absent',  label: 'অনুপস্থিত', color: 'badge-danger' },
  { value: 'late',    label: 'দেরিতে', color: 'badge-warning' },
  { value: 'leave',   label: 'ছুটি', color: 'badge-info' },
];

// Payment method options
export const PAYMENT_METHODS = [
  { value: 'cash',  label: 'নগদ টাকা' },
  { value: 'bkash', label: 'বিকাশ' },
  { value: 'nagad', label: 'নগদ' },
  { value: 'rocket', label: 'রকেট' },
  { value: 'bank',  label: 'ব্যাংক' },
];

// Fee types
export const FEE_TYPES = [
  { value: 'admission',  label: 'ভর্তি ফি' },
  { value: 'monthly',    label: 'মাসিক বেতন' },
  { value: 'exam',       label: 'পরীক্ষা ফি' },
  { value: 'annual',     label: 'বার্ষিক ফি' },
  { value: 'transport',  label: 'পরিবহন ফি' },
  { value: 'other',      label: 'অন্যান্য ফি' },
];

// Exam types
export const EXAM_TYPES = [
  { value: 'class_test',  label: 'ক্লাস টেস্ট' },
  { value: 'weekly',      label: 'সাপ্তাহিক পরীক্ষা' },
  { value: 'monthly',     label: 'মাসিক পরীক্ষা' },
  { value: 'half_yearly', label: 'অর্ধ-বার্ষিক পরীক্ষা' },
  { value: 'annual',      label: 'বার্ষিক পরীক্ষা' },
];

// Truncate long text
export const truncate = (text, maxLength = 40) => {
  if (!text) return '—';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// Generate student ID
export const generateStudentId = (year, seq) => {
  return `DT${year}${String(seq).padStart(4, '0')}`;
};

// Get days in month
export const getDaysInMonth = (year, month) =>
  new Date(year, month, 0).getDate();

// Months in Bengali
export const MONTHS_BN = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল',
  'মে', 'জুন', 'জুলাই', 'আগস্ট',
  'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];
