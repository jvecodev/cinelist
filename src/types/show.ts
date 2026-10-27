export type Show = {
  id: number;
  name: string;
  genres: string[];
  image: { medium: string; original: string } | null;
  rating: { average: number | null };
  summary: string | null;
};