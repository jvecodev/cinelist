import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { ErrorView } from '../components/ErrorView';
import { useGridColumns } from '../hooks/useGridColumns';
import { ItemCard } from '../components/ItemCard';
import { LoadingView } from '../components/LoadingView';
import { useFavorites } from '../contexts/FavoritesContext';
import { useShows } from '../hooks/useShows';
import { HomeScreenProps } from '../navigation/types';
import { colors, spacing, typography } from '../theme';
import { Show } from '../types/show';

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { shows, loading, refreshing, loadingMore, error, refresh, loadMore, retry } = useShows();
  const columns = useGridColumns();
  const { favorites, isFavorite } = useFavorites();

  function handlePress(show: Show) {
    navigation.navigate('Details', { id: show.id, name: show.name });
  }

  if (loading) return <LoadingView message="Carregando séries..." />;
  if (error && shows.length === 0) return <ErrorView message={error} onRetry={retry} />;

  return (
    <FlatList
      key={columns}
      style={styles.list}
      contentContainerStyle={styles.content}
      data={shows}
      keyExtractor={(item) => String(item.id)}
      numColumns={columns}
      // extraData: re-renderiza os cards quando os favoritos mudam (RF04)
      extraData={favorites}
      renderItem={({ item }) => <ItemCard columns={columns} show={item} onPress={handlePress} isFavorite={isFavorite(item.id)} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={refresh}
      initialNumToRender={8}
      windowSize={7}
      removeClippedSubviews={false}
      ListFooterComponent={
        <View style={styles.footer}>
          {loadingMore && <ActivityIndicator color={colors.accent} accessibilityLabel="Carregando mais séries" />}
          {!!error && !loadingMore && (
            <>
              <Text style={styles.footerText}>{error}</Text>
              <Button title="Tentar novamente" variant="secondary" onPress={retry} />
            </>
          )}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.sm },
  footer: { padding: spacing.lg, gap: spacing.md, alignItems: 'center' },
  footerText: { ...typography.caption, color: colors.error, textAlign: 'center' },
});