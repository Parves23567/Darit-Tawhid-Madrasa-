import React, { useState, useMemo } from 'react';
import {
  MdPayment, MdAdd, MdSearch, MdEdit, MdClose, MdCheckCircle,
  MdWarning, MdFilterList, MdReceipt
} from 'react-icons/md';
import { SAMPLE_FEES, SAMPLE_STUDENTS } from '../../utils/sampleData';
import {
  CLASS_NAMES, CLASS_OPTIONS, PAYMENT_METHODS, FEE_TYPES,
  MONTHS_BN, formatTaka
} from '../../utils/helpers';

const EMPTY_FORM = {
  studentId: '', feeType: 'monthly', amount: '', month: MONTHS_BN[new Date().getMonth()],
  year: new Date().getFullYear().toString(), paymentMethod: 'cash', status: 'paid', date: new Date().toISOString().split('T')[0], note: '',
};

export default function Fees() {
  const [fees, setFees] = useState(SAMPLE_FEES);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [receipt, setReceipt] = useState(null);

  const filtered = useMemo(() => fees.filter(f => {
    const q = search.toLowerCase();
    const matchSearch = !q || f.studentName?.includes(q) || f.studentId?.includes(q);
    const matchStatus = !filterStatus || f.status === filterStatus;
    const matchMonth = !filterMonth || f.month === filterMonth;
    return matchSearch && matchStatus && matchMonth;
  }), [fees, search, filterStatus, filterMonth]);

  const totalPaid = filtered.filter(f => f.status === 'paid').reduce((s, f) => s + Number(f.amount), 0);
  const totalDue = filtered.filter(f => f.status === 'due').reduce((s, f) => s + Number(f.amount), 0);

  const openAdd = () => { setForm(EMPTY_FORM); setEditData(null); setShowModal(true); };
  const openEdit = (fee) => { setForm({ ...fee }); setEditData(fee); setShowModal(true); };
  const closeModal = () => setShowModal(false);
  const ff = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const handleSave = () => {
    const student = SAMPLE_STUDENTS.find(s => s.id === form.studentId);
    if (!student) return alert('ছাত্র নির্বাচন করুন');
    if (!form.amount) return alert('পরিমাণ লিখুন');
    const data = { ...form, studentName: student.nameBn, class: student.class, date: form.status === 'paid' ? form.date : null };
    if (editData) {
      setFees(prev => prev.map(f => f.id === editData.id ? { ...f, ...data } : f));
    } else {
      const newId = `FEE${String(fees.length + 1).padStart(3, '0')}`;
      setFees(prev => [...prev, { ...data, id: newId }]);
    }
    setShowModal(false);
  };

  const markPaid = (fee) => {
    setFees(prev => prev.map(f => f.id === fee.id ? { ...f, status: 'paid', paymentMethod: 'cash', date: new Date().toISOString().split('T')[0] } : f));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdPayment className="text-green-700" /> বেতন ও ফি ব্যবস্থাপনা</h1>
          <p className="page-subtitle">মাসিক বেতন সংগ্রহ ও বকেয়া ব্যবস্থাপনা</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><MdAdd size={20} /> নতুন লেনদেন</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><MdCheckCircle className="text-green-700 text-2xl" /></div>
            <div><p className="text-sm text-gray-500">মোট আদায়</p><p className="text-2xl font-bold text-green-700">{formatTaka(totalPaid)}</p></div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-red-50 to-rose-50 border border-red-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"><MdWarning className="text-red-600 text-2xl" /></div>
            <div><p className="text-sm text-gray-500">মোট বকেয়া</p><p className="text-2xl font-bold text-red-600">{formatTaka(totalDue)}</p></div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><MdPayment className="text-blue-700 text-2xl" /></div>
            <div><p className="text-sm text-gray-500">মোট লেনদেন</p><p className="text-2xl font-bold text-blue-700">{filtered.length} টি</p></div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card py-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input className="form-input pl-9" placeholder="ছাত্রের নাম বা আইডি..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="form-input w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">সব অবস্থা</option>
            <option value="paid">পরিশোধিত</option>
            <option value="due">বকেয়া</option>
          </select>
          <select className="form-input w-auto" value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
            <option value="">সব মাস</option>
            {MONTHS_BN.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ছাত্রের নাম</th>
              <th>শ্রেণী</th>
              <th>ফি ধরন</th>
              <th>মাস</th>
              <th>পরিমাণ</th>
              <th>পদ্ধতি</th>
              <th>অবস্থা</th>
              <th>তারিখ</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={9} className="text-center text-gray-400 py-10">কোনো রেকর্ড পাওয়া যায়নি</td></tr>}
            {filtered.map(fee => (
              <tr key={fee.id}>
                <td className="font-medium text-gray-800">{fee.studentName}</td>
                <td>{CLASS_NAMES[fee.class] || fee.class}</td>
                <td>{FEE_TYPES.find(f => f.value === fee.feeType)?.label || fee.feeType}</td>
                <td>{fee.month} {fee.year}</td>
                <td className="font-semibold text-gray-800">{formatTaka(fee.amount)}</td>
                <td>{fee.paymentMethod ? PAYMENT_METHODS.find(m => m.value === fee.paymentMethod)?.label : '—'}</td>
                <td>
                  <span className={`badge ${fee.status === 'paid' ? 'badge-success' : 'badge-danger'}`}>
                    {fee.status === 'paid' ? 'পরিশোধিত' : 'বকেয়া'}
                  </span>
                </td>
                <td className="text-gray-500 text-xs">{fee.date || '—'}</td>
                <td>
                  <div className="flex gap-1">
                    {fee.status === 'paid' && (
                      <button onClick={() => setReceipt(fee)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="রসিদ"><MdReceipt size={16} /></button>
                    )}
                    {fee.status === 'due' && (
                      <button onClick={() => markPaid(fee)} className="px-2 py-1 bg-green-700 text-white text-xs rounded-lg hover:bg-green-800">পরিশোধ</button>
                    )}
                    <button onClick={() => openEdit(fee)} className="p-1.5 text-green-700 hover:bg-green-50 rounded-lg"><MdEdit size={16} /></button>
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
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-800">{editData ? 'লেনদেন সম্পাদনা' : 'নতুন লেনদেন যোগ'}</h2>
              <button onClick={closeModal}><MdClose size={22} className="text-gray-400" /></button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-group sm:col-span-2">
                <label className="form-label">ছাত্র নির্বাচন *</label>
                <select className="form-input" value={form.studentId} onChange={e => ff('studentId', e.target.value)}>
                  <option value="">— ছাত্র বেছে নিন —</option>
                  {SAMPLE_STUDENTS.map(s => <option key={s.id} value={s.id}>{s.nameBn} ({CLASS_NAMES[s.class]})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">ফি ধরন</label>
                <select className="form-input" value={form.feeType} onChange={e => ff('feeType', e.target.value)}>
                  {FEE_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">পরিমাণ (৳) *</label><input type="number" className="form-input" value={form.amount} onChange={e => ff('amount', e.target.value)} /></div>
              <div className="form-group">
                <label className="form-label">মাস</label>
                <select className="form-input" value={form.month} onChange={e => ff('month', e.target.value)}>
                  {MONTHS_BN.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-group"><label className="form-label">বছর</label><input className="form-input" value={form.year} onChange={e => ff('year', e.target.value)} /></div>
              <div className="form-group">
                <label className="form-label">অবস্থা</label>
                <select className="form-input" value={form.status} onChange={e => ff('status', e.target.value)}>
                  <option value="paid">পরিশোধিত</option>
                  <option value="due">বকেয়া</option>
                </select>
              </div>
              {form.status === 'paid' && <>
                <div className="form-group">
                  <label className="form-label">পদ্ধতি</label>
                  <select className="form-input" value={form.paymentMethod} onChange={e => ff('paymentMethod', e.target.value)}>
                    {PAYMENT_METHODS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">তারিখ</label><input type="date" className="form-input" value={form.date} onChange={e => ff('date', e.target.value)} /></div>
              </>}
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={closeModal} className="btn-secondary">বাতিল</button>
              <button onClick={handleSave} className="btn-primary">{editData ? 'আপডেট' : 'সংরক্ষণ'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receipt && (
        <div className="modal-overlay" onClick={() => setReceipt(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><MdCheckCircle className="text-green-700 text-2xl" /></div>
              <h3 className="text-lg font-bold text-gray-800">পেমেন্ট রসিদ</h3>
              <p className="text-xs text-gray-400">দারুত তাওহীদ ক্যাডেট মাদ্রাসা</p>
            </div>
            <div className="space-y-3 text-sm border-t border-dashed border-gray-200 pt-4">
              {[['ছাত্রের নাম', receipt.studentName], ['শ্রেণী', CLASS_NAMES[receipt.class]], ['ফি ধরন', FEE_TYPES.find(f => f.value === receipt.feeType)?.label], ['মাস', receipt.month + ' ' + receipt.year], ['পরিমাণ', formatTaka(receipt.amount)], ['পদ্ধতি', PAYMENT_METHODS.find(m => m.value === receipt.paymentMethod)?.label], ['তারিখ', receipt.date]].map(([l, v]) => (
                <div key={l} className="flex justify-between"><span className="text-gray-500">{l}</span><span className="font-semibold text-gray-800">{v}</span></div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-green-50 rounded-xl text-center">
              <p className="text-green-700 font-bold text-lg">{formatTaka(receipt.amount)}</p>
              <p className="text-green-600 text-xs">সফলভাবে পরিশোধিত</p>
            </div>
            <button onClick={() => setReceipt(null)} className="btn-secondary w-full mt-4 justify-center">বন্ধ করুন</button>
          </div>
        </div>
      )}
    </div>
  );
}
