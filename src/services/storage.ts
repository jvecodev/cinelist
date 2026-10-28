import AsyncStorage from '@react-native-async-storage/async-storage';

// Persistencia local (RF06). Prefixo evita colisao com outras chaves do AsyncStorage.
export const STORAGE_KEYS = {
  favorites: '@cinelista/favorites',
  consumed: '@cinelista/consumed',
} as const;

// Dado ausente ou corrompido volta para o fallback em vez de quebrar o app.
export async function loadJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (e) {
    console.warn(`Falha ao ler ${key} do armazenamento local`, e);
    return fallback;
  }
}

export async function saveJSON<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Falha ao salvar ${key} no armazenamento local`, e);
  }
}
