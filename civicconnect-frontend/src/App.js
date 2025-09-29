import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import './App.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import civicAidTheme from './theme/civicConnectTheme';

// Common Components
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

// Layout
import Layout from './components/layout/Layout';

// Direct imports
import HomePage from './pages/CivicConnectHomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import OrganizationPanel from './pages/OrganizationPanel';
import NotFoundPage from './pages/NotFoundPage';

// Lazy-loaded pages with error boundaries
const IssuesPage = React.lazy(() => import('./pages/IssuesPage'));
const IssueDetailPage = React.lazy(() => import('./pages/IssueDetailPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const ReportIssuePage = React.lazy(() => import('./pages/ReportIssuePage'));
const OrganizationsPage = React.lazy(() => import('./pages/OrganizationsPage'));
const OrganizationDetailPage = React.lazy(() => import('./pages/OrganizationDetailPage'));
const CreateOrganizationPage = React.lazy(() => import('./pages/CreateOrganizationPage'));
const OrganizationMembersPage = React.lazy(() => import('./pages/OrganizationMembersPage'));

// Route Guards
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const admin = localStorage.getItem('admin');
  return admin ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <ThemeProvider theme={civicAidTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <LanguageProvider>
          <NotificationProvider>
            <AuthProvider>
              <AdminAuthProvider>
                <Router>
                <Layout>
                <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <LoadingSpinner />
                </Box>}>
                  <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/issues/:id" element={<IssueDetailPage />} />
                <Route path="/organizations" element={<OrganizationsPage />} />
                <Route path="/organizations/:id" element={<OrganizationDetailPage />} />
                
                {/* Private routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } />
                <Route path="/report" element={<ReportIssuePage />} />
                <Route path="/organizations/create" element={
                  <PrivateRoute>
                    <CreateOrganizationPage />
                  </PrivateRoute>
                } />
                <Route path="/organizations/:id/members" element={
                  <PrivateRoute>
                    <OrganizationMembersPage />
                  </PrivateRoute>
                } />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/dashboard" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/organizations" element={
                  <AdminRoute>
                    <OrganizationPanel />
                  </AdminRoute>
                } />
                
                {/* 404 route */}
                <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </Layout>
            </Router>
              </AdminAuthProvider>
            </AuthProvider>
          </NotificationProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
