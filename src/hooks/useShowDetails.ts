import axios from 'axios';
import { getShowById } from '../services/shows';
import { useFetch } from './useFetch';

function detailsError(e: unknown) {
  return axios.isAxiosError(e) && e.response?.status === 404
    ? 'Esta série não foi encontrada.'
    : 'Não foi possível carregar os detalhes. Verifique sua conexão e tente novamente.';
}

// Busca o item pelo id (RF03) com loading/error/retry do useFetch (RF09).
export function useShowDetails(id: number) {
  const { data: show, loading, error, retry } = useFetch((signal) => getShowById(id, signal), [id], {
    errorMessage: detailsError,
  });
  return { show, loading, error, retry };
}
