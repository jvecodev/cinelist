import { StyleSheet, Text, View } from 'react-native';
import { useConsumed } from '../contexts/ConsumedContext';
import { colors, spacing, typography } from '../theme';
import { Show } from '../types/show';
import { Button } from './Button';

export function ConsumedControl({ show }: { show: Show }) {
  const { getConsumed, markConsumed, removeConsumed } = useConsumed();
  const item = getConsumed(show.id);
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Minha avaliação</Text>
      <Text style={styles.text} accessibilityLiveRegion="polite">
        {item ? `Assistida · Sua nota: ${item.rating} de 5` : 'Já assistiu? Escolha uma nota de 1 a 5 para marcar como assistida.'}
      </Text>
      <View style={styles.ratings}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            title={`${rating} ★`}
            variant={item?.rating === rating ? 'primary' : 'secondary'}
            accessibilityLabel={`Dar nota ${rating} de 5 para ${show.name}${item?.rating === rating ? ', nota atual' : ''}`}
            onPress={() => markConsumed(show, rating)}
          />
        ))}
      </View>
      {item && <Button title="Remover dos assistidos" variant="secondary" onPress={() => removeConsumed(show.id)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.md, paddingVertical: spacing.md },
  title: { ...typography.heading, color: colors.text },
  text: { ...typography.body, color: colors.textMuted },
  ratings: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
