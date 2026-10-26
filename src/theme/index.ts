// Design system do CineLista. Documentacao: docs/design-system.md
export const colors = {
  background: '#0F1115',
  surface: '#1A1D24',
  surfaceAlt: '#262B35',
  border: '#343A47',
  text: '#F2F4F8',
  textMuted: '#A9B1BF',
  primary: '#D81F2A',
  primaryText: '#FFFFFF',
  accent: '#FF4B55',
  star: '#FFC857',
  error: '#FF8A8A',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;

export const radius = { sm: 6, md: 10, lg: 16 } as const;

export const typography = {
  title: { fontSize: 24, fontWeight: '700' as const },
  heading: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 14, fontWeight: '400' as const },
} as const;

// Area de toque minima recomendada (RF10)
export const MIN_TOUCH = 44;