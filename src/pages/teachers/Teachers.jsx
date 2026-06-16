import React, { useState, useMemo } from 'react';
import {
  MdPeople, MdAdd, MdSearch, MdEdit, MdDelete, MdClose,
  MdPhone, MdEmail, MdVisibility, MdWork
} from 'react-icons/md';
import { SAMPLE_TEACHERS } from '../../utils/sampleData';
import { CLASS_NAMES, CLASS_OPTIONS, formatTaka } from '../../utils/helpers';

const DESIGNATIONS = [
  'প্রধান শিক্ষক', 'সহকারী শিক্ষক', 'সহকারী শিক্ষিকা',
  'ইসলামী শিক্ষক', 'আরবি শিক্ষক', 'অফিস সহায়ক',
];

const EMPTY_FORM = {
  name: '', designation: 'সহকারী শিক্ষক', phone: '', email: '',
  address: '', joiningDate: '', salary: '', assignedClass: 'class1',
  subjects: '', status: 'active',
};

function Avatar({ name }) {
  return (
    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
      {name?.charAt(0) || '?'}
    </div>
  );
}

export default function Teachers() {
  const [teachers, setTeachers] = useState(SAMPLE_TEACHERS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [viewTeacher, setViewTeacher] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = useMemo(() => teachers.filter(t => {
    const q = search.toLowerCase();
    return !q || t.name?.includes(q) || t.phone?.includes(q) || t.designation?.includes(q);
  }), [teachers, search]);

  const openAdd = () => { setForm(EMPTY_FORM); setEditData(null); setShowModal(true); };
  const openEdit = (t) => {
    setForm({ ...t, subjects: Array.isArray(t.subjects) ? t.subjects.join(', ') : t.subjects });
    setEditData(t); setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const f = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleSave = () => {
    if (!form.name.trim()) return alert('নাম প্রয়োজন');
    const data = { ...form, subjects: form.subjects.split(',').map(s => s.trim()).filter(Boolean) };
    if (editData) {
      setTeachers(prev => prev.map(t => t.id === editData.id ? { ...t, ...data } : t));
    } else {
      const newId = `TCH${String(teachers.length + 1).padStart(3, '0')}`;
      setTeachers(prev => [...prev, { ...data, id: newId, photo: null }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => { setTeachers(prev => prev.filter(t => t.id !== id)); setDeleteConfirm(null); };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdPeople className="text-green-700" /> শিক্ষকমণ্ডলী</h1>
          <p className="page-subtitle">মোট {teachers.length} জন শিক্ষক নিবন্ধিত</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><MdAdd size={20} /> নতুন শিক্ষক যোগ</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'মোট শিক্ষক', val: teachers.length, bg: 'bg-green-50 text-green-700' },
          { label: 'সক্রিয়', val: teachers.filter(t => t.status === 'active').length, bg: 'bg-blue-50 text-blue-700' },
          { label: 'পুরুষ', val: teachers.filter(t => !t.name?.includes('মোছাঃ')).length, bg: 'bg-purple-50 text-purple-700' },
          { label: 'মহিলা', val: teachers.filter(t => t.name?.includes('মোছাঃ')).length, bg: 'bg-pink-50 text-pink-700' },
        ].map(s => (
          <div key={s.label} className={`card py-4 text-center ${s.bg}`}>
            <p className="text-2xl font-bold">{s.val}</p>
            <p className="text-sm mt-0.5 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="card py-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input className="form-input pl-9" placeholder="নাম, ফোন বা পদবি দিয়ে খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && <div className="col-span-3 text-center text-gray-400 py-12">কোনো শিক্ষক পাওয়া যায়নি</div>}
        {filtered.map(t => (
          <div key={t.id} className="card hover:-translate-y-1 transition-transform duration-200">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {t.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 truncate">{t.name}</h3>
                <p className="text-green-700 text-sm font-medium">{t.designation}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <MdWork size={12} /> {CLASS_NAMES[t.assignedClass] || '—'}
                </div>
              </div>
              <span className={`badge ${t.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                {t.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              </span>
            </div>

            <div className="mt-4 space-y-1.5 text-sm text-gray-600">
              <div className="flex items-center gap-2"><MdPhone size={14} className="text-gray-400" /> {t.phone}</div>
              <div className="flex items-center gap-2"><MdEmail size={14} className="text-gray-400" /> {t.email || '—'}</div>
              {t.subjects?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {t.subjects.map(s => <span key={s} className="badge badge-info text-xs">{s}</span>)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-700">{formatTaka(t.salary)}/মাস</span>
              <div className="flex gap-1 ml-auto">
                <button onClick={() => setViewTeacher(t)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><MdVisibility size={16} /></button>
                <button onClick={() => openEdit(t)} className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg"><MdEdit size={16} /></button>
                <button onClick={() => setDeleteConfirm(t)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><MdDelete size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">{editData ? 'শিক্ষকের তথ্য সম্পাদনা' : 'নতুন শিক্ষক যোগ করুন'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><MdClose size={22} /></button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group sm:col-span-2"><label className="form-label">পূর্ণ নাম *</label><input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} placeholder="মোঃ আব্দুর রহমান" /></div>
              <div className="form-group"><label className="form-label">পদবি</label>
                <select className="form-input" value={form.designation} onChange={e => f('designation', e.target.value)}>
                  {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">নির্ধারিত শ্রেণী</label>
                <select className="form-input" value={form.assignedClass} onChange={e => f('assignedClass', e.target.value)}>
                  {CLASS_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">ফোন নম্বর</label><input className="form-input" value={form.phone} onChange={e => f('phone', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">ইমেইল</label><input type="email" className="form-input" value={form.email} onChange={e => f('email', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">বেতন (৳)</label><input type="number" className="form-input" value={form.salary} onChange={e => f('salary', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">যোগদানের তারিখ</label><input type="date" className="form-input" value={form.joiningDate} onChange={e => f('joiningDate', e.target.value)} /></div>
              <div className="form-group sm:col-span-2"><label className="form-label">বিষয়সমূহ (কমা দিয়ে আলাদা করুন)</label><input className="form-input" value={form.subjects} onChange={e => f('subjects', e.target.value)} placeholder="বাংলা, গণিত, ইসলাম শিক্ষা" /></div>
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
      {viewTeacher && (
        <div className="modal-overlay" onClick={() => setViewTeacher(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">শিক্ষকের বিস্তারিত</h2>
              <button onClick={() => setViewTeacher(null)}><MdClose size={22} className="text-gray-400" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 rounded-xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-700 text-white flex items-center justify-center text-2xl font-bold">{viewTeacher.name?.charAt(0)}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{viewTeacher.name}</h3>
                  <p className="text-green-700 font-medium">{viewTeacher.designation}</p>
                  <span className={`badge mt-1 ${viewTeacher.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{viewTeacher.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[['ফোন', viewTeacher.phone], ['ইমেইল', viewTeacher.email], ['বেতন', formatTaka(viewTeacher.salary) + '/মাস'], ['শ্রেণী', CLASS_NAMES[viewTeacher.assignedClass]], ['যোগদান', viewTeacher.joiningDate], ['ঠিকানা', viewTeacher.address]].map(([l, v]) => (
                  <div key={l} className="bg-gray-50 rounded-lg p-3"><p className="text-gray-400 text-xs mb-0.5">{l}</p><p className="font-semibold text-gray-800">{v || '—'}</p></div>
                ))}
                <div className="col-span-2 bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">বিষয়সমূহ</p>
                  <div className="flex flex-wrap gap-1">{(viewTeacher.subjects || []).map(s => <span key={s} className="badge badge-info">{s}</span>)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-2">নিশ্চিত করুন</h3>
            <p className="text-gray-500 mb-6"><strong>{deleteConfirm.name}</strong>-এর তথ্য মুছে ফেলবেন?</p>
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
