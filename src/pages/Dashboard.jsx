import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdPeople, MdSchool, MdClass, MdEventNote, MdPayment,
  MdWarning, MdNotifications, MdCalendarToday, MdTrendingUp,
  MdArrowForward, MdCheckCircle, MdCancel, MdAccessTime
} from 'react-icons/md';
import { FaMosque } from 'react-icons/fa';
import { SAMPLE_DASHBOARD_STATS, SAMPLE_NOTICES, SAMPLE_FEES } from '../utils/sampleData';
import { CLASS_NAMES, formatTaka } from '../utils/helpers';

// ── Stat Card Component ────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, link, trend }) {
  return (
    <Link to={link || '#'} className="card flex items-start gap-4 group hover:-translate-y-1 transition-transform duration-200 cursor-pointer no-underline">
      <div className={`stat-icon ${color}`}>
        <Icon className="text-2xl" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
          <MdTrendingUp size={14} />
          {trend}
        </div>
      )}
    </Link>
  );
}

// ── Attendance Badge ───────────────────────────────────────────────────────
function AttendanceBadge({ icon: Icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${color}`}>
      <Icon size={16} />
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────────────
function Dashboard() {
  const stats = SAMPLE_DASHBOARD_STATS;
  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const attendancePercent = Math.round(
    (stats.todayPresent / stats.totalStudents) * 100
  );

  // Recent due fees
  const dueFees = SAMPLE_FEES.filter((f) => f.status === 'due').slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Welcome banner ── */}
      <div className="gradient-green rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-white/5 rounded-full translate-y-24" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <FaMosque size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight">
              দারুত তাওহীদ ক্যাডেট মাদ্রাসা
            </h2>
            <p className="text-green-200 text-sm">গৌড় শহরপুর, সারদা, চারঘাট, রাজশাহী</p>
          </div>
          <div className="ml-auto hidden sm:block text-right">
            <p className="text-green-200 text-xs">{today}</p>
            <p className="text-white font-semibold text-sm mt-0.5">
              স্বাগতম, অ্যাডমিন!
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          icon={MdSchool}
          label="মোট ছাত্র/ছাত্রী"
          value={stats.totalStudents}
          sub="৭টি শ্রেণীতে"
          color="bg-green-100 text-green-700"
          link="/students"
          trend="+৫"
        />
        <StatCard
          icon={MdPeople}
          label="মোট শিক্ষক"
          value={stats.totalTeachers}
          sub="সক্রিয় শিক্ষকমণ্ডলী"
          color="bg-blue-100 text-blue-700"
          link="/teachers"
        />
        <StatCard
          icon={MdClass}
          label="মোট শ্রেণী"
          value={stats.totalClasses}
          sub="Play থেকে Class 5"
          color="bg-purple-100 text-purple-700"
          link="/classes"
        />
        <StatCard
          icon={MdPayment}
          label="মাসিক বেতন আদায়"
          value={formatTaka(stats.monthlyFeeCollection)}
          sub="এই মাসে সংগৃহীত"
          color="bg-emerald-100 text-emerald-700"
          link="/fees"
          trend="↑১২%"
        />
        <StatCard
          icon={MdWarning}
          label="বকেয়া বেতন"
          value={formatTaka(stats.dueFeeAmount)}
          sub="অপরিশোধিত"
          color="bg-red-100 text-red-600"
          link="/fees"
        />
        <StatCard
          icon={MdCalendarToday}
          label="আজকের হাজিরা"
          value={`${stats.todayPresent}/${stats.totalStudents}`}
          sub={`${attendancePercent}% উপস্থিতি`}
          color="bg-amber-100 text-amber-700"
          link="/attendance"
        />
      </div>

      {/* ── Attendance Summary + Notices row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Attendance detail card */}
        <div className="card lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-base">আজকের হাজিরা</h3>
            <Link to="/attendance" className="text-green-700 text-xs font-medium hover:underline flex items-center gap-1">
              বিস্তারিত <MdArrowForward size={14} />
            </Link>
          </div>

          {/* Circular progress */}
          <div className="flex justify-center mb-5">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#16a34a" strokeWidth="3"
                  strokeDasharray={`${attendancePercent} ${100 - attendancePercent}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{attendancePercent}%</span>
                <span className="text-xs text-gray-400">উপস্থিত</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <AttendanceBadge icon={MdCheckCircle} label="উপস্থিত" value={stats.todayPresent}  color="bg-green-50 text-green-700" />
            <AttendanceBadge icon={MdCancel}      label="অনুপস্থিত" value={stats.todayAbsent} color="bg-red-50 text-red-600" />
            <AttendanceBadge icon={MdAccessTime}  label="দেরিতে" value={stats.todayLate}       color="bg-amber-50 text-amber-700" />
            <AttendanceBadge icon={MdEventNote}   label="ছুটি" value={0}                        color="bg-blue-50 text-blue-600" />
          </div>
        </div>

        {/* Recent Notices */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <MdNotifications className="text-green-700" />
              সাম্প্রতিক নোটিশ
            </h3>
            <Link to="/notices" className="text-green-700 text-xs font-medium hover:underline flex items-center gap-1">
              সব দেখুন <MdArrowForward size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {SAMPLE_NOTICES.map((notice) => (
              <div
                key={notice.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors cursor-pointer group"
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notice.important ? 'bg-red-500' : 'bg-green-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-green-800">
                    {notice.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {notice.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{notice.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Due Fees Table ── */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
            <MdWarning className="text-red-500" />
            বকেয়া বেতন তালিকা
          </h3>
          <Link to="/fees" className="text-green-700 text-xs font-medium hover:underline flex items-center gap-1">
            সব দেখুন <MdArrowForward size={14} />
          </Link>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ছাত্রের নাম</th>
                <th>শ্রেণী</th>
                <th>ফি ধরন</th>
                <th>পরিমাণ</th>
                <th>মাস</th>
                <th>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {dueFees.map((fee) => (
                <tr key={fee.id}>
                  <td className="font-medium text-gray-800">{fee.studentName}</td>
                  <td>{CLASS_NAMES[fee.class] || fee.class}</td>
                  <td>মাসিক বেতন</td>
                  <td className="font-semibold text-red-600">{formatTaka(fee.amount)}</td>
                  <td>{fee.month}</td>
                  <td>
                    <Link to="/fees" className="btn-primary btn-sm text-xs py-1 px-3 inline-flex">
                      পরিশোধ করুন
                    </Link>
                  </td>
                </tr>
              ))}
              {dueFees.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-6">
                    কোনো বকেয়া নেই
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'ছাত্র ভর্তি',   link: '/students',   color: 'bg-green-700', icon: MdSchool },
          { label: 'হাজিরা দিন',     link: '/attendance', color: 'bg-blue-600',  icon: MdEventNote },
          { label: 'নম্বর দিন',      link: '/exams',      color: 'bg-purple-600',icon: MdCalendarToday },
          { label: 'বেতন নিন',       link: '/fees',        color: 'bg-emerald-600',icon: MdPayment },
          { label: 'নোটিশ দিন',      link: '/notices',    color: 'bg-amber-600', icon: MdNotifications },
          { label: 'রিপোর্ট দেখুন',  link: '/reports',   color: 'bg-red-600',   icon: MdTrendingUp },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.link}
              to={item.link}
              className={`${item.color} text-white rounded-xl p-4 flex flex-col items-center gap-2 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-sm`}
            >
              <Icon size={24} />
              <span className="text-xs font-medium text-center leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default Dashboard;
