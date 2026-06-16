import React, { useState } from 'react';
import { MdSchedule, MdAdd, MdEdit, MdDelete, MdClose, MdClass } from 'react-icons/md';
import { CLASS_NAMES, CLASS_OPTIONS } from '../../utils/helpers';

const DAYS = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার'];
const PERIODS = ['১ম', '২য়', '৩য়', '৪র্থ', '৫ম', '৬ষ্ঠ', '৭ম'];
const SUBJECTS = ['বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান', 'সমাজ বিজ্ঞান', 'আরবি', 'ইসলাম শিক্ষা', 'হিফজুল কোরান', 'শারীরিক শিক্ষা'];

const PERIOD_COLORS = [
  'bg-green-100 text-green-800 border-green-200',
  'bg-blue-100 text-blue-800 border-blue-200',
  'bg-purple-100 text-purple-800 border-purple-200',
  'bg-amber-100 text-amber-800 border-amber-200',
  'bg-pink-100 text-pink-800 border-pink-200',
  'bg-teal-100 text-teal-800 border-teal-200',
  'bg-orange-100 text-orange-800 border-orange-200',
  'bg-indigo-100 text-indigo-800 border-indigo-200',
  'bg-red-100 text-red-800 border-red-200',
];

const SUBJECT_COLOR_MAP = {};
SUBJECTS.forEach((s, i) => { SUBJECT_COLOR_MAP[s] = PERIOD_COLORS[i % PERIOD_COLORS.length]; });

const INITIAL_ROUTINE = {
  class1: {
    রবিবার: { '১ম': 'বাংলা', '২য়': 'গণিত', '৩য়': 'ইংরেজি', '৪র্থ': 'আরবি', '৫ম': 'বিজ্ঞান' },
    সোমবার: { '১ম': 'গণিত', '২য়': 'বাংলা', '৩য়': 'আরবি', '৪র্থ': 'ইসলাম শিক্ষা', '৫ম': 'ইংরেজি' },
    মঙ্গলবার: { '১ম': 'ইংরেজি', '২য়': 'বিজ্ঞান', '৩য়': 'বাংলা', '৪র্থ': 'গণিত', '৫ম': 'আরবি' },
    বুধবার: { '১ম': 'আরবি', '২য়': 'ইসলাম শিক্ষা', '৩য়': 'গণিত', '৪র্থ': 'বাংলা', '৫ম': 'বিজ্ঞান' },
    বৃহস্পতিবার: { '১ম': 'বিজ্ঞান', '২য়': 'ইংরেজি', '৩য়': 'সমাজ বিজ্ঞান', '৪র্থ': 'আরবি', '৫ম': 'বাংলা' },
    শুক্রবার: { '১ম': 'হিফজুল কোরান', '২য়': 'শারীরিক শিক্ষা' },
  },
};

export default function Routines() {
  const [selectedClass, setSelectedClass] = useState('class1');
  const [routine, setRoutine] = useState(INITIAL_ROUTINE);
  const [editCell, setEditCell] = useState(null); // { day, period }
  const [editSubject, setEditSubject] = useState('');

  const getSubject = (day, period) =>
    routine[selectedClass]?.[day]?.[period] || '';

  const openEdit = (day, period) => {
    setEditCell({ day, period });
    setEditSubject(getSubject(day, period));
  };

  const saveEdit = () => {
    setRoutine(prev => ({
      ...prev,
      [selectedClass]: {
        ...(prev[selectedClass] || {}),
        [editCell.day]: {
          ...(prev[selectedClass]?.[editCell.day] || {}),
          [editCell.period]: editSubject,
        },
      },
    }));
    setEditCell(null);
  };

  const clearCell = (day, period) => {
    setRoutine(prev => {
      const updated = { ...prev };
      if (updated[selectedClass]?.[day]) {
        const dayData = { ...updated[selectedClass][day] };
        delete dayData[period];
        updated[selectedClass] = { ...updated[selectedClass], [day]: dayData };
      }
      return updated;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdSchedule className="text-green-700" /> ক্লাস রুটিন</h1>
          <p className="page-subtitle">শ্রেণীভিত্তিক সাপ্তাহিক ক্লাস রুটিন</p>
        </div>
      </div>

      {/* Class Select */}
      <div className="card py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-1"><MdClass size={18} className="text-green-700" /> শ্রেণী নির্বাচন:</span>
          {CLASS_OPTIONS.map(c => (
            <button key={c.value} onClick={() => setSelectedClass(c.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedClass === c.value ? 'bg-green-700 text-white border-green-700 shadow' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Routine Grid */}
      <div className="card p-0 overflow-hidden">
        <div className="bg-green-700 text-white px-6 py-4">
          <h3 className="font-bold">{CLASS_NAMES[selectedClass]} — সাপ্তাহিক রুটিন</h3>
          <p className="text-green-200 text-xs mt-0.5">একটি ঘরে ক্লিক করে বিষয় পরিবর্তন করুন</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 w-28">পিরিয়ড</th>
                {DAYS.map(day => (
                  <th key={day} className="px-3 py-3 text-center font-semibold text-gray-700 min-w-[120px]">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period, pIdx) => (
                <tr key={period} className={pIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 font-semibold text-gray-500">{period} পিরিয়ড</td>
                  {DAYS.map(day => {
                    const subject = getSubject(day, period);
                    const colorClass = subject ? SUBJECT_COLOR_MAP[subject] || 'bg-gray-100 text-gray-700 border-gray-200' : '';
                    return (
                      <td key={day} className="px-2 py-2 text-center">
                        {subject ? (
                          <div className={`group relative inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium cursor-pointer hover:shadow-sm transition-all ${colorClass}`}
                            onClick={() => openEdit(day, period)}>
                            {subject}
                            <button onClick={(e) => { e.stopPropagation(); clearCell(day, period); }}
                              className="hidden group-hover:flex absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full items-center justify-center text-xs leading-none">×</button>
                          </div>
                        ) : (
                          <button onClick={() => openEdit(day, period)}
                            className="w-full py-2 text-gray-300 hover:text-green-600 hover:bg-green-50 rounded-lg border border-dashed border-gray-200 hover:border-green-300 transition-all text-xs">
                            <MdAdd size={14} className="mx-auto" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="card py-3">
        <p className="text-xs text-gray-500 font-medium mb-2">বিষয় রঙ চিহ্ন:</p>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map(s => (
            <span key={s} className={`badge text-xs border ${SUBJECT_COLOR_MAP[s]}`}>{s}</span>
          ))}
        </div>
      </div>

      {/* Edit Cell Modal */}
      {editCell && (
        <div className="modal-overlay" onClick={() => setEditCell(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">বিষয় নির্বাচন</h3>
              <button onClick={() => setEditCell(null)}><MdClose size={20} className="text-gray-400" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-3">{editCell.day} — {editCell.period} পিরিয়ড</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {SUBJECTS.map(s => (
                <button key={s} onClick={() => setEditSubject(s)}
                  className={`p-2.5 rounded-xl text-sm font-medium border transition-all text-left ${editSubject === s ? 'bg-green-700 text-white border-green-700' : `${SUBJECT_COLOR_MAP[s]} hover:opacity-80`}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditCell(null)} className="btn-secondary flex-1 justify-center">বাতিল</button>
              <button onClick={saveEdit} className="btn-primary flex-1 justify-center">সংরক্ষণ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
