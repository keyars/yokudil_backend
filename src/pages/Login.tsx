import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mockUsers';
import { Eye, EyeOff, Lock, Mail, Shield, User, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    const userData = mockUsers.find(u => u.role === role);
    if (userData) {
      setEmail(userData.email);
      setPassword(userData.password);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (!success) {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6CBFC4] via-[#5AB5BA] to-[#4AA5AA] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-4xl space-y-6">
        {/* Login Form Section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md mx-auto relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F25274] via-[#6CBFC4] to-[#F3E682]"></div>
          
          {/* Logo inside login box */}
          <div className="text-center mb-8">
            <div className="mx-auto w-32 h-16 mb-6 flex items-center justify-center relative">
              <img 
                src="/yogamum_valkkaiyum_logo.png" 
                alt="Yogamum Valkkaiyum Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#F25274]" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F25274] to-[#6CBFC4] bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <Sparkles className="w-5 h-5 text-[#6CBFC4]" />
            </div>
            <p className="text-gray-600">Access your yoga management dashboard</p>
          </div>
          

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F25274] focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F25274] focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#F25274] focus:ring-[#F25274] border-gray-300 rounded transition-colors"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-[#F25274] hover:text-[#F25274]/80 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#F25274] to-[#F25274]/90 hover:from-[#F25274]/90 hover:to-[#F25274] disabled:opacity-50 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Quick Role Selection Section */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/30 max-w-4xl mx-auto relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F25274]/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#6CBFC4]/10 to-transparent rounded-full blur-2xl"></div>
          
          <div className="text-center mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-[#6CBFC4]" />
              <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Quick Demo Access
              </h3>
              <Shield className="w-5 h-5 text-[#F25274]" />
            </div>
            <p className="text-sm text-gray-600">Select a role to auto-fill credentials and explore the platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <button
              type="button"
              onClick={() => handleRoleSelect('super_admin')}
              className={`group relative overflow-hidden p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedRole === 'super_admin'
                  ? 'border-[#F25274] bg-gradient-to-br from-[#F25274]/15 to-[#F25274]/5 shadow-xl'
                  : 'border-gray-200 hover:border-[#F25274] hover:shadow-lg bg-white/80 hover:bg-white'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F25274]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F25274] to-[#F25274]/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <User className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Super Admin</div>
                  <div className="text-sm text-gray-500">admin@yokudil.com</div>
                  <div className="text-xs text-gray-400 mt-1">Full system access</div>
                </div>
              </div>
              {selectedRole === 'super_admin' && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-[#F25274] rounded-full animate-pulse shadow-lg"></div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => handleRoleSelect('teacher')}
              className={`group relative overflow-hidden p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedRole === 'teacher'
                  ? 'border-[#6CBFC4] bg-gradient-to-br from-[#6CBFC4]/15 to-[#6CBFC4]/5 shadow-xl'
                  : 'border-gray-200 hover:border-[#6CBFC4] hover:shadow-lg bg-white/80 hover:bg-white'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6CBFC4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6CBFC4] to-[#6CBFC4]/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <User className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Teacher</div>
                  <div className="text-sm text-gray-500">teacher@yokudil.com</div>
                  <div className="text-xs text-gray-400 mt-1">Teaching & student management</div>
                </div>
              </div>
              {selectedRole === 'teacher' && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-[#6CBFC4] rounded-full animate-pulse shadow-lg"></div>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => handleRoleSelect('volunteer')}
              className={`group relative overflow-hidden p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedRole === 'volunteer'
                  ? 'border-[#F3E682] bg-gradient-to-br from-[#F3E682]/25 to-[#F3E682]/10 shadow-xl'
                  : 'border-gray-200 hover:border-[#F3E682] hover:shadow-lg bg-white/80 hover:bg-white'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F3E682]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F3E682] to-[#F3E682]/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <User className="text-gray-800 w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Volunteer</div>
                  <div className="text-sm text-gray-500">volunteer@yokudil.com</div>
                  <div className="text-xs text-gray-400 mt-1">Limited access for volunteers</div>
                </div>
              </div>
              {selectedRole === 'volunteer' && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-[#F3E682] rounded-full animate-pulse shadow-lg"></div>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-white/90 relative z-10">
          <p>© 2025 YoKudil. Demo Mode - Select a role above for quick access</p>
        </div>
      </div>
    </div>
  );
};

export default Login;