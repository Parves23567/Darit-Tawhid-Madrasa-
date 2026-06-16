import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  MdDashboard, MdSchool, MdPeople, MdClass, MdEventNote,
  MdAssignment, MdBarChart, MdSettings, MdClose, MdChevronLeft,
  MdChevronRight, MdNotifications, MdPayment, MdAccountBalance,
  MdSupervisorAccount, MdSchedule
} from 'react-icons/md';
import { FaMosque } from 'react-icons/fa';

const menuSections = [
  {
    title: 'প্রধান মেনু',
    items: [
      { path: '/dashboard',    icon: MdDashboard,       label: 'ড্যাশবোর্ড' },
      { path: '/institution',  icon: FaMosque,          label: 'প্রতিষ্ঠান পরিচিতি' },
    ],
  },
  {
    title: 'ব্যবস্থাপনা',
    items: [
      { path: '/students',     icon: MdSchool,          label: 'ছাত্র/ছাত্রী' },
      { path: '/teachers',     icon: MdPeople,          label: 'শিক্ষকমণ্ডলী' },
      { path: '/guardians',    icon: MdSupervisorAccount, label: 'অভিভাবক' },
      { path: '/classes',      icon: MdClass,           label: 'শ্রেণী' },
    ],
  },
  {
    title: 'একাডেমিক',
    items: [
      { path: '/attendance',   icon: MdEventNote,       label: 'হাজিরা' },
      { path: '/exams',        icon: MdAssignment,      label: 'পরীক্ষা' },
      { path: '/results',      icon: MdBarChart,        label: 'ফলাফল' },
    ],
  },
  {
    title: 'অর্থ ও যোগাযোগ',
    items: [
      { path: '/fees',         icon: MdPayment,         label: 'বেতন ও ফি' },
      { path: '/notices',      icon: MdNotifications,   label: 'নোটিশ বোর্ড' },
      { path: '/routines',     icon: MdSchedule,        label: 'রুটিন' },
    ],
  },
  {
    title: 'সিস্টেম',
    items: [
      { path: '/reports',      icon: MdAccountBalance,  label: 'রিপোর্ট' },
      { path: '/settings',     icon: MdSettings,        label: 'সেটিংস' },
    ],
  },
];

function Sidebar({ collapsed, onClose, isMobile }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          bg-gradient-to-b from-green-900 via-green-900 to-green-950
          shadow-2xl transition-all duration-300 ease-in-out
          ${collapsed && !isMobile ? 'w-16' : 'w-64'}
          ${isMobile ? (collapsed ? '-translate-x-full' : 'translate-x-0') : 'translate-x-0'}
        `}
      >
        {/* ── Logo / Header ── */}
        <div className={`flex items-center gap-3 p-4 border-b border-green-700/50 min-h-[64px] ${collapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <FaMosque className="text-white text-lg" />
          </div>
          {(!collapsed || isMobile) && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-sm leading-tight truncate">
                দারুত তাওহীদ
              </p>
              <p className="text-green-300 text-xs truncate">ক্যাডেট মাদ্রাসা</p>
            </div>
          )}
          {isMobile && (
            <button
              onClick={onClose}
              className="ml-auto text-green-300 hover:text-white p-1"
            >
              <MdClose size={20} />
            </button>
          )}
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
          {menuSections.map((section) => (
            <div key={section.title}>
              {(!collapsed || isMobile) && (
                <p className="section-title">{section.title}</p>
              )}
              {collapsed && !isMobile && (
                <div className="border-t border-green-700/40 my-2 mx-1" />
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path ||
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={isMobile ? onClose : undefined}
                    title={collapsed && !isMobile ? item.label : ''}
                    className={`
                      sidebar-link
                      ${isActive ? 'active' : ''}
                      ${collapsed && !isMobile ? 'justify-center px-0' : ''}
                    `}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {(!collapsed || isMobile) && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {isActive && (!collapsed || isMobile) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* ── Footer ── */}
        {(!collapsed || isMobile) && (
          <div className="p-4 border-t border-green-700/50">
            <p className="text-green-500 text-xs text-center">
              গৌড় শহরপুর, চারঘাট, রাজশাহী
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
