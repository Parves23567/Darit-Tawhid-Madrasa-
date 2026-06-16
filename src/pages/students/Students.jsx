import React, { useState, useMemo } from 'react';
import {
  MdSchool, MdAdd, MdSearch, MdEdit, MdDelete, MdClose,
  MdPerson, MdPhone, MdFilterList, MdDownload, MdVisibility
} from 'react-icons/md';
import { SAMPLE_STUDENTS } from '../../utils/sampleData';
import { CLASS_NAMES, CLASS_OPTIONS, BLOOD_GROUPS, GENDER_OPTIONS, formatDate } from '../../utils/helpers';

const EMPTY_FORM = {
  nameBn: '', nameEn: '', class: 'class1', roll: '', gender: 'male',
  dob: '', bloodGroup: 'B+', admissionDate: '', address: '',
  fatherName: '', motherName: '', guardianPhone: '', emergencyPhone: '',
  status: 'active',
};

function Badge({ status }) {
  const map = {
    active: 'badge badge-success',
    inactive: 'badge badge-danger',
  };
  return <span className={map[status] || 'badge badge-gray'}>{status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span>;
}

function Avatar({ name, gender }) {
  const bg = gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700';
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${bg}`}>
      {name?.charAt(0) || '?'}
    </div>
  );
}

export default function Students() {
  const [students, setStudents] = useState(SAMPLE_STUDENTS);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [viewStudent, setViewStudent] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = useMemo(() => students.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.nameBn?.includes(q) || s.nameEn?.toLowerCase().includes(q)
      || s.studentId?.toLowerCase().includes(q) || s.guardianPhone?.includes(q);
    const matchClass = !filterClass || s.class === filterClass;
    const matchStatus = !filterStatus || s.status === filterStatus;
    return matchSearch && matchClass && matchStatus;
  }), [students, search, filterClass, filterStatus]);

  const openAdd = () => { setForm(EMPTY_FORM); setEditData(null); setShowModal(true); };
  const openEdit = (s) => { setForm({ ...s }); setEditData(s); setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const handleSave = () => {
    if (!form.nameBn.trim()) return alert('নাম প্রয়োজন');
    if (editData) {
      setStudents(prev => prev.map(s => s.id === editData.id ? { ...s, ...form } : s));
    } else {
      const newId = `ST${String(students.length + 1).padStart(3, '0')}`;
      setStudents(prev => [...prev, { ...form, id: newId, studentId: `DT2024${String(students.length + 1).padStart(4, '0')}`, photo: null }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setDeleteConfirm(null);
  };

  const f = (field, val) => setForm(p => ({ ...p, [field]: val }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdSchool className="text-green-700" /> ছাত্র/ছাত্রী তালিকা</h1>
          <p className="page-subtitle">মোট {students.length} জন ছাত্র/ছাত্রী নিবন্ধিত</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <MdAdd size={20} /> নতুন ছাত্র যোগ
        </button>
      </div>

      {/* Filters */}
      <div className="card py-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input className="form-input pl-9" placeholder="নাম, আইডি বা ফোন দিয়ে খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-input w-auto" value={filterClass} onChange={e => setFilterClass(e.target.value)}>
            <option value="">সব শ্রেণী</option>
            {CLASS_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select className="form-input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">সব অবস্থা</option>
            <option value="active">সক্রিয়</option>
            <option value="inactive">নিষ্ক্রিয়</option>
          </select>
          <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
            <MdFilterList /> {filtered.length} টি ফলাফল
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ছাত্র</th>
              <th>আইডি</th>
              <th>শ্রেণী / রোল</th>
              <th>লিঙ্গ</th>
              <th>অভিভাবকের ফোন</th>
              <th>অবস্থা</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center text-gray-400 py-10">কোনো ছাত্র পাওয়া যায়নি</td></tr>
            )}
            {filtered.map(s => (
              <tr key={s.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar name={s.nameBn} gender={s.gender} />
                    <div>
                      <p className="font-semibold text-gray-800">{s.nameBn}</p>
                      <p className="text-xs text-gray-400">{s.nameEn}</p>
                    </div>
                  </div>
                </td>
                <td><span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{s.studentId}</span></td>
                <td>{CLASS_NAMES[s.class]} / রোল {s.roll}</td>
                <td>{s.gender === 'male' ? 'ছেলে' : 'মেয়ে'}</td>
                <td><span className="flex items-center gap-1"><MdPhone size={14} className="text-gray-400" />{s.guardianPhone}</span></td>
                <td><Badge status={s.status} /></td>
                <td>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewStudent(s)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="দেখুন"><MdVisibility size={16} /></button>
                    <button onClick={() => openEdit(s)} className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg" title="সম্পাদনা"><MdEdit size={16} /></button>
                    <button onClick={() => setDeleteConfirm(s)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg" title="মুছুন"><MdDelete size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">{editData ? 'ছাত্রের তথ্য সম্পাদনা' : 'নতুন ছাত্র যোগ করুন'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1"><MdClose size={22} /></button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group"><label className="form-label">বাংলা নাম *</label><input className="form-input" value={form.nameBn} onChange={e => f('nameBn', e.target.value)} placeholder="মোঃ আবদুল্লাহ" /></div>
              <div className="form-group"><label className="form-label">ইংরেজি নাম</label><input className="form-input" value={form.nameEn} onChange={e => f('nameEn', e.target.value)} placeholder="Md. Abdullah" /></div>
              <div className="form-group"><label className="form-label">শ্রেণী *</label>
                <select className="form-input" value={form.class} onChange={e => f('class', e.target.value)}>
                  {CLASS_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">রোল নম্বর</label><input className="form-input" value={form.roll} onChange={e => f('roll', e.target.value)} placeholder="১" /></div>
              <div className="form-group"><label className="form-label">লিঙ্গ</label>
                <select className="form-input" value={form.gender} onChange={e => f('gender', e.target.value)}>
                  {GENDER_OPTIONS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">জন্ম তারিখ</label><input type="date" className="form-input" value={form.dob} onChange={e => f('dob', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">রক্তের গ্রুপ</label>
                <select className="form-input" value={form.bloodGroup} onChange={e => f('bloodGroup', e.target.value)}>
                  {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">ভর্তির তারিখ</label><input type="date" className="form-input" value={form.admissionDate} onChange={e => f('admissionDate', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">পিতার নাম</label><input className="form-input" value={form.fatherName} onChange={e => f('fatherName', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">মাতার নাম</label><input className="form-input" value={form.motherName} onChange={e => f('motherName', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">অভিভাবকের ফোন</label><input className="form-input" value={form.guardianPhone} onChange={e => f('guardianPhone', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">জরুরি ফোন</label><input className="form-input" value={form.emergencyPhone} onChange={e => f('emergencyPhone', e.target.value)} /></div>
              <div className="form-group sm:col-span-2"><label className="form-label">ঠিকানা</label><textarea className="form-input" rows={2} value={form.address} onChange={e => f('address', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">অবস্থা</label>
                <select className="form-input" value={form.status} onChange={e => f('status', e.target.value)}>
                  <option value="active">সক্রিয়</option>
                  <option value="inactive">নিষ্ক্রিয়</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={closeModal} className="btn-secondary">বাতিল</button>
              <button onClick={handleSave} className="btn-primary">{editData ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewStudent && (
        <div className="modal-overlay" onClick={() => setViewStudent(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">ছাত্রের বিস্তারিত তথ্য</h2>
              <button onClick={() => setViewStudent(null)} className="text-gray-400 hover:text-gray-600"><MdClose size={22} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 rounded-xl">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${viewStudent.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                  {viewStudent.nameBn?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{viewStudent.nameBn}</h3>
                  <p className="text-gray-500 text-sm">{viewStudent.nameEn}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge status={viewStudent.status} />
                    <span className="badge badge-info">{CLASS_NAMES[viewStudent.class]}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  ['ছাত্র আইডি', viewStudent.studentId],
                  ['ভর্তি নম্বর', viewStudent.admissionNo],
                  ['রোল নম্বর', viewStudent.roll],
                  ['লিঙ্গ', viewStudent.gender === 'male' ? 'ছেলে' : 'মেয়ে'],
                  ['জন্ম তারিখ', viewStudent.dob],
                  ['রক্তের গ্রুপ', viewStudent.bloodGroup],
                  ['পিতার নাম', viewStudent.fatherName],
                  ['মাতার নাম', viewStudent.motherName],
                  ['অভিভাবকের ফোন', viewStudent.guardianPhone],
                  ['জরুরি ফোন', viewStudent.emergencyPhone],
                ].map(([label, val]) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                    <p className="font-semibold text-gray-800">{val || '—'}</p>
                  </div>
                ))}
                <div className="col-span-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-0.5">ঠিকানা</p>
                  <p className="font-semibold text-gray-800">{viewStudent.address || '—'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-2">নিশ্চিত করুন</h3>
            <p className="text-gray-500 mb-6">আপনি কি <strong>{deleteConfirm.nameBn}</strong>-এর তথ্য মুছে ফেলতে চান?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary btn-sm">বাতিল</button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="btn-danger btn-sm">মুছুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
