import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthError, AuthUser, createLocalAuth } from '../services/localAuth';

const auth = createLocalAuth(SecureStore);
type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  busy: boolean;
  error: string | null;
  restore: () => Promise<void>;
  authenticate: (email: string, password: string, register: boolean) => Promise<void>;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pending = useRef(false);

  const restore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!(await SecureStore.isAvailableAsync())) throw new Error('SecureStore indisponível');
      setUser(await auth.restore());
    } catch {
      setError('Não foi possível abrir o armazenamento seguro. Tente novamente no Android ou iOS.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void restore(); }, [restore]);

  const authenticate = useCallback(async (email: string, password: string, register: boolean) => {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    try {
      setUser(await auth.authenticate(email, password, register));
    } catch (e) {
      throw new Error(e instanceof AuthError ? e.message : 'Não foi possível salvar a sessão. Tente novamente.');
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    try {
      await auth.signOut();
      setUser(null);
    } catch {
      throw new Error('Não foi possível encerrar a sessão. Tente novamente.');
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }, []);

  const value = useMemo(() => ({ user, loading, busy, error, restore, authenticate, signOut }), [user, loading, busy, error, restore, authenticate, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return context;
}
