import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "briskly:activeUserTrip";

export const getActiveTripSlug = async () =>
  (await AsyncStorage.getItem(KEY))?.trim() || null;

export const setActiveTripSlug = (slug: string) =>
  AsyncStorage.setItem(KEY, slug.trim());

export const clearActiveTripSlug = () => AsyncStorage.removeItem(KEY);
