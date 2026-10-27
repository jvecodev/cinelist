import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { getShowById } from '../services/shows';
import { ShowDetails } from '../types/show';

// Busca o item pelo id. Cancela a requisicao ao desmontar ou trocar de id,
// evitando setState em tela desmontada e respostas fora de ordem.
export function useShowDetails(id: number) {
  const [show, setShow] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    getShowById(id, controller.signal)
      .then(setShow)
      .catch((e) => {
        if (axios.isCancel(e)) return;
        const notFound = axios.isAxiosError(e) && e.response?.status === 404;
        setError(
          notFound
            ? 'Esta série não foi encontrada.'
            : 'Não foi possível carregar os detalhes. Verifique sua conexão e tente novamente.',
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { show, loading, error, retry };
}