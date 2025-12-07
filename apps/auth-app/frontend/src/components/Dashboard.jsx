import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'badge-danger';
      case 'moderator':
        return 'badge-warning';
      default:
        return 'badge-primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Laravel Auth Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Powered by MCP Servers • Tailwind CSS
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Welcome, {user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <span className={getRoleBadgeClass(user?.role)}>
                  {user?.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="btn-danger"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          {/* Welcome Section */}
          <div className="card-elevated p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to your Dashboard
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Online</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              This is a complete Laravel authentication application built using Model Context Protocol (MCP) servers
              and styled with Tailwind CSS. You're successfully authenticated and can access protected content based on your role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Profile Card */}
            <div className="card-elevated p-6 animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Profile Information
                  </h3>
                  <p className="text-sm text-gray-500">Your account details</p>
                </div>
              </div>
              <dl className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm font-medium text-gray-500">User ID</dt>
                  <dd className="text-sm text-gray-900 font-mono">#{user?.id}</dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="text-sm text-gray-900">{user?.name}</dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd>
                    <span className={getRoleBadgeClass(user?.role)}>
                      {user?.role}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Account Statistics */}
            <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Account Statistics
                  </h3>
                  <p className="text-sm text-gray-500">Your account metrics</p>
                </div>
              </div>
              <dl className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm font-medium text-gray-500">Member since</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(user?.created_at)}
                  </dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm font-medium text-gray-500">Last updated</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(user?.updated_at)}
                  </dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm font-medium text-gray-500">Account status</dt>
                  <dd>
                    <span className="badge-success">
                      ✓ Active
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <dt className="text-sm font-medium text-gray-500">Authentication</dt>
                  <dd>
                    <span className="badge-primary">
                      🔒 JWT Token
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Features Section */}
          <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-gradient">MCP Ecosystem Features</span>
              <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:shadow-lg transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚙️</div>
                <div className="font-semibold text-gray-900 mb-1">Laravel Artisan</div>
                <div className="text-xs text-gray-600">Project Creation</div>
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Active</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📦</div>
                <div className="font-semibold text-gray-900 mb-1">PHP Composer</div>
                <div className="text-xs text-gray-600">Package Management</div>
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Active</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🗄</div>
                <div className="font-semibold text-gray-900 mb-1">Database</div>
                <div className="text-xs text-gray-600">MySQL Operations</div>
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Active</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🔐</div>
                <div className="font-semibold text-gray-900 mb-1">Authentication</div>
                <div className="text-xs text-gray-600">JWT & Roles</div>
                <div className="mt-2 text-xs text-green-600 font-medium">✓ Active</div>
              </div>
            </div>
          </div>

          {/* Role-specific content */}
          {user?.role === 'admin' && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-yellow-800">
                    👑 Admin Access Granted
                  </h3>
                  <p className="text-yellow-700 mt-1">
                    You have administrative privileges and can access all system features.
                    Use this power responsibly!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}