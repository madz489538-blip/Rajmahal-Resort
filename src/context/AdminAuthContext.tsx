import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    try {
      const stored = localStorage.getItem('rajmahal_admin_session');
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore
    }
    return null;
  });

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Simulated credential check for demo
    if (email.trim().toLowerCase() === 'admin@rajmahalresort.com' && pass === 'rajmahal2026') {
      const adminData: AdminUser = {
        id: 'adm-001',
        email: 'admin@rajmahalresort.com',
        name: 'Executive General Manager',
        role: 'Super Admin',
      };
      setUser(adminData);
      localStorage.setItem('rajmahal_admin_session', JSON.stringify(adminData));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. For concept demonstration, use: admin@rajmahalresort.com / rajmahal2026',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rajmahal_admin_session');
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
