import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard        from './pages/Dashboard';
import InstitutionProfile from './pages/InstitutionProfile';
import Students         from './pages/students/Students';
import Teachers         from './pages/teachers/Teachers';
import Guardians        from './pages/guardians/Guardians';
import Classes          from './pages/classes/Classes';
import Attendance       from './pages/attendance/Attendance';
import Exams            from './pages/exams/Exams';
import Results          from './pages/results/Results';
import Fees             from './pages/fees/Fees';
import Notices          from './pages/notices/Notices';
import Routines         from './pages/routines/Routines';
import Reports          from './pages/reports/Reports';
import Settings         from './pages/settings/Settings';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>

            {/* ── Root redirect ───────────────── */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* ── Main Layout (Sidebar + Navbar) ── */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard"    element={<Dashboard />} />
              <Route path="/institution"  element={<InstitutionProfile />} />

              {/* Students */}
              <Route path="/students"         element={<Students />} />
              <Route path="/students/add"     element={<Students />} />
              <Route path="/students/:id"     element={<Students />} />

              {/* Teachers */}
              <Route path="/teachers"         element={<Teachers />} />
              <Route path="/teachers/add"     element={<Teachers />} />
              <Route path="/teachers/:id"     element={<Teachers />} />

              {/* Guardians */}
              <Route path="/guardians"        element={<Guardians />} />

              {/* Classes & Subjects */}
              <Route path="/classes"          element={<Classes />} />
              <Route path="/subjects"         element={<Classes />} />

              {/* Attendance */}
              <Route path="/attendance"           element={<Attendance />} />
              <Route path="/attendance/students"  element={<Attendance />} />
              <Route path="/attendance/teachers"  element={<Attendance />} />

              {/* Exams */}
              <Route path="/exams"            element={<Exams />} />
              <Route path="/exams/add"        element={<Exams />} />
              <Route path="/exams/marks"      element={<Exams />} />

              {/* Results */}
              <Route path="/results"          element={<Results />} />

              {/* Fees */}
              <Route path="/fees"             element={<Fees />} />
              <Route path="/fees/report"      element={<Fees />} />

              {/* Notices */}
              <Route path="/notices"          element={<Notices />} />

              {/* Routines */}
              <Route path="/routines"         element={<Routines />} />

              {/* Reports */}
              <Route path="/reports"          element={<Reports />} />

              {/* Settings */}
              <Route path="/settings"         element={<Settings />} />
            </Route>

            {/* ── 404 Fallback ── */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
