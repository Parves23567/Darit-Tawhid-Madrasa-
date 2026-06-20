import React, { useState, useMemo, useEffect } from 'react';
import { MdSupervisorAccount, MdSearch, MdClose, MdPhone, MdVisibility } from 'react-icons/md';
import { CLASS_NAMES } from '../../utils/helpers';
import { subscribeToCollection } from '../../firebase/firestore';

export default function Guardians() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewGuardian, setViewGuardian] = useState(null);

  // Firestore থেকে students নিয়ে guardians বানাও
  useEffect(() => {
    const unsubscribe = subscribeToCollection('students', (data) => {
      setStudents(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Students থেকে guardians তৈরি (phone number দিয়ে group করা)
  const guardians = useMemo(() => {
    const map = {};
    students.forEach(s => {
      const key = s.guardianPhone || s.emergencyPhone || s.id;
      if (!map[key]) {
        map[key] = {
          id: `GRD_${key}`,
          fatherName: s.fatherName,
          motherName: s.motherName,
          phone: s.guardianPhone,
          emergencyPhone: s.emergencyPhone,
          address: s.address,
          children: [],
        };
      }
      map[key].children.push(s);
    });
    return Object.values(map);
  }, [students]);

  const filtered = useMemo(() => guardians.filter(g => {
    const q = search.toLowerCase();
    return !q || g.fatherName?.includes(q) || g.motherName?.includes(q) || g.phone?.includes(q);
  }), [guardians, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdSupervisorAccount className="text-green-700" /> অভিভাবক তালিকা</h1>
          <p className="page-subtitle">মোট {guardians.length} জন অভিভাবক নিবন্ধিত</p>
        </div>
      </div>

      {/* Search */}
      <div className="card py-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input className="form-input pl-9" placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Empty State */}
      {guardians.length === 0 && (
        <div className="card text-center py-16">
          <MdSupervisorAccount size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-lg">এখনো কোনো ছাত্র যোগ করা হয়নি</p>
          <p className="text-gray-400 text-sm mt-1">ছাত্র যোগ করলে অভিভাবক তথ্য এখানে দেখাবে</p>
        </div>
      )}

      {/* Table */}
      {guardians.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>পিতার নাম</th>
                <th>মাতার নাম</th>
                <th>ফোন</th>
                <th>সন্তান</th>
                <th>ঠিকানা</th>
                <th>বিস্তারিত</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={6} className="text-center text-gray-400 py-10">কোনো অভিভাবক পাওয়া যায়নি</td></tr>}
              {filtered.map(g => (
                <tr key={g.id}>
                  <td className="font-semibold text-gray-800">{g.fatherName || '—'}</td>
                  <td className="text-gray-600">{g.motherName || '—'}</td>
                  <td>
                    <span className="flex items-center gap-1 text-sm"><MdPhone size={14} className="text-gray-400" />{g.phone || '—'}</span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {g.children.map(c => (
                        <span key={c.id} className="badge badge-info text-xs">{c.nameBn}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-gray-500 text-sm max-w-[150px] truncate">{g.address || '—'}</td>
                  <td>
                    <button onClick={() => setViewGuardian(g)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><MdVisibility size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Modal */}
      {viewGuardian && (
        <div className="modal-overlay" onClick={() => setViewGuardian(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">অভিভাবকের তথ্য</h2>
              <button onClick={() => setViewGuardian(null)}><MdClose size={22} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-14 h-14 bg-green-700 rounded-2xl text-white flex items-center justify-center text-2xl font-bold">{viewGuardian.fatherName?.charAt(0) || '?'}</div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{viewGuardian.fatherName || '—'}</p>
                  <p className="text-gray-500 text-sm">{viewGuardian.motherName || '—'}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[['ফোন', viewGuardian.phone], ['জরুরি ফোন', viewGuardian.emergencyPhone], ['ঠিকানা', viewGuardian.address]].map(([l, v]) => (
                  <div key={l} className={`bg-gray-50 rounded-lg p-3 ${l === 'ঠিকানা' ? 'col-span-2' : ''}`}>
                    <p className="text-gray-400 text-xs mb-0.5">{l}</p>
                    <p className="font-semibold text-gray-800">{v || '—'}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">সন্তানের তালিকা ({viewGuardian.children.length} জন)</p>
                <div className="space-y-2">
                  {viewGuardian.children.map(c => (
                    <div key={c.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${c.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>{c.nameBn?.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-gray-800">{c.nameBn}</p>
                        <p className="text-xs text-gray-400">{CLASS_NAMES[c.class]} | রোল {c.roll}</p>
                      </div>
                      <span className={`badge ml-auto ${c.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{c.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
