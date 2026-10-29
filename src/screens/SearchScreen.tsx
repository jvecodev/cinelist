import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { ErrorView } from '../components/ErrorView';
import { ItemCard } from '../components/ItemCard';
import { LoadingView } from '../components/LoadingView';
import { TextField } from '../components/TextField';
import { useFavorites } from '../contexts/FavoritesContext';
import { useFetch } from '../hooks/useFetch';
import { SearchScreenProps } from '../navigation/types';
import { searchShows } from '../services/shows';
import { colors, spacing, typography } from '../theme';
import { Show } from '../types/show';

const NUM_COLUMNS = 2;

// Busca (RF08): o TextInput e controlado e so o botao "Buscar" (ou enviar no
// teclado) dispara a requisicao. Resultados em lista; tocar abre Detalhes.
export function SearchScreen({ navigation }: SearchScreenProps) {
  const [term, setTerm] = useState('');
  const [query, setQuery] = useState('');
  const { favorites, isFavorite } = useFavorites();
  const { data, loading, error, retry } = useFetch((signal) => searchShows(query, signal), [query], {
    enabled: query.length > 0,
    errorMessage: () => 'Não foi possível buscar as séries. Verifique sua conexão e tente novamente.',
  });

  function handleSearch() {
    const next = term.trim();
    if (next === query) retry();
    else setQuery(next);
  }

  function handlePress(show: Show) {
    navigation.navigate('Details', { id: show.id, name: show.name });
  }

  function renderContent() {
    if (!query) return <Text style={styles.message}>Digite o nome de uma série e toque em Buscar.</Text>;
    if (loading) return <LoadingView message="Buscando séries..." />;
    if (error) return <ErrorView message={error} onRetry={retry} />;
    if (!data?.length)
      return (
        <Text style={styles.message} accessibilityRole="alert">
          Nenhuma série encontrada para "{query}".
        </Text>
      );
    return (
      <FlatList
        contentContainerStyle={styles.list}
        data={data}
        keyExtractor={(item) => String(item.id)}
        numColumns={NUM_COLUMNS}
        // extraData: re-renderiza os cards quando os favoritos mudam (RF04)
        extraData={favorites}
        renderItem={({ item }) => <ItemCard show={item} onPress={handlePress} isFavorite={isFavorite(item.id)} />}
        keyboardShouldPersistTaps="handled"
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextField
          label="Buscar séries"
          value={term}
          onChangeText={setTerm}
          onSubmitEditing={handleSearch}
          placeholder="Ex.: The Office"
          returnKeyType="search"
          autoCorrect={false}
        />
        <Button title="Buscar" onPress={handleSearch} disabled={!term.trim()} />
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  form: { padding: spacing.lg, gap: spacing.md },
  list: { padding: spacing.sm },
  message: { ...typography.body, color: colors.textMuted, textAlign: 'center', padding: spacing.xl },
});
