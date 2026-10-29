import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  // name e opcional: usado so para o titulo inicial do header, antes de buscar o item (RF03)
  Details: { id: number; name?: string };
  Search: undefined;
  Favorites: undefined;
  Consumed: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
export type FavoritesScreenProps = NativeStackScreenProps<RootStackParamList, 'Favorites'>;
export type ConsumedScreenProps = NativeStackScreenProps<RootStackParamList, 'Consumed'>;
