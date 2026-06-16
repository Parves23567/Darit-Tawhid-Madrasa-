import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdMenu, MdNotificationsNone, MdSearch } from 'react-icons/md';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';

// Map paths to Bangla page titles
const PAGE_TITLES = {
  '/dashboard':   'ড্যাশবোর্ড',
  '/institution': 'প্রতিষ্ঠান পরিচিতি',
  '/students':    'ছাত্র/ছাত্রী তালিকা',
  '/teachers':    'শিক্ষকমণ্ডলী',
  '/guardians':   'অভিভাবক তালিকা',
  '/classes':     'শ্রেণী ব্যবস্থাপনা',
  '/attendance':  'হাজিরা',
  '/exams':       'পরীক্ষা ব্যবস্থাপনা',
  '/results':     'ফলাফল',
  '/fees':        'বেতন ও ফি',
  '/notices':     'নোটিশ বোর্ড',
  '/routines':    'রুটিন',
  '/reports':     'রিপোর্ট',
  '/settings':    'সেটিংস',
};

function Navbar({ onToggleSidebar, collapsed }) {
  const location = useLocation();

  const getTitle = () => {
    const match = Object.keys(PAGE_TITLES).find(
      (key) => location.pathname === key || location.pathname.startsWith(key + '/')
    );
    return match ? PAGE_TITLES[match] : 'দারুত তাওহীদ ক্যাডেট মাদ্রাসা';
  };

  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="fixed top-0 right-0 left-0 z-20 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center px-4 gap-4 transition-all duration-300"
      style={{ paddingLeft: '1rem' }}>

      {/* Toggle button */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <MdMenu size={22} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-800 truncate">{getTitle()}</h1>
        <p className="text-xs text-gray-400 hidden sm:block">{today}</p>
      </div>

      {/* Search bar — desktop */}
      <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 w-64">
        <MdSearch className="text-gray-400 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="খুঁজুন..."
          className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
        />
      </div>

      {/* Notification bell */}
      <button className="relative p-2 rounded-lg text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors">
        <MdNotificationsNone size={22} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* User avatar */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">
          অ
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-gray-700 leading-tight">অ্যাডমিন</p>
          <p className="text-xs text-gray-400">Super Admin</p>
        </div>
        <FaChevronDown className="text-gray-400 text-xs hidden sm:block" />
      </div>
    </header>
  );
}

export default Navbar;
