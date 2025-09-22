import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Members from './pages/Members';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Events from './pages/Events';
import Awards from './pages/Awards';
import LeaveRequests from './pages/LeaveRequests';
import AccessControl from './pages/AccessControl';
import Teachers from './pages/Teachers';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute permissions={['view_members', 'all']}>
                  <Layout>
                    <Members />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/teachers"
              element={
                <ProtectedRoute permissions={['all']}>
                  <Layout>
                    <Teachers />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes"
              element={
                <ProtectedRoute permissions={['view_classes', 'all']}>
                  <Layout>
                    <Classes />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute permissions={['manage_attendance', 'all']}>
                  <Layout>
                    <Attendance />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute permissions={['view_reports', 'all']}>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute permissions={['all']}>
                  <Layout>
                    <Events />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/awards"
              element={
                <ProtectedRoute permissions={['all']}>
                  <Layout>
                    <Awards />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/leave-requests"
              element={
                <ProtectedRoute permissions={['all']}>
                  <Layout>
                    <LeaveRequests />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/access-control"
              element={
                <ProtectedRoute permissions={['all']}>
                  <Layout>
                    <AccessControl />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute permissions={['all']}>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;