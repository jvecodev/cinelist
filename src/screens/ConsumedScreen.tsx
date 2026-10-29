import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useConsumed } from '../contexts/ConsumedContext';
import { ConsumedScreenProps } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

export function ConsumedScreen({ navigation }: ConsumedScreenProps) {
  const { consumed, removeConsumed } = useConsumed();
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={consumed}
      keyExtractor={(item) => String(item.show.id)}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title} accessibilityRole="header">{item.show.name}</Text>
          <Text style={styles.text}>Sua nota: {item.rating} de 5</Text>
          <Button title="Ver detalhes e avaliar" accessibilityLabel={`Ver detalhes e alterar a nota de ${item.show.name}`} variant="secondary" onPress={() => navigation.navigate('Details', { id: item.show.id, name: item.show.name })} />
          <Button title="Remover dos assistidos" accessibilityLabel={`Remover ${item.show.name} dos assistidos`} variant="secondary" onPress={() => removeConsumed(item.show.id)} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.item}>
          <Text style={styles.title} accessibilityRole="header">Nenhuma série assistida ainda</Text>
          <Text style={styles.text}>Abra os detalhes de uma série e dê uma nota de 1 a 5 para salvá-la aqui.</Text>
          <Button title="Explorar catálogo" onPress={() => navigation.navigate('Home')} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg },
  item: { padding: spacing.lg, backgroundColor: colors.surface, gap: spacing.md },
  title: { ...typography.heading, color: colors.text },
  text: { ...typography.body, color: colors.textMuted },
});
