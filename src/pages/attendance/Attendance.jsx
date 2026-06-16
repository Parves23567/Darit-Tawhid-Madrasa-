import React, { useState, useMemo } from 'react';
import {
  MdEventNote, MdCheckCircle, MdCancel, MdAccessTime,
  MdBeachAccess, MdSave, MdToday, MdClass
} from 'react-icons/md';
import { SAMPLE_STUDENTS } from '../../utils/sampleData';
import { CLASS_NAMES, CLASS_OPTIONS } from '../../utils/helpers';

const STATUS_OPTS = [
  { value: 'present', label: 'উপস্থিত', icon: MdCheckCircle, color: 'text-green-600', bg: 'bg-green-50 border-green-200', activeBg: 'bg-green-600 text-white border-green-600' },
  { value: 'absent',  label: 'অনুপস্থিত', icon: MdCancel,       color: 'text-red-500',   bg: 'bg-red-50 border-red-200',     activeBg: 'bg-red-500 text-white border-red-500' },
  { value: 'late',    label: 'দেরিতে',     icon: MdAccessTime,   color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', activeBg: 'bg-amber-500 text-white border-amber-500' },
  { value: 'leave',   label: 'ছুটি',       icon: MdBeachAccess,  color: 'text-blue-600',  bg: 'bg-blue-50 border-blue-200',   activeBg: 'bg-blue-500 text-white border-blue-500' },
];

export default function Attendance() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedClass, setSelectedClass] = useState('class1');
  const [attendance, setAttendance] = useState({});
  const [saved, setSaved] = useState(false);

  const classStudents = useMemo(() =>
    SAMPLE_STUDENTS.filter(s => s.class === selectedClass && s.status === 'active'),
    [selectedClass]
  );

  const setStatus = (studentId, status) => {
    setSaved(false);
    setAttendance(prev => ({ ...prev, [`${selectedDate}_${studentId}`]: status }));
  };

  const getStatus = (studentId) =>
    attendance[`${selectedDate}_${studentId}`] || 'present';

  const markAll = (status) => {
    const updates = {};
    classStudents.forEach(s => { updates[`${selectedDate}_${s.id}`] = status; });
    setAttendance(prev => ({ ...prev, ...updates }));
    setSaved(false);
  };

  const handleSave = () => {
    // In production: save to Firebase
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const summary = useMemo(() => {
    const counts = { present: 0, absent: 0, late: 0, leave: 0 };
    classStudents.forEach(s => {
      const st = getStatus(s.id);
      counts[st] = (counts[st] || 0) + 1;
    });
    return counts;
  }, [classStudents, attendance, selectedDate]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdEventNote className="text-green-700" /> হাজিরা ব্যবস্থাপনা</h1>
          <p className="page-subtitle">শ্রেণী নির্বাচন করে দৈনিক হাজিরা নিন</p>
        </div>
        <button onClick={handleSave} className={`btn-primary ${saved ? 'bg-green-800' : ''}`}>
          <MdSave size={20} /> {saved ? 'সংরক্ষিত হয়েছে!' : 'হাজিরা সংরক্ষণ'}
        </button>
      </div>

      {/* Controls */}
      <div className="card py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <MdToday className="text-green-700" size={20} />
            <input type="date" className="form-input w-auto" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} max={today} />
          </div>
          <div className="flex items-center gap-2">
            <MdClass className="text-green-700" size={20} />
            <select className="form-input w-auto" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              {CLASS_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div className="flex gap-2 ml-auto flex-wrap">
            <span className="text-sm text-gray-500 self-center">সবাইকে:</span>
            {STATUS_OPTS.map(opt => (
              <button key={opt.value} onClick={() => markAll(opt.value)} className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${opt.bg} ${opt.color} hover:opacity-80`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Badges */}
      <div className="grid grid-cols-4 gap-3">
        {STATUS_OPTS.map(opt => {
          const Icon = opt.icon;
          return (
            <div key={opt.value} className={`card py-3 text-center border ${opt.bg}`}>
              <Icon className={`mx-auto mb-1 ${opt.color}`} size={22} />
              <p className={`text-2xl font-bold ${opt.color}`}>{summary[opt.value]}</p>
              <p className="text-xs text-gray-500">{opt.label}</p>
            </div>
          );
        })}
      </div>

      {/* Student List */}
      <div className="card p-0 overflow-hidden">
        <div className="bg-green-700 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold">{CLASS_NAMES[selectedClass]} — হাজিরা তালিকা</h3>
            <p className="text-green-200 text-xs mt-0.5">মোট {classStudents.length} জন ছাত্র</p>
          </div>
          <span className="text-sm text-green-200">{selectedDate}</span>
        </div>

        {classStudents.length === 0 ? (
          <div className="p-12 text-center text-gray-400">এই শ্রেণীতে কোনো সক্রিয় ছাত্র নেই</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {classStudents.map((student, idx) => {
              const currentStatus = getStatus(student.id);
              return (
                <div key={student.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <span className="text-gray-400 text-sm w-6 text-right">{idx + 1}</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${student.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                    {student.nameBn?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{student.nameBn}</p>
                    <p className="text-xs text-gray-400">রোল: {student.roll} | {student.nameEn}</p>
                  </div>
                  <div className="flex gap-2">
                    {STATUS_OPTS.map(opt => {
                      const Icon = opt.icon;
                      const isActive = currentStatus === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setStatus(student.id, opt.value)}
                          title={opt.label}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${isActive ? opt.activeBg : `${opt.bg} ${opt.color} hover:opacity-80`}`}
                        >
                          <Icon size={14} />
                          <span className="hidden sm:inline">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
