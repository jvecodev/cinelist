import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';
import { Show } from '../types/show';

type Props = {
  show: Show;
  onPress: (show: Show) => void;
};

export function ItemCard({ show, onPress }: Props) {
  const rating = show.rating.average;
  const label = rating ? `${show.name}, nota ${rating}` : show.name;

  return (
    <Pressable
      onPress={() => onPress(show)}
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Abre os detalhes da série"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {show.image ? (
        <Image source={{ uri: show.image.medium }} style={styles.image} accessible={false} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.placeholder]} accessible={false}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {show.name}
        </Text>
        {!!rating && <Text style={styles.rating}>★ {rating.toFixed(1)}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.85 },
  // aspectRatio evita altura fixa e mantem a grade estavel (proporcao do poster TVMaze)
  image: { width: '100%', aspectRatio: 210 / 295, backgroundColor: colors.surfaceAlt },
  placeholder: { alignItems: 'center', justifyContent: 'center', padding: spacing.sm },
  placeholderText: { ...typography.caption, color: colors.textMuted, textAlign: 'center' },
  info: { padding: spacing.sm, gap: spacing.xs },
  name: { ...typography.caption, fontWeight: '700', color: colors.text },
  rating: { ...typography.caption, color: colors.star },
});