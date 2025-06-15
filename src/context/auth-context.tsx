'use client';

import { createContext, ReactNode, useContext, useEffect, useState, useMemo } from 'react';

import { auth } from '@/utils/firebase';
import { onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

type AuthContextType = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  createAccount: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Zmiana na function declaration zamiast function expression
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Usunięcie zbędnego try/catch
  const logIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
  };

  const logOut = async () => {
    await auth.signOut();
  };

  // Usunięcie zbędnego try/catch
  const createAccount = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
  };

  // Użycie useMemo dla wartości kontekstu, aby zapobiec zmianom przy każdym renderowaniu
  const contextValue = useMemo(() => ({ user, logOut, logIn, createAccount }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthProvider };

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return ctx;
};