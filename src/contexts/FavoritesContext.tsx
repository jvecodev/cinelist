import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { STORAGE_KEYS } from '../services/storage';
import { Show } from '../types/show';
import { toShow } from '../utils/show';

type FavoritesContextValue = {
  favorites: Show[];
  // true enquanto le o AsyncStorage (RF06)
  loading: boolean;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (show: Show) => void;
  removeFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// Estado global dos favoritos (RF04). Guarda o resumo do item (Show) para a
// tela de Favoritos listar sem nova requisicao; mais recente primeiro.
// Persistido no AsyncStorage entre reinicios (RF06).
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites, loading] = usePersistentState<Show[]>(STORAGE_KEYS.favorites, []);

  const ids = useMemo(() => new Set(favorites.map((s) => s.id)), [favorites]);

  const isFavorite = useCallback((id: number) => ids.has(id), [ids]);

  const toggleFavorite = useCallback((show: Show) => {
    setFavorites((prev) =>
      prev.some((s) => s.id === show.id) ? prev.filter((s) => s.id !== show.id) : [toShow(show), ...prev],
    );
  }, [setFavorites]);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((s) => s.id !== id));
  }, [setFavorites]);

  const value = useMemo(
    () => ({ favorites, loading, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, loading, isFavorite, toggleFavorite, removeFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>');
  return ctx;
}
