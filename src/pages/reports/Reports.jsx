import React, { useState, useMemo } from 'react';
import { MdBarChart, MdTrendingUp, MdSchool, MdPeople, MdPayment, MdEventNote } from 'react-icons/md';
import { SAMPLE_STUDENTS, SAMPLE_TEACHERS, SAMPLE_FEES } from '../../utils/sampleData';
import { CLASS_NAMES, CLASS_OPTIONS, formatTaka } from '../../utils/helpers';

function SectionCard({ title, icon: Icon, color, children }) {
  return (
    <div className="card">
      <h3 className={`font-bold text-gray-800 flex items-center gap-2 mb-4 pb-3 border-b border-gray-100`}>
        <Icon className={color} size={20} /> {title}
      </h3>
      {children}
    </div>
  );
}

export default function Reports() {
  const [activeReport, setActiveReport] = useState('overview');

  // Computed stats
  const totalStudents = SAMPLE_STUDENTS.length;
  const activeStudents = SAMPLE_STUDENTS.filter(s => s.status === 'active').length;
  const maleStudents = SAMPLE_STUDENTS.filter(s => s.gender === 'male').length;
  const femaleStudents = SAMPLE_STUDENTS.filter(s => s.gender === 'female').length;

  const classDist = useMemo(() => {
    const map = {};
    SAMPLE_STUDENTS.forEach(s => {
      map[s.class] = (map[s.class] || 0) + 1;
    });
    return map;
  }, []);

  const totalPaid = SAMPLE_FEES.filter(f => f.status === 'paid').reduce((a, b) => a + Number(b.amount), 0);
  const totalDue = SAMPLE_FEES.filter(f => f.status === 'due').reduce((a, b) => a + Number(b.amount), 0);

  const REPORT_TYPES = [
    { id: 'overview',  label: 'সার-সংক্ষেপ',     icon: MdBarChart },
    { id: 'students',  label: 'ছাত্র রিপোর্ট',   icon: MdSchool },
    { id: 'teachers',  label: 'শিক্ষক রিপোর্ট',  icon: MdPeople },
    { id: 'fees',      label: 'আর্থিক রিপোর্ট',  icon: MdPayment },
    { id: 'attendance',label: 'হাজিরা রিপোর্ট',  icon: MdEventNote },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title flex items-center gap-2"><MdBarChart className="text-green-700" /> রিপোর্ট ও পরিসংখ্যান</h1>
          <p className="page-subtitle">প্রতিষ্ঠানের সামগ্রিক তথ্য ও বিশ্লেষণ</p>
        </div>
        <button onClick={() => window.print()} className="btn-secondary">প্রিন্ট করুন</button>
      </div>

      {/* Report Type Tabs */}
      <div className="flex flex-wrap gap-2">
        {REPORT_TYPES.map(r => {
          const Icon = r.icon;
          return (
            <button key={r.id} onClick={() => setActiveReport(r.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${activeReport === r.id ? 'bg-green-700 text-white border-green-700 shadow' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'}`}>
              <Icon size={16} /> {r.label}
            </button>
          );
        })}
      </div>

      {/* Overview */}
      {activeReport === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'মোট ছাত্র',   val: totalStudents,            color: 'text-green-700',  bg: 'bg-green-50' },
              { label: 'মোট শিক্ষক',  val: SAMPLE_TEACHERS.length,   color: 'text-blue-700',   bg: 'bg-blue-50' },
              { label: 'মোট আদায়',   val: formatTaka(totalPaid),     color: 'text-emerald-700',bg: 'bg-emerald-50' },
              { label: 'মোট বকেয়া',  val: formatTaka(totalDue),      color: 'text-red-700',    bg: 'bg-red-50' },
            ].map(s => (
              <div key={s.label} className={`card ${s.bg} text-center py-4`}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Class Distribution Bar Chart */}
          <SectionCard title="শ্রেণীভিত্তিক ছাত্র বিতরণ" icon={MdSchool} color="text-green-700">
            <div className="space-y-3">
              {CLASS_OPTIONS.map(cls => {
                const count = classDist[cls.value] || 0;
                const pct = totalStudents > 0 ? (count / totalStudents) * 100 : 0;
                return (
                  <div key={cls.value}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{cls.label}</span>
                      <span className="text-gray-500">{count} জন ({Math.round(pct)}%)</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Gender & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SectionCard title="লিঙ্গভিত্তিক বিতরণ" icon={MdPeople} color="text-blue-700">
              <div className="space-y-3">
                {[['ছেলে', maleStudents, 'bg-blue-500'], ['মেয়ে', femaleStudents, 'bg-pink-500']].map(([l, v, c]) => (
                  <div key={l}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{l}</span>
                      <span className="text-gray-500">{v} জন ({totalStudents ? Math.round((v / totalStudents) * 100) : 0}%)</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${c} rounded-full`} style={{ width: `${totalStudents ? (v / totalStudents) * 100 : 0}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="অর্থ সংগ্রহ সারসংক্ষেপ" icon={MdPayment} color="text-emerald-700">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-700 font-bold text-sm">✓</div>
                  <div><p className="text-xs text-gray-400">পরিশোধিত</p><p className="font-bold text-green-700">{formatTaka(totalPaid)}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-sm">!</div>
                  <div><p className="text-xs text-gray-400">বকেয়া</p><p className="font-bold text-red-600">{formatTaka(totalDue)}</p></div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: `${(totalPaid / (totalPaid + totalDue)) * 100 || 0}%` }} />
                </div>
                <p className="text-xs text-gray-400 text-right">সংগ্রহ হার: {totalPaid + totalDue > 0 ? Math.round((totalPaid / (totalPaid + totalDue)) * 100) : 0}%</p>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {activeReport === 'students' && (
        <SectionCard title="ছাত্র বিস্তারিত রিপোর্ট" icon={MdSchool} color="text-green-700">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr><th>নাম</th><th>শ্রেণী</th><th>রোল</th><th>লিঙ্গ</th><th>রক্তের গ্রুপ</th><th>অবস্থা</th></tr>
              </thead>
              <tbody>
                {SAMPLE_STUDENTS.map(s => (
                  <tr key={s.id}>
                    <td className="font-medium">{s.nameBn}</td>
                    <td>{CLASS_NAMES[s.class]}</td>
                    <td>{s.roll}</td>
                    <td>{s.gender === 'male' ? 'ছেলে' : 'মেয়ে'}</td>
                    <td>{s.bloodGroup}</td>
                    <td><span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{s.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {activeReport === 'teachers' && (
        <SectionCard title="শিক্ষক বিস্তারিত রিপোর্ট" icon={MdPeople} color="text-blue-700">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr><th>নাম</th><th>পদবি</th><th>ফোন</th><th>বেতন</th><th>যোগদান</th><th>অবস্থা</th></tr>
              </thead>
              <tbody>
                {SAMPLE_TEACHERS.map(t => (
                  <tr key={t.id}>
                    <td className="font-medium">{t.name}</td>
                    <td>{t.designation}</td>
                    <td>{t.phone}</td>
                    <td>{formatTaka(t.salary)}</td>
                    <td>{t.joiningDate}</td>
                    <td><span className={`badge ${t.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{t.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {activeReport === 'fees' && (
        <SectionCard title="আর্থিক বিস্তারিত রিপোর্ট" icon={MdPayment} color="text-emerald-700">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr><th>ছাত্র</th><th>শ্রেণী</th><th>পরিমাণ</th><th>মাস</th><th>অবস্থা</th><th>তারিখ</th></tr>
              </thead>
              <tbody>
                {SAMPLE_FEES.map(f => (
                  <tr key={f.id}>
                    <td className="font-medium">{f.studentName}</td>
                    <td>{CLASS_NAMES[f.class]}</td>
                    <td className="font-semibold">{formatTaka(f.amount)}</td>
                    <td>{f.month}</td>
                    <td><span className={`badge ${f.status === 'paid' ? 'badge-success' : 'badge-danger'}`}>{f.status === 'paid' ? 'পরিশোধিত' : 'বকেয়া'}</span></td>
                    <td className="text-gray-500 text-xs">{f.date || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {activeReport === 'attendance' && (
        <div className="card text-center py-20 text-gray-400">
          <MdTrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">হাজিরা রিপোর্ট</p>
          <p className="text-sm mt-1">হাজিরা ডেটা প্রবেশ করানোর পর এখানে রিপোর্ট দেখাবে</p>
        </div>
      )}
    </div>
  );
}
