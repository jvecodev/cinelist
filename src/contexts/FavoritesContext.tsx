import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { Show } from '../types/show';
import { toShow } from '../utils/show';

type FavoritesContextValue = {
  favorites: Show[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (show: Show) => void;
  removeFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

// Estado global dos favoritos (RF04). Guarda o resumo do item (Show) para a
// tela de Favoritos listar sem nova requisicao; mais recente primeiro.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Show[]>([]);

  const ids = useMemo(() => new Set(favorites.map((s) => s.id)), [favorites]);

  const isFavorite = useCallback((id: number) => ids.has(id), [ids]);

  const toggleFavorite = useCallback((show: Show) => {
    setFavorites((prev) =>
      prev.some((s) => s.id === show.id) ? prev.filter((s) => s.id !== show.id) : [toShow(show), ...prev],
    );
  }, []);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, toggleFavorite, removeFavorite],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>');
  return ctx;
}
