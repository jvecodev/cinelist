import axios from 'axios';
import { DependencyList, useCallback, useEffect, useState } from 'react';

const DEFAULT_ERROR = 'Não foi possível carregar os dados. Verifique sua conexão e tente novamente.';

type Options = {
  // false = nao dispara a requisicao (ex.: busca ainda sem termo)
  enabled?: boolean;
  // traduz o erro em mensagem amigavel (ex.: 404 -> "nao encontrado")
  errorMessage?: (e: unknown) => string;
};

// Estados loading / error / data explicitos para uma requisicao (RF09).
// Cancela a requisicao ao desmontar ou quando as deps mudam, evitando setState
// em tela desmontada e respostas fora de ordem.
export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList,
  { enabled = true, errorMessage }: Options = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then(setData)
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(errorMessage?.(e) ?? DEFAULT_ERROR);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
    // fetcher/errorMessage sao recriados a cada render; quem dispara sao as deps
  }, [...deps, enabled, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { data, loading, error, retry };
}
