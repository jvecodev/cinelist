import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, Pressable, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { ConsumedScreen } from '../screens/ConsumedScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { colors, MIN_TOUCH, spacing } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, text: colors.text, primary: colors.accent, border: colors.border },
};

// A troca de sessao desmonta as rotas anteriores, impedindo voltar ao app apos sair.
export function RootNavigator() {
  const { user, signOut, busy } = useAuth();

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerTitleStyle: { color: colors.text } }}>
        {user ? (
          <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'CineLista',
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                  <Pressable
                    onPress={() => navigation.navigate('Favorites')}
                    accessibilityRole="button"
                    accessibilityLabel="Ver favoritos"
                    hitSlop={8}
                    style={{ minWidth: MIN_TOUCH, minHeight: MIN_TOUCH, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Ionicons accessible={false} importantForAccessibility="no" name="heart" size={24} color={colors.accent} />
                  </Pressable>
                  <Pressable
                    onPress={() => navigation.navigate('Consumed')}
                    accessibilityRole="button"
                    accessibilityLabel="Ver séries assistidas e minhas notas"
                    hitSlop={8}
                    style={{ minWidth: MIN_TOUCH, minHeight: MIN_TOUCH, alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Ionicons accessible={false} importantForAccessibility="no" name="checkmark-done" size={24} color={colors.accent} />
                  </Pressable>
                  <Pressable
                    disabled={busy}
                    accessibilityState={{ disabled: busy }}
                    onPress={() => { void signOut().catch((e: Error) => Alert.alert('Sair da conta', e.message)); }}
                    accessibilityRole="button"
                    accessibilityLabel="Sair da conta"
                    hitSlop={8}
                    style={{ minWidth: MIN_TOUCH, minHeight: MIN_TOUCH, justifyContent: 'center' }}
                  >
                    <Ionicons accessible={false} importantForAccessibility="no" name="log-out-outline" size={24} color={colors.accent} />
                  </Pressable>
                </View>
              ),
            })}
          />
          <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar' }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes' }} />
          <Stack.Screen name="Consumed" component={ConsumedScreen} options={{ title: 'Assistidos' }} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}