import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { colors, MIN_TOUCH } from '../theme';

type Props = {
  selected: boolean;
  onPress: () => void;
  itemName: string;
};

// Botao de coracao (RF04). O label muda e accessibilityState informa o estado (RF10).
export function FavoriteButton({ selected, onPress, itemName }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={selected ? `Remover ${itemName} dos favoritos` : `Adicionar ${itemName} aos favoritos`}
      accessibilityState={{ selected }}
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={selected ? 'heart' : 'heart-outline'} size={28} color={selected ? colors.accent : colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minWidth: MIN_TOUCH, minHeight: MIN_TOUCH, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.7 },
});
