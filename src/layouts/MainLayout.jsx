import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

function MainLayout() {
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useApp();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      toggleSidebar();
    }
  };

  const sidebarCollapsed = isMobile ? !mobileSidebarOpen : !sidebarOpen;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={isMobile ? !mobileSidebarOpen : !sidebarOpen}
        onClose={() => isMobile && setMobileSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Main content area */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{
          marginLeft: isMobile ? 0 : (sidebarOpen ? '256px' : '64px'),
        }}
      >
        {/* Top Navbar */}
        <Navbar
          onToggleSidebar={handleToggle}
          collapsed={sidebarCollapsed}
        />

        {/* Page content */}
        <main className="flex-1 mt-16 p-4 md:p-6 animate-fade-in">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-100">
          দারুত তাওহীদ ক্যাডেট মাদ্রাসা ম্যানেজমেন্ট সিস্টেম &copy; ২০২৪ — গৌড় শহরপুর, চারঘাট, রাজশাহী
        </footer>
      </div>
    </div>
  );
}

export default MainLayout;
