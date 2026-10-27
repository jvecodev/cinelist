import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { TextField } from '../components/TextField';
import { colors, spacing, typography } from '../theme';

type Props = {
  onLogin: () => void;
};

// Apenas a UI do login. A autenticacao real (cadastro, senha com hash/SecureStore,
// sessao persistida) pertence ao RF07 e substitui o onLogin.
export function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit() {
    const next: { email?: string; password?: string } = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Informe um e-mail válido.';
    if (password.length < 6) next.password = 'A senha deve ter ao menos 6 caracteres.';
    setErrors(next);
    if (Object.keys(next).length === 0) onLogin();
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.brand} accessibilityRole="header">
            CineLista
          </Text>
          <Text style={styles.subtitle}>Entre para explorar o catálogo de séries.</Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            placeholder="voce@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextField
            label="Senha"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            placeholder="Mínimo de 6 caracteres"
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
          />
          <Button title="Entrar" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, justifyContent: 'center', padding: spacing.xl, gap: spacing.xxl },
  header: { gap: spacing.sm, alignItems: 'center' },
  brand: { ...typography.title, fontSize: 32, color: colors.accent },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  form: { gap: spacing.lg },
});