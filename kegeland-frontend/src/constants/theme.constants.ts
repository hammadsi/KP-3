import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const theme = extendTheme(
  {
    colors: {
      primary: {
        50: '#e1f5fe',
        100: '#b3e5fc',
        200: '#81d4fa',
        300: '#4fc3f7',
        400: '#29b6f6',
        500: '#03a9f4',
        600: '#039be5',
        700: '#0288d1',
        800: '#0277bd',
        900: '#01579b',
        A100: '#80d8ff',
        A200: '#40c4ff',
        A300: '#00b0ff',
        A400: '#0091ea',
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'primary',
  }),
);

export default theme;
