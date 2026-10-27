import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Button } from './Button';

type Props = {
  message?: string;
  onRetry: () => void;
};

export function ErrorView({ message = 'Não foi possível carregar os dados. Verifique sua conexão.', onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="alert">
        Ops, algo deu errado
      </Text>
      <Text style={styles.message}>{message}</Text>
      <Button title="Tentar novamente" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.xl },
  title: { ...typography.heading, color: colors.text, textAlign: 'center' },
  message: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});