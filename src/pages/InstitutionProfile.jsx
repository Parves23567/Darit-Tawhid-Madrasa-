import React, { useState } from 'react';
import {
  MdLocationOn, MdPhone, MdEmail, MdEdit, MdSave, MdCheck,
  MdSchool, MdPeople, MdCalendarToday, MdVerified
} from 'react-icons/md';
import { FaMosque, FaFacebook, FaGlobe } from 'react-icons/fa';
import { SAMPLE_STUDENTS, SAMPLE_TEACHERS } from '../utils/sampleData';
import { formatTaka } from '../utils/helpers';

const INSTITUTION = {
  nameBn: 'দারুত তাওহীদ ক্যাডেট মাদ্রাসা',
  nameEn: 'Darul Tawhid Cadet Madrasa',
  tagline: 'জ্ঞান, ঈমান ও চরিত্র গঠনের আলোকবর্তিকা',
  eiin: 'EIIN-123456',
  established: '২০১০ সাল',
  type: 'ক্যাডেট মাদ্রাসা',
  address: 'গৌড় শহরপুর, সারদা, চারঘাট, রাজশাহী',
  phone: '01711-000000',
  email: 'info@darultawhid.edu.bd',
  website: 'www.darultawhid.edu.bd',
  facebook: 'fb.com/darultawhid',
  principalName: 'মোঃ আব্দুর রহমান',
  principalPhone: '01711-100001',
  about: 'দারুত তাওহীদ ক্যাডেট মাদ্রাসা ২০১০ সালে প্রতিষ্ঠিত হয়। এটি রাজশাহী জেলার চারঘাট উপজেলায় অবস্থিত একটি আদর্শ ইসলামী শিক্ষাপ্রতিষ্ঠান। এখানে ছাত্র-ছাত্রীদের ইসলামী শিক্ষার পাশাপাশি জাতীয় শিক্ষাক্রম অনুযায়ী আধুনিক শিক্ষা প্রদান করা হয়। আমাদের লক্ষ্য হলো নৈতিক মূল্যবোধ সম্পন্ন, দেশ ও সমাজের প্রতি দায়িত্বশীল এবং ইসলামী আদর্শে দীক্ষিত প্রজন্ম তৈরি করা।',
  facilities: ['সুবিশাল ক্লাসরুম', 'হিফজুল কুরআন বিভাগ', 'লাইব্রেরি', 'খেলার মাঠ', 'কম্পিউটার ল্যাব', 'নামাজ কক্ষ', 'আবাসিক হল', 'চিকিৎসা কক্ষ'],
};

export default function InstitutionProfile() {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(INSTITUTION);
  const [saved, setSaved] = useState(false);

  const f = (field, val) => setData(p => ({ ...p, [field]: val }));

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalStudents = SAMPLE_STUDENTS.length;
  const totalTeachers = SAMPLE_TEACHERS.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><FaMosque className="text-green-700" /> প্রতিষ্ঠান পরিচিতি</h1>
          <p className="page-subtitle">মাদ্রাসার সামগ্রিক তথ্য ও পরিচিতি</p>
        </div>
        <div className="flex gap-2">
          {saved && <span className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium"><MdCheck size={16} /> সংরক্ষিত হয়েছে</span>}
          {!editing ? (
            <button onClick={() => setEditing(true)} className="btn-secondary"><MdEdit size={18} /> সম্পাদনা</button>
          ) : (
            <>
              <button onClick={() => setEditing(false)} className="btn-secondary">বাতিল</button>
              <button onClick={handleSave} className="btn-primary"><MdSave size={18} /> সংরক্ষণ</button>
            </>
          )}
        </div>
      </div>

      {/* Hero Banner */}
      <div className="gradient-green rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-40 translate-x-40" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-32 -translate-x-32" />
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
              <FaMosque size={40} />
            </div>
            <div>
              {editing ? (
                <>
                  <input className="bg-white/20 text-white placeholder-white/60 rounded-lg px-3 py-1.5 text-xl font-bold w-full mb-1 outline-none border border-white/30"
                    value={data.nameBn} onChange={e => f('nameBn', e.target.value)} />
                  <input className="bg-white/20 text-white/80 placeholder-white/50 rounded-lg px-3 py-1 text-sm w-full outline-none border border-white/30"
                    value={data.nameEn} onChange={e => f('nameEn', e.target.value)} />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{data.nameBn}</h2>
                  <p className="text-green-200 text-sm">{data.nameEn}</p>
                </>
              )}
              <p className="text-green-100 text-xs mt-1 italic">{data.tagline}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'মোট ছাত্র',   val: totalStudents,  icon: MdSchool },
              { label: 'মোট শিক্ষক',  val: totalTeachers,  icon: MdPeople },
              { label: 'প্রতিষ্ঠাকাল', val: data.established, icon: MdCalendarToday },
              { label: 'মোট শ্রেণী',  val: '৭টি',           icon: MdVerified },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                  <Icon className="mx-auto mb-1 text-green-200" size={18} />
                  <p className="text-xl font-bold">{s.val}</p>
                  <p className="text-green-200 text-xs">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="card space-y-4 lg:col-span-1">
          <h3 className="font-bold text-gray-800 border-b pb-3 flex items-center gap-2"><MdPhone className="text-green-700" /> যোগাযোগ তথ্য</h3>
          {editing ? (
            <div className="space-y-3">
              <div className="form-group"><label className="form-label">ফোন</label><input className="form-input" value={data.phone} onChange={e => f('phone', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">ইমেইল</label><input className="form-input" value={data.email} onChange={e => f('email', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">ওয়েবসাইট</label><input className="form-input" value={data.website} onChange={e => f('website', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">ফেসবুক</label><input className="form-input" value={data.facebook} onChange={e => f('facebook', e.target.value)} /></div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              {[
                [MdLocationOn, data.address, 'text-red-500'],
                [MdPhone, data.phone, 'text-green-600'],
                [MdEmail, data.email, 'text-blue-600'],
                [FaGlobe, data.website, 'text-purple-600'],
                [FaFacebook, data.facebook, 'text-blue-700'],
              ].map(([Icon, val, color], i) => (
                <div key={i} className="flex items-start gap-3">
                  <Icon className={`${color} flex-shrink-0 mt-0.5`} size={16} />
                  <span className="text-gray-700">{val}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">অধ্যক্ষ</p>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-700 rounded-full text-white flex items-center justify-center font-bold">{data.principalName?.charAt(0)}</div>
              <div>
                {editing ? (
                  <>
                    <input className="form-input py-1 text-sm mb-1" value={data.principalName} onChange={e => f('principalName', e.target.value)} />
                    <input className="form-input py-1 text-sm" value={data.principalPhone} onChange={e => f('principalPhone', e.target.value)} />
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-gray-800 text-sm">{data.principalName}</p>
                    <p className="text-xs text-gray-500">{data.principalPhone}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="card lg:col-span-2 space-y-5">
          <h3 className="font-bold text-gray-800 border-b pb-3 flex items-center gap-2"><MdVerified className="text-green-700" /> আমাদের সম্পর্কে</h3>
          {editing ? (
            <textarea className="form-input" rows={6} value={data.about} onChange={e => f('about', e.target.value)} />
          ) : (
            <p className="text-gray-600 leading-relaxed text-sm">{data.about}</p>
          )}

          <div>
            <h4 className="font-bold text-gray-700 mb-3">সুযোগ-সুবিধা</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {data.facilities.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 text-sm text-green-800">
                  <MdCheck size={14} className="text-green-600 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[['EIIN', data.eiin], ['প্রতিষ্ঠান ধরন', data.type], ['প্রতিষ্ঠাকাল', data.established]].map(([l, v]) => (
              <div key={l} className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-0.5">{l}</p>
                {editing && l === 'EIIN' ? (
                  <input className="form-input py-1 text-sm" value={data.eiin} onChange={e => f('eiin', e.target.value)} />
                ) : (
                  <p className="font-semibold text-gray-800">{v}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
