import React, { useState, useMemo } from 'react';
import {
  MdAssignment, MdAdd, MdClose, MdEdit, MdDelete, MdSearch, MdSave
} from 'react-icons/md';
import { SAMPLE_STUDENTS } from '../../utils/sampleData';
import { CLASS_NAMES, CLASS_OPTIONS, EXAM_TYPES } from '../../utils/helpers';
import { getGrade } from '../../utils/gradeCalculator';

// Alias for percentage-based grade calculation
const calculateGrade = (marks, total) => {
  const pct = total > 0 ? (marks / total) * 100 : 0;
  const g = getGrade(pct);
  return { letter: g.grade, gpa: g.point };
};

// Sample exam data
const INITIAL_EXAMS = [
  { id: 'EX001', name: 'অর্ধ-বার্ষিক পরীক্ষা ২০২৪', type: 'half_yearly', class: 'class5', date: '2024-06-15', totalMarks: 100, status: 'active' },
  { id: 'EX002', name: 'মাসিক পরীক্ষা — মে ২০২৪',   type: 'monthly',    class: 'class4', date: '2024-05-25', totalMarks: 50,  status: 'completed' },
  { id: 'EX003', name: 'ক্লাস টেস্ট — গণিত',         type: 'class_test', class: 'class3', date: '2024-06-10', totalMarks: 25,  status: 'active' },
];

const EMPTY_EXAM = { name: '', type: 'monthly', class: 'class1', date: '', totalMarks: '100', status: 'active' };

export default function Exams() {
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'marks'
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(EMPTY_EXAM);
  const [selectedExam, setSelectedExam] = useState(null);
  const [marks, setMarks] = useState({});
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');

  const filteredExams = useMemo(() => exams.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = !q || e.name?.includes(q);
    const matchClass = !filterClass || e.class === filterClass;
    return matchSearch && matchClass;
  }), [exams, search, filterClass]);

  const f = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const openAdd = () => { setForm(EMPTY_EXAM); setEditData(null); setShowModal(true); };
  const openEdit = (e) => { setForm({ ...e }); setEditData(e); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleSave = () => {
    if (!form.name.trim()) return alert('পরীক্ষার নাম প্রয়োজন');
    if (editData) {
      setExams(prev => prev.map(e => e.id === editData.id ? { ...e, ...form } : e));
    } else {
      const newId = `EX${String(exams.length + 1).padStart(3, '0')}`;
      setExams(prev => [...prev, { ...form, id: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('এই পরীক্ষাটি মুছে ফেলবেন?')) setExams(prev => prev.filter(e => e.id !== id));
  };

  const openMarks = (exam) => {
    setSelectedExam(exam);
    setActiveTab('marks');
    // Initialize marks if not set
    const examStudents = SAMPLE_STUDENTS.filter(s => s.class === exam.class);
    const initial = {};
    examStudents.forEach(s => { initial[s.id] = marks[`${exam.id}_${s.id}`] || ''; });
    setMarks(prev => {
      const updated = { ...prev };
      examStudents.forEach(s => {
        const key = `${exam.id}_${s.id}`;
        if (!updated[key]) updated[key] = '';
      });
      return updated;
    });
  };

  const setMark = (studentId, val) => {
    const key = `${selectedExam.id}_${studentId}`;
    setMarks(prev => ({ ...prev, [key]: val }));
  };

  const getMark = (studentId) => marks[`${selectedExam?.id}_${studentId}`] ?? '';

  const examStudents = selectedExam ? SAMPLE_STUDENTS.filter(s => s.class === selectedExam.class) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdAssignment className="text-green-700" /> পরীক্ষা ব্যবস্থাপনা</h1>
          <p className="page-subtitle">পরীক্ষা তৈরি, নম্বর প্রদান ও ফলাফল প্রস্তুত</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'marks' && <button onClick={() => setActiveTab('list')} className="btn-secondary">← পরীক্ষা তালিকা</button>}
          <button onClick={openAdd} className="btn-primary"><MdAdd size={20} /> নতুন পরীক্ষা</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {[['list', 'পরীক্ষা তালিকা'], ['marks', 'নম্বর প্রদান']].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'list' && (
        <>
          {/* Filters */}
          <div className="card py-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input className="form-input pl-9" placeholder="পরীক্ষার নাম খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="form-input w-auto" value={filterClass} onChange={e => setFilterClass(e.target.value)}>
                <option value="">সব শ্রেণী</option>
                {CLASS_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {/* Exam Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.length === 0 && <div className="col-span-3 text-center text-gray-400 py-12">কোনো পরীক্ষা পাওয়া যায়নি</div>}
            {filteredExams.map(exam => (
              <div key={exam.id} className="card hover:-translate-y-1 transition-transform duration-200">
                <div className="flex items-start justify-between mb-3">
                  <span className={`badge ${exam.status === 'active' ? 'badge-warning' : 'badge-success'}`}>
                    {exam.status === 'active' ? 'চলমান' : 'সম্পন্ন'}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(exam)} className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg"><MdEdit size={15} /></button>
                    <button onClick={() => handleDelete(exam.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><MdDelete size={15} /></button>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{exam.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge badge-info">{CLASS_NAMES[exam.class]}</span>
                  <span className="badge badge-gray">{EXAM_TYPES.find(t => t.value === exam.type)?.label}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                  <div><span className="text-xs text-gray-400">তারিখ</span><br /><span className="font-medium text-gray-700">{exam.date}</span></div>
                  <div><span className="text-xs text-gray-400">পূর্ণমান</span><br /><span className="font-medium text-gray-700">{exam.totalMarks}</span></div>
                </div>
                <button onClick={() => openMarks(exam)} className="btn-primary w-full justify-center text-sm py-2">
                  নম্বর দিন
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'marks' && selectedExam && (
        <div className="space-y-4">
          <div className="card bg-green-50 border border-green-200">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <p className="font-bold text-green-800">{selectedExam.name}</p>
                <p className="text-sm text-green-600">{CLASS_NAMES[selectedExam.class]} | পূর্ণমান: {selectedExam.totalMarks}</p>
              </div>
              <button onClick={() => { /* save */ }} className="btn-primary ml-auto"><MdSave size={18} /> নম্বর সংরক্ষণ</button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>রোল</th>
                  <th>ছাত্রের নাম</th>
                  <th>প্রাপ্ত নম্বর (/{selectedExam.totalMarks})</th>
                  <th>গ্রেড</th>
                  <th>পয়েন্ট</th>
                </tr>
              </thead>
              <tbody>
                {examStudents.map(s => {
                  const mark = getMark(s.id);
                  const grade = mark !== '' ? calculateGrade(Number(mark), Number(selectedExam.totalMarks)) : null;
                  return (
                    <tr key={s.id}>
                      <td className="text-gray-500 font-mono">{s.roll}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${s.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>{s.nameBn?.charAt(0)}</div>
                          <span className="font-medium text-gray-800">{s.nameBn}</span>
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          max={selectedExam.totalMarks}
                          value={mark}
                          onChange={e => setMark(s.id, e.target.value)}
                          className="form-input w-28 text-center"
                          placeholder="—"
                        />
                      </td>
                      <td>
                        {grade ? (
                          <span className={`badge ${grade.letter === 'F' ? 'badge-danger' : grade.gpa >= 4 ? 'badge-success' : 'badge-warning'}`}>
                            {grade.letter}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="font-semibold text-gray-700">{grade ? grade.gpa : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">{editData ? 'পরীক্ষা সম্পাদনা' : 'নতুন পরীক্ষা তৈরি'}</h2>
              <button onClick={closeModal}><MdClose size={22} className="text-gray-400" /></button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group sm:col-span-2"><label className="form-label">পরীক্ষার নাম *</label><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} placeholder="অর্ধ-বার্ষিক পরীক্ষা ২০২৪" /></div>
              <div className="form-group"><label className="form-label">পরীক্ষার ধরন</label>
                <select className="form-input" value={form.type} onChange={e => f('type', e.target.value)}>
                  {EXAM_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">শ্রেণী</label>
                <select className="form-input" value={form.class} onChange={e => f('class', e.target.value)}>
                  {CLASS_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">তারিখ</label><input type="date" className="form-input" value={form.date} onChange={e => f('date', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">পূর্ণমান</label><input type="number" className="form-input" value={form.totalMarks} onChange={e => f('totalMarks', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">অবস্থা</label>
                <select className="form-input" value={form.status} onChange={e => f('status', e.target.value)}>
                  <option value="active">চলমান</option>
                  <option value="completed">সম্পন্ন</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={closeModal} className="btn-secondary">বাতিল</button>
              <button onClick={handleSave} className="btn-primary">{editData ? 'আপডেট' : 'তৈরি করুন'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
