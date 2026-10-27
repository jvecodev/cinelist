import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DetailsScreenProps } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

// RF02: recebe o id via route.params e define o titulo do header dinamicamente.
// TODO RF03: buscar o item completo pelo id (Axios) e exibir imagem e atributos.
export function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { id, name } = route.params;

  useEffect(() => {
    if (name) navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes da série #{id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  text: { ...typography.body, color: colors.textMuted },
});