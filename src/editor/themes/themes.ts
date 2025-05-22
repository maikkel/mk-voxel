import { createTheme } from '@mantine/core';

const themeBase = createTheme({
  // fontFamily: 'Roboto Variable, sans-serif',
  defaultRadius: 0,
  autoContrast: true,
});

export const themeBlue = createTheme({
  ...themeBase,
  primaryColor: 'blue',
  primaryShade: 5,
});

export const themeBlack = createTheme({
  ...themeBase,
  primaryColor: 'black',
  colors: {
    black: [
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
      '#000000',
    ],
  },
  primaryShade: 5,
});
