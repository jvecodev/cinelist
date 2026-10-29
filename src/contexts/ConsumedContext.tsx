import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { STORAGE_KEYS } from '../services/storage';
import { Show } from '../types/show';
import { toShow } from '../utils/show';

export type ConsumedItem = {
  show: Show;
  // nota pessoal de 1 a 5 (RF07)
  rating: number;
  consumedAt: string;
};

type ConsumedContextValue = {
  consumed: ConsumedItem[];
  loading: boolean;
  getConsumed: (id: number) => ConsumedItem | undefined;
  markConsumed: (show: Show, rating: number) => void;
  removeConsumed: (id: number) => void;
};

const ConsumedContext = createContext<ConsumedContextValue | null>(null);

function clampRating(rating: number) {
  return Math.min(5, Math.max(1, Math.round(rating)));
}

// Itens "consumidos" (assistidos) persistidos localmente (RF06).
// A UI de marcar/listar consumidos fica no RF07, que usa o hook useConsumed().
export function ConsumedProvider({ children, account }: { children: ReactNode; account: string }) {
  const [consumed, setConsumed, loading] = usePersistentState<ConsumedItem[]>(`${STORAGE_KEYS.consumed}:${account}`, []);

  const byId = useMemo(() => new Map(consumed.map((c) => [c.show.id, c])), [consumed]);

  const getConsumed = useCallback((id: number) => byId.get(id), [byId]);

  // Marcar de novo so atualiza a nota, mantendo a data original
  const markConsumed = useCallback(
    (show: Show, rating: number) => {
      setConsumed((prev) => {
        const existing = prev.find((c) => c.show.id === show.id);
        if (existing) {
          return prev.map((c) => (c.show.id === show.id ? { ...c, rating: clampRating(rating) } : c));
        }
        return [{ show: toShow(show), rating: clampRating(rating), consumedAt: new Date().toISOString() }, ...prev];
      });
    },
    [setConsumed],
  );

  const removeConsumed = useCallback(
    (id: number) => setConsumed((prev) => prev.filter((c) => c.show.id !== id)),
    [setConsumed],
  );

  const value = useMemo(
    () => ({ consumed, loading, getConsumed, markConsumed, removeConsumed }),
    [consumed, loading, getConsumed, markConsumed, removeConsumed],
  );

  return <ConsumedContext.Provider value={value}>{children}</ConsumedContext.Provider>;
}

export function useConsumed() {
  const ctx = useContext(ConsumedContext);
  if (!ctx) throw new Error('useConsumed deve ser usado dentro de <ConsumedProvider>');
  return ctx;
}
