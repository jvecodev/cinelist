import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

export function LoadingView({ message = 'Carregando...' }: { message?: string }) {
  return (
    <View style={styles.container} accessible accessibilityLabel={message} accessibilityRole="progressbar" accessibilityState={{ busy: true }} accessibilityLiveRegion="polite">
      <ActivityIndicator accessible={false} size="large" color={colors.accent} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, padding: spacing.xl },
  text: { ...typography.body, color: colors.textMuted },
});