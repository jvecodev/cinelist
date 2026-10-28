import { api } from './api';
import { Show, ShowDetails } from '../types/show';

// TVMaze pagina de 0 em diante (250 series por pagina).
// Passada a ultima pagina a API responde 404.
export async function getShows(page: number): Promise<Show[]> {
  const { data } = await api.get<Show[]>('/shows', { params: { page } });
  return data;
}

// /search/shows devolve [{ score, show }] (sem paginacao); lista vazia = sem resultados
export async function searchShows(query: string, signal?: AbortSignal): Promise<Show[]> {
  const { data } = await api.get<{ show: Show }[]>('/search/shows', { params: { q: query }, signal });
  return data.map((r) => r.show);
}

export async function getShowById(id: number, signal?: AbortSignal): Promise<ShowDetails> {
  const { data } = await api.get<ShowDetails>(`/shows/${id}`, { signal });
  return data;
}