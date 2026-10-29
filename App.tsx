import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { ErrorView } from './src/components/ErrorView';
import { LoadingView } from './src/components/LoadingView';
import { ConsumedProvider, useConsumed } from './src/contexts/ConsumedContext';
import { FavoritesProvider, useFavorites } from './src/contexts/FavoritesContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';

// Segura o app ate os dados salvos serem lidos, para nao exibir
// favoritos/consumidos "zerados" enquanto o AsyncStorage carrega (RF06).
function PersistenceGate() {
  const { loading: loadingFavorites } = useFavorites();
  const { loading: loadingConsumed } = useConsumed();

  if (loadingFavorites || loadingConsumed) {
    return (
      <View style={styles.loading}>
        <LoadingView message="Carregando seus dados..." />
      </View>
    );
  }
  return <RootNavigator />;
}

function AuthGate() {
  const { user, loading, error, restore } = useAuth();
  if (loading) return <View style={styles.loading}><LoadingView message="Restaurando sessão..." /></View>;
  if (error) return <View style={styles.loading}><ErrorView message={error} onRetry={restore} /></View>;
  if (!user) return <RootNavigator />;
  return (
    <FavoritesProvider key={user.email} account={user.email}>
      <ConsumedProvider account={user.email}>
        <PersistenceGate />
      </ConsumedProvider>
    </FavoritesProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider><AuthGate /></AuthProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.background },
});
