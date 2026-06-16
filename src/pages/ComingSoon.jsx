import React from 'react';
import { FaMosque, FaCheckCircle } from 'react-icons/fa';
import { MdConstruction } from 'react-icons/md';

function ComingSoon({ page }) {
  const modules = [
    'ছাত্র ব্যবস্থাপনা',
    'শিক্ষক ব্যবস্থাপনা',
    'উপস্থিতি',
    'পরীক্ষা ও ফলাফল',
    'ফি ব্যবস্থাপনা',
    'নোটিশ বোর্ড',
    'রুটিন',
    'রিপোর্ট',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 flex flex-col items-center justify-center px-4 py-12">

      {/* ── Decorative background pattern ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-700/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-800/10 rounded-full blur-3xl" />
      </div>

      {/* ── Main card ── */}
      <div className="relative z-10 w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur rounded-3xl mb-6 shadow-2xl border border-white/20">
            <FaMosque className="text-5xl text-green-300" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            দারুত তাওহীদ ক্যাডেট মাদ্রাসা
          </h1>
          <p className="text-green-300 text-base md:text-lg font-medium">
            ম্যানেজমেন্ট সিস্টেম
          </p>
          <p className="text-green-400 text-sm mt-1">
            গৌড় শহরপুর, সারদা, চারঘাট, রাজশাহী
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl mb-6">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center">
              <MdConstruction className="text-2xl text-amber-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">
                {page ? `"${page}" মডিউল তৈরি হচ্ছে...` : 'সিস্টেম সেটআপ সম্পন্ন!'}
              </h2>
              <p className="text-green-300 text-sm">ধাপে ধাপে সব মডিউল তৈরি হবে</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-green-300 mb-2">
              <span>অগ্রগতি</span>
              <span>Step 1A সম্পন্ন</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-1000"
                style={{ width: '8%' }}
              />
            </div>
            <p className="text-green-400 text-xs mt-1.5">১/১৬ মডিউল সম্পন্ন</p>
          </div>

          {/* Setup checklist */}
          <div className="space-y-2.5">
            {[
              { label: 'Node.js ও npm ইনস্টল', done: true },
              { label: 'React + Vite প্রজেক্ট তৈরি', done: true },
              { label: 'Tailwind CSS কনফিগার', done: true },
              { label: 'Firebase কনফিগ (Placeholder)', done: true },
              { label: 'AuthContext ও AppContext', done: true },
              { label: 'Utility Functions ও Sample Data', done: true },
              { label: 'Routing Structure', done: true },
              { label: 'Authentication (পরবর্তী Step)', done: false },
              { label: 'Dashboard ও Sidebar (পরবর্তী Step)', done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <FaCheckCircle
                  className={`text-lg flex-shrink-0 ${
                    item.done ? 'text-green-400' : 'text-white/20'
                  }`}
                />
                <span className={`text-sm ${item.done ? 'text-white' : 'text-white/40'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modules preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <p className="text-green-300 text-sm font-semibold mb-4">📋 পরিকল্পিত মডিউলসমূহ:</p>
          <div className="grid grid-cols-2 gap-2">
            {modules.map((mod, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-white/70 text-xs">{mod}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-green-500/60 text-xs mt-8">
          Darut Tawhid Cadet Madrasa Management System &copy; ২০২৪
        </p>
      </div>
    </div>
  );
}

export default ComingSoon;
