import { createTheme, lighten } from '@mantine/core';

function generateScale(
  base: string,
  factor: number = 0.2
): [string, string, string, string, string, string, string, string, string, string] {
  return Array.from({ length: 10 }, (_, i) => lighten(base, (1 - i / 9) * factor)) as [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
}

const darkScale = generateScale('#000000', 0.8);
darkScale[0] = '#cccccc';

const themeBase = createTheme({
  // fontFamily: 'Roboto Variable, sans-serif',
  defaultRadius: 0,
  autoContrast: false,
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

    dark: darkScale,
  },
  primaryShade: 5,
});
