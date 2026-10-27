export type Show = {
  id: number;
  name: string;
  genres: string[];
  image: { medium: string; original: string } | null;
  rating: { average: number | null };
  summary: string | null;
};

// Resposta completa de /shows/:id (RF03)
export type ShowDetails = Show & {
  type: string | null;
  language: string | null;
  status: string | null;
  premiered: string | null;
  ended: string | null;
  runtime: number | null;
  averageRuntime: number | null;
  network: { name: string } | null;
  webChannel: { name: string } | null;
};