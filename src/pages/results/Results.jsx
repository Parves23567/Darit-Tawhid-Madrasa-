import React, { useState, useMemo } from 'react';
import { MdBarChart, MdSearch, MdClass, MdTrendingUp, MdStar } from 'react-icons/md';
import { SAMPLE_STUDENTS } from '../../utils/sampleData';
import { CLASS_NAMES, CLASS_OPTIONS } from '../../utils/helpers';
import { getGrade } from '../../utils/gradeCalculator';

// Alias to match existing usage
const calculateGrade = (marks, total) => {
  const pct = total > 0 ? (marks / total) * 100 : 0;
  const g = getGrade(pct);
  return { letter: g.grade, gpa: g.point };
};

// Sample results data
const SAMPLE_RESULTS = [
  { studentId: 'ST001', examName: 'অর্ধ-বার্ষিক ২০২৪', class: 'class5', subjects: { বাংলা: 82, ইংরেজি: 75, গণিত: 90, আরবি: 88, বিজ্ঞান: 79 }, totalMarks: 100 },
  { studentId: 'ST008', examName: 'অর্ধ-বার্ষিক ২০২৪', class: 'class5', subjects: { বাংলা: 70, ইংরেজি: 65, গণিত: 72, আরবি: 80, বিজ্ঞান: 68 }, totalMarks: 100 },
  { studentId: 'ST002', examName: 'অর্ধ-বার্ষিক ২০২৪', class: 'class4', subjects: { বাংলা: 88, ইংরেজি: 85, গণিত: 78, আরবি: 90 }, totalMarks: 100 },
  { studentId: 'ST009', examName: 'অর্ধ-বার্ষিক ২০২৪', class: 'class4', subjects: { বাংলা: 60, ইংরেজি: 55, গণিত: 62, আরবি: 70 }, totalMarks: 100 },
  { studentId: 'ST003', examName: 'অর্ধ-বার্ষিক ২০২৪', class: 'class3', subjects: { বাংলা: 95, ইংরেজি: 92, গণিত: 98, বিজ্ঞান: 91 }, totalMarks: 100 },
  { studentId: 'ST010', examName: 'অর্ধ-বার্ষিক ২০২৪', class: 'class3', subjects: { বাংলা: 74, ইংরেজি: 68, গণিত: 80, বিজ্ঞান: 77 }, totalMarks: 100 },
];

function computeResult(result) {
  const subjectNames = Object.keys(result.subjects);
  const total = subjectNames.reduce((s, k) => s + result.subjects[k], 0);
  const avg = total / subjectNames.length;
  const grade = calculateGrade(avg, result.totalMarks);
  const subjectGrades = {};
  subjectNames.forEach(s => { subjectGrades[s] = calculateGrade(result.subjects[s], result.totalMarks); });
  return { total, avg: Math.round(avg * 10) / 10, grade, subjectGrades };
}

export default function Results() {
  const [selectedClass, setSelectedClass] = useState('class5');
  const [selectedExam, setSelectedExam] = useState('অর্ধ-বার্ষিক ২০২৪');
  const [search, setSearch] = useState('');

  const classResults = useMemo(() => {
    return SAMPLE_RESULTS
      .filter(r => r.class === selectedClass && r.examName === selectedExam)
      .map(r => {
        const student = SAMPLE_STUDENTS.find(s => s.id === r.studentId);
        const computed = computeResult(r);
        return { ...r, student, ...computed };
      })
      .sort((a, b) => b.avg - a.avg)
      .map((r, idx) => ({ ...r, rank: idx + 1 }))
      .filter(r => !search || r.student?.nameBn?.includes(search));
  }, [selectedClass, selectedExam, search]);

  const exams = [...new Set(SAMPLE_RESULTS.map(r => r.examName))];
  const classExams = exams.filter(e => SAMPLE_RESULTS.some(r => r.class === selectedClass && r.examName === e));

  const subjects = classResults[0] ? Object.keys(classResults[0].subjects) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdBarChart className="text-green-700" /> পরীক্ষার ফলাফল</h1>
          <p className="page-subtitle">শ্রেণীভিত্তিক ফলাফল, মেধাতালিকা ও গ্রেড</p>
        </div>
        <button onClick={() => window.print()} className="btn-secondary">মার্কশিট প্রিন্ট</button>
      </div>

      {/* Filters */}
      <div className="card py-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <MdClass className="text-green-700" size={18} />
            <select className="form-input w-auto" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              {CLASS_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <select className="form-input w-auto" value={selectedExam} onChange={e => setSelectedExam(e.target.value)}>
            {exams.map(e => <option key={e}>{e}</option>)}
          </select>
          <div className="relative flex-1 min-w-[180px]">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input className="form-input pl-9" placeholder="ছাত্র খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      {classResults.length === 0 ? (
        <div className="card text-center py-20 text-gray-400">
          <MdTrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">এই শ্রেণীর ফলাফল পাওয়া যায়নি</p>
          <p className="text-sm mt-1">নম্বর প্রদান করলে এখানে ফলাফল দেখাবে</p>
        </div>
      ) : (
        <>
          {/* Toppers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {classResults.slice(0, 3).map((r, i) => (
              <div key={r.studentId} className={`card text-center border-2 ${i === 0 ? 'border-amber-400 bg-amber-50' : i === 1 ? 'border-gray-300 bg-gray-50' : 'border-orange-300 bg-orange-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2 ${i === 0 ? 'bg-amber-500 text-white' : i === 1 ? 'bg-gray-400 text-white' : 'bg-orange-400 text-white'}`}>
                  {r.rank}
                </div>
                <MdStar className={`mx-auto mb-1 ${i === 0 ? 'text-amber-500' : 'text-gray-400'}`} size={20} />
                <p className="font-bold text-gray-800">{r.student?.nameBn}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{r.avg}%</p>
                <span className={`badge mt-1 ${r.grade?.letter === 'A+' ? 'badge-success' : r.grade?.letter === 'F' ? 'badge-danger' : 'badge-warning'}`}>{r.grade?.letter} ({r.grade?.gpa})</span>
              </div>
            ))}
          </div>

          {/* Full Results Table */}
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>মেধাক্রম</th>
                  <th>ছাত্রের নাম</th>
                  {subjects.map(s => <th key={s}>{s}</th>)}
                  <th>গড়</th>
                  <th>গ্রেড</th>
                  <th>পয়েন্ট</th>
                </tr>
              </thead>
              <tbody>
                {classResults.map(r => (
                  <tr key={r.studentId}>
                    <td>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${r.rank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                        {r.rank}
                      </span>
                    </td>
                    <td>
                      <div>
                        <p className="font-semibold text-gray-800">{r.student?.nameBn}</p>
                        <p className="text-xs text-gray-400">রোল: {r.student?.roll}</p>
                      </div>
                    </td>
                    {subjects.map(s => (
                      <td key={s}>
                        <div className="text-center">
                          <p className="font-semibold text-gray-800">{r.subjects[s]}</p>
                          <span className={`badge text-xs ${r.subjectGrades[s]?.letter === 'F' ? 'badge-danger' : r.subjectGrades[s]?.gpa >= 4 ? 'badge-success' : 'badge-warning'}`}>
                            {r.subjectGrades[s]?.letter}
                          </span>
                        </div>
                      </td>
                    ))}
                    <td className="font-bold text-gray-800 text-center">{r.avg}%</td>
                    <td>
                      <span className={`badge ${r.grade?.letter === 'F' ? 'badge-danger' : r.grade?.gpa >= 4 ? 'badge-success' : 'badge-warning'}`}>
                        {r.grade?.letter}
                      </span>
                    </td>
                    <td className="font-semibold text-center text-gray-700">{r.grade?.gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
