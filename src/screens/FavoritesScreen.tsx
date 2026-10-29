import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useGridColumns } from '../hooks/useGridColumns';
import { ItemCard } from '../components/ItemCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { FavoritesScreenProps } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { Show } from '../types/show';

// Lista os favoritos direto do Context (RF05): ao desfavoritar em Detalhes,
// o item some daqui sem recarregar nada.
export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const columns = useGridColumns();
  const { favorites } = useFavorites();

  function handlePress(show: Show) {
    navigation.navigate('Details', { id: show.id, name: show.name });
  }

  return (
    <FlatList
      key={columns}
      style={styles.list}
      contentContainerStyle={[styles.content, favorites.length === 0 && styles.emptyContent]}
      data={favorites}
      keyExtractor={(item) => String(item.id)}
      numColumns={columns}
      renderItem={({ item }) => <ItemCard columns={columns} show={item} onPress={handlePress} isFavorite />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={56} color={colors.textMuted} accessible={false} />
          <Text style={styles.emptyTitle} accessibilityRole="header">
            Nenhum favorito ainda
          </Text>
          <Text style={styles.emptyText}>
            Toque no coração na tela de detalhes de uma série para guardá-la aqui.
          </Text>
          <Button title="Explorar catálogo" variant="secondary" onPress={() => navigation.goBack()} />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.sm },
  // flexGrow centraliza o estado vazio na tela
  emptyContent: { flexGrow: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', gap: spacing.md, padding: spacing.xl },
  emptyTitle: { ...typography.heading, color: colors.text, textAlign: 'center' },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
