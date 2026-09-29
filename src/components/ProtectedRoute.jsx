import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5EF] text-[#241C18]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#8D9B7A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-[#241C18]/70">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
