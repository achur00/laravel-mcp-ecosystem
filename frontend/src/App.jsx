import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import './index.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 font-medium">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait while we authenticate you</p>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

// Auth Layout Component
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen gradient-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Laravel Auth App</h1>
          <p className="text-gray-600">Powered by MCP Servers • Styled with Tailwind CSS</p>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-effect shadow-auth rounded-2xl px-8 py-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// Auth Routes Component
function AuthRoutes() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Toggle Buttons */}
        <div className="flex rounded-xl overflow-hidden shadow-sm border border-gray-200">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-300 ${
              isLogin
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-300 ${
              !isLogin
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Sign Up
          </button>
        </div>

        {/* Form Content */}
        <div key={isLogin ? 'login' : 'register'} className="animate-slide-up">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Test Credentials
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs text-blue-700">
              <div className="flex justify-between items-center">
                <span className="font-medium">👑 Admin:</span>
                <span className="font-mono">admin@test.com / admin123</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">👤 User:</span>
                <span className="font-mono">user@test.com / user123</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">⚖️ Moderator:</span>
                <span className="font-mono">mod@test.com / mod123</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              MCP Servers Status
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Laravel Artisan
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Laravel Auth
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                Database
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                PHP Composer
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

// Main App Component
function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <AuthRoutes />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/dashboard" replace /> : <AuthRoutes />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
