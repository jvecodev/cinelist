import { Show } from '../types/show';

// Reduz ShowDetails (ou qualquer Show) aos campos do card. Evita guardar
// no estado global/armazenamento a resposta completa de /shows/:id.
export function toShow({ id, name, genres, image, rating, summary }: Show): Show {
  return { id, name, genres, image, rating, summary };
}
