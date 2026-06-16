import React, { useState } from 'react';
import { MdClass, MdAdd, MdEdit, MdDelete, MdClose, MdBook } from 'react-icons/md';
import { CLASS_NAMES, CLASS_OPTIONS } from '../../utils/helpers';
import { SAMPLE_STUDENTS, SAMPLE_TEACHERS } from '../../utils/sampleData';

const SUBJECTS_INITIAL = [
  { id: 'SUB001', name: 'বাংলা',          teacher: 'TCH001', forClasses: ['class1','class2','class3','class4','class5'] },
  { id: 'SUB002', name: 'ইংরেজি',         teacher: 'TCH003', forClasses: ['class1','class2','class3','class4','class5'] },
  { id: 'SUB003', name: 'গণিত',           teacher: 'TCH002', forClasses: ['class1','class2','class3','class4','class5'] },
  { id: 'SUB004', name: 'আরবি',           teacher: 'TCH004', forClasses: ['play','nursery','class1','class2','class3','class4','class5'] },
  { id: 'SUB005', name: 'ইসলাম শিক্ষা',  teacher: 'TCH001', forClasses: ['class1','class2','class3','class4','class5'] },
  { id: 'SUB006', name: 'বিজ্ঞান',        teacher: 'TCH002', forClasses: ['class3','class4','class5'] },
  { id: 'SUB007', name: 'সমাজ বিজ্ঞান',  teacher: 'TCH003', forClasses: ['class3','class4','class5'] },
  { id: 'SUB008', name: 'হিফজুল কোরান',  teacher: 'TCH004', forClasses: ['play','nursery','class1','class2'] },
];

const EMPTY_SUBJ = { name: '', teacher: '', forClasses: [] };

export default function Classes() {
  const [activeTab, setActiveTab] = useState('classes');
  const [subjects, setSubjects] = useState(SUBJECTS_INITIAL);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(EMPTY_SUBJ);

  const openAdd = () => { setForm(EMPTY_SUBJ); setEditData(null); setShowModal(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditData(s); setShowModal(true); };
  const closeModal = () => setShowModal(false);
  const f = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const toggleClass = (cls) => {
    setForm(prev => ({
      ...prev,
      forClasses: prev.forClasses.includes(cls)
        ? prev.forClasses.filter(c => c !== cls)
        : [...prev.forClasses, cls],
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert('বিষয়ের নাম প্রয়োজন');
    if (editData) {
      setSubjects(prev => prev.map(s => s.id === editData.id ? { ...s, ...form } : s));
    } else {
      const newId = `SUB${String(subjects.length + 1).padStart(3, '0')}`;
      setSubjects(prev => [...prev, { ...form, id: newId }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('এই বিষয়টি মুছে ফেলবেন?')) setSubjects(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdClass className="text-green-700" /> শ্রেণী ও বিষয় ব্যবস্থাপনা</h1>
          <p className="page-subtitle">শ্রেণী তথ্য, ছাত্র সংখ্যা ও বিষয়সমূহ</p>
        </div>
        {activeTab === 'subjects' && <button onClick={openAdd} className="btn-primary"><MdAdd size={20} /> নতুন বিষয়</button>}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {[['classes', 'শ্রেণী সমূহ'], ['subjects', 'বিষয় সমূহ']].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow text-green-700' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CLASS_OPTIONS.map(cls => {
            const count = SAMPLE_STUDENTS.filter(s => s.class === cls.value).length;
            const teacher = SAMPLE_TEACHERS.find(t => t.assignedClass === cls.value);
            const boys = SAMPLE_STUDENTS.filter(s => s.class === cls.value && s.gender === 'male').length;
            const girls = SAMPLE_STUDENTS.filter(s => s.class === cls.value && s.gender === 'female').length;
            const classSubjects = SUBJECTS_INITIAL.filter(s => s.forClasses.includes(cls.value));
            return (
              <div key={cls.value} className="card hover:-translate-y-1 transition-transform duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {cls.label.split(' ').pop()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{cls.label}</h3>
                    <p className="text-xs text-gray-400">{teacher?.name || 'শিক্ষক নির্ধারিত নয়'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-gray-800">{count}</p>
                    <p className="text-xs text-gray-400">মোট</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-blue-700">{boys}</p>
                    <p className="text-xs text-gray-400">ছেলে</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-2">
                    <p className="text-lg font-bold text-pink-700">{girls}</p>
                    <p className="text-xs text-gray-400">মেয়ে</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1.5">বিষয়সমূহ ({classSubjects.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {classSubjects.slice(0, 4).map(s => <span key={s.id} className="badge badge-info text-xs">{s.name}</span>)}
                    {classSubjects.length > 4 && <span className="badge badge-gray text-xs">+{classSubjects.length - 4}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>বিষয়ের নাম</th><th>শিক্ষক</th><th>প্রযোজ্য শ্রেণী</th><th>অ্যাকশন</th></tr>
            </thead>
            <tbody>
              {subjects.length === 0 && <tr><td colSpan={4} className="text-center text-gray-400 py-8">কোনো বিষয় পাওয়া যায়নি</td></tr>}
              {subjects.map(s => {
                const teacher = SAMPLE_TEACHERS.find(t => t.id === s.teacher);
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"><MdBook size={16} className="text-green-700" /></div>
                        <span className="font-semibold text-gray-800">{s.name}</span>
                      </div>
                    </td>
                    <td>{teacher?.name || '—'}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {s.forClasses.map(c => <span key={c} className="badge badge-info text-xs">{CLASS_NAMES[c]}</span>)}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(s)} className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg"><MdEdit size={16} /></button>
                        <button onClick={() => handleDelete(s.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><MdDelete size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Subject Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">{editData ? 'বিষয় সম্পাদনা' : 'নতুন বিষয় যোগ'}</h2>
              <button onClick={closeModal}><MdClose size={22} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="form-group"><label className="form-label">বিষয়ের নাম *</label><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} /></div>
              <div className="form-group">
                <label className="form-label">শিক্ষক</label>
                <select className="form-input" value={form.teacher} onChange={e => f('teacher', e.target.value)}>
                  <option value="">— শিক্ষক বেছে নিন —</option>
                  {SAMPLE_TEACHERS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">প্রযোজ্য শ্রেণী</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {CLASS_OPTIONS.map(c => (
                    <button key={c.value} type="button" onClick={() => toggleClass(c.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${form.forClasses.includes(c.value) ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={closeModal} className="btn-secondary">বাতিল</button>
              <button onClick={handleSave} className="btn-primary">{editData ? 'আপডেট' : 'সংরক্ষণ'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
