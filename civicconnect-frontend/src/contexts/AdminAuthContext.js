import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if admin is logged in on app load
    const savedAdmin = localStorage.getItem('admin');
    if (savedAdmin) {
      try {
        setAdmin(JSON.parse(savedAdmin));
      } catch (err) {
        localStorage.removeItem('admin');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      // Super admin credentials
      if (email === 'superadmin@civicconnect.com' && password === 'superad78378742') {
        const adminData = {
          id: 'admin-001',
          email: 'superadmin@civicconnect.com',
          name: 'Super Admin',
          role: 'super_admin',
          permissions: [
            'view_all_issues',
            'manage_issues',
            'manage_organizations',
            'manage_users',
            'view_analytics',
            'system_settings'
          ],
          loginTime: new Date().toISOString()
        };

        setAdmin(adminData);
        localStorage.setItem('admin', JSON.stringify(adminData));
        return { success: true, admin: adminData };
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  const hasPermission = (permission) => {
    if (!admin) return false;
    return admin.permissions.includes(permission);
  };

  const value = {
    admin,
    login,
    logout,
    loading,
    error,
    setError,
    hasPermission,
    isAuthenticated: !!admin
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
