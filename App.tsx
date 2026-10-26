import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from './src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CineLista</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  title: { ...typography.title, color: colors.text },
});