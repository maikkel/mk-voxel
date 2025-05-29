import { MantineProvider } from '@mantine/core';
import { useEditorStore } from '../store/useEditorStore';
import { themeBlack, themeBlue, themeGrey } from './themes';

const themeMap = {
  blue: themeBlue,
  grey: themeGrey,
  black: themeBlack,
};

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const themeName = useEditorStore((s) => s.themeName);
  const theme = themeMap[themeName]; // ✅ recomputed after hydration

  return (
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      {children}
    </MantineProvider>
  );
}
