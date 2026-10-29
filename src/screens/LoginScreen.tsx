import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { TextField } from '../components/TextField';
import { colors, spacing, typography } from '../theme';

export function LoginScreen() {
  const { authenticate, busy } = useAuth();
  const [register, setRegister] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  async function handleSubmit() {
    setSubmitError(null);
    const next: { email?: string; password?: string } = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Informe um e-mail válido.';
    if (password.length < 6 || password.length > 128) next.password = 'A senha deve ter entre 6 e 128 caracteres.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    try {
      await authenticate(email, password, register);
      setPassword('');
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Não foi possível entrar. Tente novamente.');
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.brand} accessibilityRole="header">
            CineLista
          </Text>
          <Text style={styles.subtitle}>{register ? 'Crie sua conta neste aparelho.' : 'Entre para explorar o catálogo de séries.'}</Text>
        </View>

        <View style={styles.form}>
          <TextField
            label="E-mail"
            editable={!busy}
            maxLength={254}
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
            editable={!busy}
            maxLength={128}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            placeholder="Mínimo de 6 caracteres"
            secureTextEntry
            autoCapitalize="none"
            autoComplete={register ? 'new-password' : 'password'}
            onSubmitEditing={handleSubmit}
            returnKeyType="go"
          />
          {!!submitError && <Text style={styles.error} accessibilityRole="alert">{submitError}</Text>}
          <Button title={register ? 'Criar conta' : 'Entrar'} onPress={handleSubmit} loading={busy} />
          <Button
            title={register ? 'Já tenho conta' : 'Criar uma conta'}
            variant="secondary"
            disabled={busy}
            onPress={() => { setRegister(!register); setErrors({}); setSubmitError(null); setPassword(''); }}
          />
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
  error: { ...typography.body, color: colors.error },
  form: { gap: spacing.lg },
});