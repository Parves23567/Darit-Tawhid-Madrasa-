import React, { useState, useMemo } from 'react';
import {
  MdNotifications, MdAdd, MdEdit, MdDelete, MdClose,
  MdPushPin, MdSearch, MdCalendarToday
} from 'react-icons/md';
import { SAMPLE_NOTICES } from '../../utils/sampleData';

const EMPTY_FORM = { title: '', description: '', date: new Date().toISOString().split('T')[0], important: false };

const CATEGORIES = ['সাধারণ', 'পরীক্ষা', 'বেতন', 'ছুটি', 'অনুষ্ঠান', 'জরুরি'];

export default function Notices() {
  const [notices, setNotices] = useState(SAMPLE_NOTICES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [viewNotice, setViewNotice] = useState(null);

  const filtered = useMemo(() => notices.filter(n =>
    !search || n.title?.includes(search) || n.description?.includes(search)
  ), [notices, search]);

  const openAdd = () => { setForm(EMPTY_FORM); setEditData(null); setShowModal(true); };
  const openEdit = (n) => { setForm({ ...n }); setEditData(n); setShowModal(true); };
  const closeModal = () => setShowModal(false);
  const f = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleSave = () => {
    if (!form.title.trim()) return alert('শিরোনাম প্রয়োজন');
    if (editData) {
      setNotices(prev => prev.map(n => n.id === editData.id ? { ...n, ...form } : n));
    } else {
      const newId = `NOT${String(notices.length + 1).padStart(3, '0')}`;
      setNotices(prev => [{ ...form, id: newId, createdAt: form.date }, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('এই নোটিশটি মুছে ফেলবেন?')) setNotices(prev => prev.filter(n => n.id !== id));
  };

  const toggleImportant = (id) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, important: !n.important } : n));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdNotifications className="text-green-700" /> নোটিশ বোর্ড</h1>
          <p className="page-subtitle">মোট {notices.length} টি নোটিশ প্রকাশিত</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><MdAdd size={20} /> নতুন নোটিশ</button>
      </div>

      {/* Search */}
      <div className="card py-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input className="form-input pl-9" placeholder="নোটিশ খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Notice Cards */}
      {filtered.length === 0 && <div className="text-center text-gray-400 py-16">কোনো নোটিশ পাওয়া যায়নি</div>}
      <div className="space-y-4">
        {filtered.map(notice => (
          <div key={notice.id}
            className={`card border-l-4 hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer ${notice.important ? 'border-red-500' : 'border-green-500'}`}
            onClick={() => setViewNotice(notice)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notice.important ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                <MdNotifications size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-800">{notice.title}</h3>
                    {notice.important && (
                      <span className="badge badge-danger flex items-center gap-0.5"><MdPushPin size={11} /> জরুরি</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
                    <button onClick={() => toggleImportant(notice.id)} className={`p-1.5 rounded-lg ${notice.important ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-50'}`} title="জরুরি হিসেবে চিহ্নিত করুন"><MdPushPin size={16} /></button>
                    <button onClick={() => openEdit(notice)} className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg"><MdEdit size={16} /></button>
                    <button onClick={() => handleDelete(notice.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><MdDelete size={16} /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notice.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <MdCalendarToday size={12} />
                  {notice.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">{editData ? 'নোটিশ সম্পাদনা' : 'নতুন নোটিশ তৈরি'}</h2>
              <button onClick={closeModal}><MdClose size={22} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="form-group"><label className="form-label">শিরোনাম *</label><input className="form-input" value={form.title} onChange={e => f('title', e.target.value)} placeholder="নোটিশের শিরোনাম লিখুন" /></div>
              <div className="form-group"><label className="form-label">বিস্তারিত</label><textarea className="form-input" rows={5} value={form.description} onChange={e => f('description', e.target.value)} placeholder="নোটিশের বিস্তারিত বিবরণ..." /></div>
              <div className="form-group"><label className="form-label">তারিখ</label><input type="date" className="form-input" value={form.date} onChange={e => f('date', e.target.value)} /></div>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-red-50 rounded-xl border border-red-100">
                <input type="checkbox" checked={form.important} onChange={e => f('important', e.target.checked)} className="w-4 h-4 accent-red-500" />
                <span className="text-sm font-medium text-red-700 flex items-center gap-1"><MdPushPin size={14} /> জরুরি নোটিশ হিসেবে চিহ্নিত করুন</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={closeModal} className="btn-secondary">বাতিল</button>
              <button onClick={handleSave} className="btn-primary">{editData ? 'আপডেট' : 'প্রকাশ করুন'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewNotice && (
        <div className="modal-overlay" onClick={() => setViewNotice(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className={`p-6 ${viewNotice.important ? 'bg-red-50' : 'bg-green-50'} rounded-t-2xl`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {viewNotice.important && <span className="badge badge-danger"><MdPushPin size={11} /> জরুরি</span>}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{viewNotice.title}</h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MdCalendarToday size={13} /> {viewNotice.date}</p>
                </div>
                <button onClick={() => setViewNotice(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0"><MdClose size={22} /></button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{viewNotice.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
