import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, MIN_TOUCH, radius, spacing, typography } from '../theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function TextField({ label, error, ...inputProps }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessible
        accessibilityLabel={label}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, !!error && styles.inputError]}
        {...inputProps}
      />
      {!!error && (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  label: { ...typography.caption, color: colors.textMuted },
  input: {
    minHeight: MIN_TOUCH,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: typography.body.fontSize,
  },
  inputError: { borderColor: colors.error },
  error: { ...typography.caption, color: colors.error },
});