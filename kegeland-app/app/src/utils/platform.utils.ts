import {Platform} from 'react-native';

/**
 * Checks if the current platform is android
 * @returns true if platform is Android
 */
export const isAndroid = () => Platform.OS === 'android';

/**
 * Transforms a uuid-string to uppercase if platform is not "Android"
 * else, convert to lowercase
 * @param id the id to transform
 */
export const transformId = (id: string) =>
  isAndroid() ? id.toLowerCase() : id.toUpperCase();
