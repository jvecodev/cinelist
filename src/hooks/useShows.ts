import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getShows } from '../services/shows';
import { Show } from '../types/show';

type Mode = 'initial' | 'refresh' | 'more';

// Catalogo paginado: carga inicial, pull-to-refresh e proxima pagina (RF01).
// Estados loading / refreshing / loadingMore / error tratados explicitamente (RF09).
export function useShows() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const page = useRef(0);
  const hasMore = useRef(true);
  const busy = useRef(false);
  const mounted = useRef(true);

  const fetchPage = useCallback(async (target: number, mode: Mode) => {
    if (busy.current) return;
    busy.current = true;
    if (mode === 'initial') setLoading(true);
    if (mode === 'refresh') setRefreshing(true);
    if (mode === 'more') setLoadingMore(true);
    setError(null);

    try {
      const data = await getShows(target);
      if (!mounted.current) return;
      page.current = target;
      hasMore.current = data.length > 0;
      setShows((prev) => {
        if (target === 0) return data;
        const ids = new Set(prev.map((s) => s.id));
        return [...prev, ...data.filter((s) => !ids.has(s.id))];
      });
    } catch (e) {
      if (!mounted.current) return;
      // 404 depois da ultima pagina significa fim da lista, nao erro
      if (target > 0 && axios.isAxiosError(e) && e.response?.status === 404) {
        hasMore.current = false;
      } else {
        setError('Não foi possível carregar as séries. Verifique sua conexão e tente novamente.');
      }
    } finally {
      busy.current = false;
      if (mounted.current) {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    fetchPage(0, 'initial');
    return () => {
      mounted.current = false;
    };
  }, [fetchPage]);

  const refresh = useCallback(() => {
    hasMore.current = true;
    fetchPage(0, 'refresh');
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!hasMore.current || error) return;
    fetchPage(page.current + 1, 'more');
  }, [fetchPage, error]);

  const retry = useCallback(() => {
    if (shows.length === 0) fetchPage(0, 'initial');
    else fetchPage(page.current + 1, 'more');
  }, [fetchPage, shows.length]);

  return { shows, loading, refreshing, loadingMore, error, refresh, loadMore, retry };
}