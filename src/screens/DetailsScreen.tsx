import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ErrorView } from '../components/ErrorView';
import { ConsumedControl } from '../components/ConsumedControl';
import { FavoriteButton } from '../components/FavoriteButton';
import { LoadingView } from '../components/LoadingView';
import { useFavorites } from '../contexts/FavoritesContext';
import { useShowDetails } from '../hooks/useShowDetails';
import { DetailsScreenProps } from '../navigation/types';
import { colors, radius, spacing, typography } from '../theme';
import { stripHtml } from '../utils/html';

const STATUS_LABELS: Record<string, string> = {
  Running: 'Em exibição',
  Ended: 'Finalizada',
  'To Be Determined': 'A definir',
  'In Development': 'Em desenvolvimento',
};

function formatYear(date: string | null) {
  return date ? date.slice(0, 4) : null;
}

export function DetailsScreen({ route, navigation }: DetailsScreenProps) {
  const { id, name } = route.params;
  const { show, loading, error, retry } = useShowDetails(id);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Titulo do header: nome vindo da API (ou o recebido via params enquanto carrega)
  useEffect(() => {
    const title = show?.name ?? name;
    if (title) navigation.setOptions({ title });
  }, [show?.name, name, navigation]);

  if (loading) return <LoadingView message="Carregando detalhes..." />;
  if (error || !show) return <ErrorView message={error ?? undefined} onRetry={retry} />;

  const summary = stripHtml(show.summary);
  const network = show.network?.name ?? show.webChannel?.name;
  const runtime = show.runtime ?? show.averageRuntime;
  const years = [formatYear(show.premiered), show.status === 'Running' ? 'atual' : formatYear(show.ended)]
    .filter(Boolean)
    .join(' - ');

  const attributes: { label: string; value: string }[] = [
    { label: 'Tipo', value: show.type ?? '' },
    { label: 'Status', value: show.status ? STATUS_LABELS[show.status] ?? show.status : '' },
    { label: 'Exibição', value: years },
    { label: 'Emissora', value: network ?? '' },
    { label: 'Idioma', value: show.language ?? '' },
    { label: 'Duração', value: runtime ? `${runtime} min` : '' },
  ].filter((a) => a.value);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {show.image ? (
        <Image
          source={{ uri: show.image.original }}
          style={styles.image}
          resizeMode="cover"
          accessible
          accessibilityRole="image"
          accessibilityLabel={`Pôster de ${show.name}`}
        />
      ) : (
        <View style={[styles.image, styles.placeholder]} accessible accessibilityRole="image" accessibilityLabel={`Pôster indisponível para ${show.name}`}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}

      <View style={styles.titleRow}>
        <Text style={styles.title} accessibilityRole="header">
          {show.name}
        </Text>
        <FavoriteButton selected={isFavorite(show.id)} onPress={() => toggleFavorite(show)} itemName={show.name} />
      </View>

      {!!show.rating.average && (
        <Text style={styles.rating} accessibilityLabel={`Nota ${show.rating.average} de 10`}>
          ★ {show.rating.average.toFixed(1)}
        </Text>
      )}

      {show.genres.length > 0 && (
        <View style={styles.genres}>
          {show.genres.map((genre) => (
            <View key={genre} style={styles.chip}>
              <Text style={styles.chipText}>{genre}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.attributes}>
        {attributes.map((a) => (
          <View key={a.label} style={styles.attributeRow} accessible accessibilityLabel={`${a.label}: ${a.value}`}>
            <Text style={styles.attributeLabel}>{a.label}</Text>
            <Text style={styles.attributeValue}>{a.value}</Text>
          </View>
        ))}
      </View>

      <ConsumedControl show={show} />

      <Text style={styles.sectionTitle} accessibilityRole="header">
        Sinopse
      </Text>
      <Text style={styles.summary}>{summary || 'Sinopse não disponível.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  // aspectRatio + maxWidth: poster grande sem altura fixa
  image: { width: '100%', maxWidth: 320, aspectRatio: 210 / 295, alignSelf: 'center', borderRadius: radius.md, backgroundColor: colors.surfaceAlt },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  placeholderText: { ...typography.body, color: colors.textMuted },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { ...typography.title, color: colors.text, flex: 1 },
  rating: { ...typography.heading, color: colors.star },
  genres: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { backgroundColor: colors.surfaceAlt, borderRadius: radius.lg, paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  chipText: { ...typography.caption, color: colors.text },
  attributes: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, gap: spacing.sm },
  attributeRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  attributeLabel: { ...typography.caption, color: colors.textMuted, flex: 1 },
  attributeValue: { ...typography.caption, color: colors.text, flex: 1, textAlign: 'right' },
  sectionTitle: { ...typography.heading, color: colors.text, marginTop: spacing.sm },
  summary: { ...typography.body, color: colors.text, lineHeight: 24 },
});
