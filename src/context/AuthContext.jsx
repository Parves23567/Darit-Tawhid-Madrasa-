// ─── Authentication Context ───────────────────────────────────────────────────
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ uid: 'demo-user-id', email: 'demo@example.com' });
  const [userProfile, setUserProfile] = useState({ role: 'admin' });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    console.log('Demo login with:', email);
    setCurrentUser({ uid: 'demo-user-id', email });
    setUserProfile({ role: 'admin' });
    return { user: { uid: 'demo-user-id' } };
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserProfile(null);
  };

  // Role checks
  const isAdmin = userProfile?.role === 'admin';
  const isTeacher = userProfile?.role === 'teacher';
  const isParent = userProfile?.role === 'parent';
  const isStudent = userProfile?.role === 'student';

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    logout,
    isAdmin,
    isTeacher,
    isParent,
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
