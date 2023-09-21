declare module '@env' {
  export const API_URL: string;
}

declare module '*.svg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}
