"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import ErrorDialog from '@/app/components/dialogs/ErrorDialog';

const AuthContext = createContext({});

// TODO: Remove these when Firestore is integrated
const TEMP_ADMIN_EMAILS = [
  'carmojallas.a12345677@umak.edu.ph', // Admin email
];

// TODO: Remove this when moving to production
const DEV_ALLOWED_EMAILS = [
  'calebjoshuaarmojallas@gmail.com', // Development testing email
];

export function AuthProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', message: '' });

  useEffect(() => {
    if (user) {
      // Check if user's email is admin
      setIsAdmin(TEMP_ADMIN_EMAILS.includes(user.email));
    }
  }, [user]);

  const showError = (title, message) => {
    setErrorMessage({ title, message });
    setErrorDialogOpen(true);
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Allow both UMAK emails and development emails
      if (!result.user.email?.endsWith('@umak.edu.ph') && 
          !DEV_ALLOWED_EMAILS.includes(result.user.email)) {
        await signOut(auth);
        showError(
          'Invalid Email Domain',
          'Please use your UMAK email address (@umak.edu.ph) to sign in.'
        );
        return;
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      showError(
        'Sign In Failed',
        'An error occurred while signing in. Please try again.'
      );
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      showError(
        'Sign Out Failed',
        'An error occurred while signing out. Please try again.'
      );
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      isAdmin,
      signInWithGoogle,
      logout
    }}>
      {children}
      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        title={errorMessage.title}
        message={errorMessage.message}
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);