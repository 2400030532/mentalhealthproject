import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import ResourcesPage from './pages/student/ResourcesPage';
import BookSessionPage from './pages/student/BookSessionPage';
import SupportGroupsPage from './pages/student/SupportGroupsPage';
import StudentProfile from './pages/student/StudentProfile';
import QuizPage from './pages/student/QuizPage';
import QuizResultsPage from './pages/student/QuizResultsPage';
import ApprovedSessionsPage from './pages/student/ApprovedSessionsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageResources from './pages/admin/ManageResources';
import ManageSessions from './pages/admin/ManageSessions';
import ManageSupportGroups from './pages/admin/ManageSupportGroups';
import ManageQuiz from './pages/admin/ManageQuiz';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import ToastContainer from './components/ToastContainer';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/resources"
                element={
                  <ProtectedRoute role="student">
                    <ResourcesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/book-session"
                element={
                  <ProtectedRoute role="student">
                    <BookSessionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/support-groups"
                element={
                  <ProtectedRoute role="student">
                    <SupportGroupsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute role="student">
                    <StudentProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/quiz"
                element={
                  <ProtectedRoute role="student">
                    <QuizPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/quiz-results"
                element={
                  <ProtectedRoute role="student">
                    <QuizResultsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/approved-sessions"
                element={
                  <ProtectedRoute role="student">
                    <ApprovedSessionsPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/resources"
                element={
                  <ProtectedRoute role="admin">
                    <ManageResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/sessions"
                element={
                  <ProtectedRoute role="admin">
                    <ManageSessions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/support-groups"
                element={
                  <ProtectedRoute role="admin">
                    <ManageSupportGroups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/quiz"
                element={
                  <ProtectedRoute role="admin">
                    <ManageQuiz />
                  </ProtectedRoute>
                }
              />

              {/* Default redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

