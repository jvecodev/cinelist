import { useWindowDimensions } from 'react-native';

// Uma coluna em telas estreitas ou com fonte ampliada deixa espaco para os titulos.
export function useGridColumns() {
  const { width, fontScale } = useWindowDimensions();
  return width < 360 || fontScale >= 1.3 ? 1 : 2;
}
