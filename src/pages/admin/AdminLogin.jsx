import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Camera, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error("Firebase Login Error:", err);
      const code = err.code || 'unknown_error';
      const msg = err.message || '';
      
      if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        setError(`Invalid Email or Password (${code}). Please check credentials.`);
      } else if (code === 'auth/operation-not-allowed') {
        setError(`Email/Password login is not enabled in Firebase Console. Please enable Email/Password under Authentication > Sign-in method.`);
      } else {
        setError(`Login failed: ${msg} (${code})`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Decorative Warm Background Glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#8D9B7A]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-[#241C18]/10 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8D9B7A]/15 rounded-full mb-4 text-[#8D9B7A]">
            <Camera className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8D9B7A] font-semibold block mb-1">
            Sachin Ghongade Photo Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#241C18]">
            Admin Portal
          </h1>
          <p className="text-sm text-[#241C18]/60 mt-1">
            Sign in to manage your portfolio & website photos
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3"
          >
            <Shield className="w-5 h-5 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241C18]/80 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#241C18]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sachinghongadestudio.com"
                className="w-full pl-11 pr-4 py-3 bg-[#F8F5EF]/60 border border-[#241C18]/15 rounded-xl text-[#241C18] placeholder-[#241C18]/40 focus:outline-none focus:ring-2 focus:ring-[#8D9B7A] focus:bg-white transition-all text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#241C18]/80 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#241C18]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#F8F5EF]/60 border border-[#241C18]/15 rounded-xl text-[#241C18] placeholder-[#241C18]/40 focus:outline-none focus:ring-2 focus:ring-[#8D9B7A] focus:bg-white transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#241C18]/40 hover:text-[#241C18] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 bg-[#8D9B7A] hover:bg-[#7A8868] text-white font-medium rounded-xl shadow-lg shadow-[#8D9B7A]/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In to Admin Panel</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#241C18]/10 text-center">
          <p className="text-xs text-[#241C18]/50">
            Protected Admin Area • Sachin Ghongade Photo Studio
          </p>
        </div>
      </motion.div>
    </div>
  );
}
