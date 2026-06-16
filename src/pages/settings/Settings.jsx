import React, { useState } from 'react';
import {
  MdSettings, MdSave, MdSchool, MdAttachMoney, MdGrade,
  MdSecurity, MdBackup, MdInfo, MdEdit, MdCheck
} from 'react-icons/md';
import { CLASS_OPTIONS, MONTHS_BN } from '../../utils/helpers';
import { GRADE_SCALE } from '../../utils/gradeCalculator';
import { FaMosque } from 'react-icons/fa';

const TABS = [
  { id: 'institution', label: 'প্রতিষ্ঠান তথ্য',  icon: FaMosque },
  { id: 'academic',    label: 'একাডেমিক সেটআপ',   icon: MdSchool },
  { id: 'fees',        label: 'ফি কনফিগারেশন',     icon: MdAttachMoney },
  { id: 'grades',      label: 'গ্রেড স্কেল',        icon: MdGrade },
  { id: 'backup',      label: 'ব্যাকআপ',            icon: MdBackup },
];

const INITIAL_INSTITUTION = {
  nameBn: 'দারুত তাওহীদ ক্যাডেট মাদ্রাসা',
  nameEn: 'Darul Tawhid Cadet Madrasa',
  eiin: 'EIIN-123456',
  phone: '01711-000000',
  email: 'info@darultawhid.edu.bd',
  address: 'গৌড় শহরপুর, সারদা, চারঘাট, রাজশাহী',
  division: 'রাজশাহী',
  district: 'রাজশাহী',
  upazila: 'চারঘাট',
  established: '2010',
  type: 'ক্যাডেট মাদ্রাসা',
  principalName: 'মোঃ আব্দুর রহমান',
  principalPhone: '01711-100001',
};

const INITIAL_FEES = {
  play: 300, nursery: 400, class1: 500, class2: 500,
  class3: 600, class4: 700, class5: 800,
};

const INITIAL_ACADEMIC = {
  year: '২০২৪',
  sessionStart: MONTHS_BN[0],
  sessionEnd: MONTHS_BN[11],
  examPassMark: '33',
};

function SectionCard({ title, icon: Icon, children, onSave, saved }) {
  return (
    <div className="card space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 text-base">
          <Icon className="text-green-700" size={20} /> {title}
        </h3>
        {onSave && (
          <button onClick={onSave}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-green-100 text-green-700' : 'btn-primary py-2'}`}>
            {saved ? <><MdCheck size={16} /> সংরক্ষিত</> : <><MdSave size={16} /> সংরক্ষণ করুন</>}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('institution');
  const [institution, setInstitution] = useState(INITIAL_INSTITUTION);
  const [fees, setFees] = useState(INITIAL_FEES);
  const [academic, setAcademic] = useState(INITIAL_ACADEMIC);
  const [savedSection, setSavedSection] = useState('');

  const save = (section) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(''), 3000);
  };

  const fi = (field, val) => setInstitution(p => ({ ...p, [field]: val }));
  const fa = (field, val) => setAcademic(p => ({ ...p, [field]: val }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdSettings className="text-green-700" /> সিস্টেম সেটিংস</h1>
          <p className="page-subtitle">মাদ্রাসার তথ্য, ফি ও একাডেমিক কনফিগারেশন</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${activeTab === tab.id ? 'bg-green-700 text-white border-green-700 shadow' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'}`}>
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Institution Info */}
      {activeTab === 'institution' && (
        <SectionCard title="প্রতিষ্ঠান পরিচিতি" icon={FaMosque} onSave={() => save('institution')} saved={savedSection === 'institution'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group sm:col-span-2">
              <label className="form-label">বাংলা নাম</label>
              <input className="form-input" value={institution.nameBn} onChange={e => fi('nameBn', e.target.value)} />
            </div>
            <div className="form-group sm:col-span-2">
              <label className="form-label">ইংরেজি নাম</label>
              <input className="form-input" value={institution.nameEn} onChange={e => fi('nameEn', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">EIIN নম্বর</label>
              <input className="form-input" value={institution.eiin} onChange={e => fi('eiin', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">প্রতিষ্ঠার সাল</label>
              <input className="form-input" value={institution.established} onChange={e => fi('established', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">ফোন</label>
              <input className="form-input" value={institution.phone} onChange={e => fi('phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">ইমেইল</label>
              <input type="email" className="form-input" value={institution.email} onChange={e => fi('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">বিভাগ</label>
              <input className="form-input" value={institution.division} onChange={e => fi('division', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">জেলা</label>
              <input className="form-input" value={institution.district} onChange={e => fi('district', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">উপজেলা</label>
              <input className="form-input" value={institution.upazila} onChange={e => fi('upazila', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">প্রতিষ্ঠান ধরন</label>
              <input className="form-input" value={institution.type} onChange={e => fi('type', e.target.value)} />
            </div>
            <div className="form-group sm:col-span-2">
              <label className="form-label">পূর্ণ ঠিকানা</label>
              <textarea className="form-input" rows={2} value={institution.address} onChange={e => fi('address', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">অধ্যক্ষের নাম</label>
              <input className="form-input" value={institution.principalName} onChange={e => fi('principalName', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">অধ্যক্ষের ফোন</label>
              <input className="form-input" value={institution.principalPhone} onChange={e => fi('principalPhone', e.target.value)} />
            </div>
          </div>
        </SectionCard>
      )}

      {/* Academic Setup */}
      {activeTab === 'academic' && (
        <SectionCard title="একাডেমিক সেটআপ" icon={MdSchool} onSave={() => save('academic')} saved={savedSection === 'academic'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">বর্তমান একাডেমিক বছর</label>
              <input className="form-input" value={academic.year} onChange={e => fa('year', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">পাসের ন্যূনতম নম্বর</label>
              <input type="number" className="form-input" value={academic.examPassMark} onChange={e => fa('examPassMark', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">সেশন শুরু</label>
              <select className="form-input" value={academic.sessionStart} onChange={e => fa('sessionStart', e.target.value)}>
                {MONTHS_BN.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">সেশন শেষ</label>
              <select className="form-input" value={academic.sessionEnd} onChange={e => fa('sessionEnd', e.target.value)}>
                {MONTHS_BN.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-amber-700 text-sm font-medium flex items-center gap-2"><MdInfo size={16} /> বর্তমান সেশন: {academic.sessionStart} — {academic.sessionEnd}, {academic.year}</p>
          </div>
        </SectionCard>
      )}

      {/* Fee Configuration */}
      {activeTab === 'fees' && (
        <SectionCard title="শ্রেণীভিত্তিক মাসিক বেতন" icon={MdAttachMoney} onSave={() => save('fees')} saved={savedSection === 'fees'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLASS_OPTIONS.map(cls => (
              <div key={cls.value} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
                  {cls.label.split(' ').pop()}
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">{cls.label}</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 text-sm">৳</span>
                    <input
                      type="number"
                      className="form-input py-1.5 text-sm"
                      value={fees[cls.value]}
                      onChange={e => setFees(p => ({ ...p, [cls.value]: e.target.value }))}
                    />
                    <span className="text-gray-400 text-xs whitespace-nowrap">/মাস</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Grade Scale */}
      {activeTab === 'grades' && (
        <SectionCard title="গ্রেড স্কেল (বাংলাদেশ জাতীয় শিক্ষাক্রম)" icon={MdGrade}>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr><th>গ্রেড লেটার</th><th>বাংলা নাম</th><th>নম্বর পরিসর</th><th>গ্রেড পয়েন্ট</th><th>রঙ</th></tr>
              </thead>
              <tbody>
                {GRADE_SCALE.map(g => (
                  <tr key={g.grade}>
                    <td><span className="text-lg font-bold text-gray-800">{g.grade}</span></td>
                    <td className="font-medium text-gray-700">{g.label}</td>
                    <td className="text-gray-600">{g.min} — {g.max}</td>
                    <td><span className="font-bold text-green-700">{g.point.toFixed(2)}</span></td>
                    <td>
                      <span className={`badge ${g.grade === 'F' ? 'badge-danger' : g.point >= 4 ? 'badge-success' : g.point >= 2 ? 'badge-warning' : 'badge-gray'}`}>
                        {g.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><MdInfo size={14} /> গ্রেড স্কেল বাংলাদেশ জাতীয় শিক্ষাক্রম অনুযায়ী স্থির। পরিবর্তন করতে ডেভেলপারের সাথে যোগাযোগ করুন।</p>
        </SectionCard>
      )}

      {/* Backup */}
      {activeTab === 'backup' && (
        <div className="space-y-4">
          <SectionCard title="ডেটা ব্যাকআপ ও রিস্টোর" icon={MdBackup}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border-2 border-dashed border-green-300 rounded-xl text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer">
                <MdBackup size={32} className="text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">ডেটা রপ্তানি (Export)</p>
                <p className="text-xs text-gray-500 mt-1">সমস্ত ডেটা JSON ফাইলে সংরক্ষণ করুন</p>
                <button className="btn-primary mt-4 text-sm justify-center mx-auto">ডাউনলোড করুন</button>
              </div>
              <div className="p-5 border-2 border-dashed border-blue-300 rounded-xl text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                <MdSecurity size={32} className="text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">ডেটা আমদানি (Import)</p>
                <p className="text-xs text-gray-500 mt-1">আগের ব্যাকআপ থেকে ডেটা পুনরুদ্ধার করুন</p>
                <button className="btn-secondary mt-4 text-sm justify-center mx-auto">ফাইল বেছে নিন</button>
              </div>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mt-2">
              <p className="text-amber-700 text-sm font-medium flex items-center gap-2"><MdInfo size={16} /> Firebase সংযোগ করলে স্বয়ংক্রিয় ক্লাউড ব্যাকআপ সক্রিয় হবে।</p>
            </div>
          </SectionCard>

          <SectionCard title="সিস্টেম তথ্য" icon={MdInfo}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                ['সংস্করণ', 'v1.0.0'],
                ['ফ্রেমওয়ার্ক', 'React + Vite'],
                ['স্টাইলিং', 'Tailwind CSS'],
                ['ডেটাবেজ', 'Firebase Firestore'],
                ['প্রমাণীকরণ', 'Firebase Auth'],
                ['শেষ আপডেট', new Date().toLocaleDateString('bn-BD')],
              ].map(([l, v]) => (
                <div key={l} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-0.5">{l}</p>
                  <p className="font-semibold text-gray-800">{v}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}
