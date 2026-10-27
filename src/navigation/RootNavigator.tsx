import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { colors, MIN_TOUCH, typography } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, text: colors.text, primary: colors.accent, border: colors.border },
};

// Navegacao condicional: Stack de login ou Stack do app conforme a sessao.
// TODO RF07: trocar o useState abaixo pelo AuthContext (sessao persistida).
export function RootNavigator() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerTitleStyle: { color: colors.text } }}>
        {signedIn ? (
          <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'CineLista',
              headerRight: () => (
                <Pressable
                  onPress={() => setSignedIn(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Sair da conta"
                  hitSlop={8}
                  style={{ minHeight: MIN_TOUCH, justifyContent: 'center' }}
                >
                  <Text style={{ ...typography.body, color: colors.accent }}>Sair</Text>
                </Pressable>
              ),
            }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes' }} />
          </>
        ) : (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen onLogin={() => setSignedIn(true)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}