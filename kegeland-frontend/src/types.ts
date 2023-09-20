import { Theme } from '@chakra-ui/react';

export type CustomTheme = Theme & {
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      A100: string;
      A200: string;
      A300: string;
      A400: string;
    };
  };
};

export type ThemeMode = 'dark' | 'light';
