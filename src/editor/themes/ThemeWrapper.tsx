import { MantineProvider } from '@mantine/core';
import { useEditorStore } from '../store/useEditorStore';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useEditorStore((s) => s.currentTheme);

  return (
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      {children}
    </MantineProvider>
  );
}
