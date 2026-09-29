import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    let isMounted = true;

    // Safety fallback timeout to prevent blank screen if Firebase Auth hangs
    const timeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn("Auth initialization fallback timeout reached.");
        setLoading(false);
      }
    }, 1500);

    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        if (isMounted) {
          setCurrentUser(user);
          setLoading(false);
          clearTimeout(timeout);
        }
      },
      (error) => {
        console.error("Auth listener error:", error);
        if (isMounted) {
          setLoading(false);
          clearTimeout(timeout);
        }
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
