import React from 'react';
import { AppShell, Box, Burger, Group, ScrollArea, Stack } from '@mantine/core';
import { useDebouncedValue, useDisclosure, useViewportSize } from '@mantine/hooks';
import '@gfazioli/mantine-split-pane/styles.css';
import Header from './components/Header';
import SpriteEdit from './components/SpriteEdit';
import PaletteEdit from './components/PaletteEdit';
import { Split } from '@gfazioli/mantine-split-pane';
import View from './components/View';
import { APP_BORDER_STYLE_WIDE } from './utils/styles';
import FrameEdit from './components/FrameEdit';
import { Timeline } from './components/Timeline';
import { useEditorStore } from './store/useEditorStore';

export default function EditorApp() {
  const [opened, { toggle }] = useDisclosure();

  const layout = useEditorStore((s) => s.layout);
  const setAspect = useEditorStore((s) => s.setAspect);

  const { width, height } = useViewportSize();
  const [debouncedAspect] = useDebouncedValue(width / height, 100);
  const isWide = debouncedAspect > 1.7;
  const splitOrientation = layout === 'auto' ? (isWide ? 'vertical' : 'horizontal') : layout;

  setAspect(splitOrientation === 'vertical' ? 'wide' : 'normal');

  return (
    <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{ width: 400, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
        padding={0}
      >
        <AppShell.Header style={{ borderBottom: APP_BORDER_STYLE_WIDE }}>
          <Group h='100%' px='xs'>
            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
            <Header />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p={0} style={{ borderRight: APP_BORDER_STYLE_WIDE }}>
          <ScrollArea p={0} scrollbars='y'>
            <Stack bg='var(--mantine-color-body)' align='stretch' justify='flex-start' gap='md'>
              <SpriteEdit />
              <PaletteEdit />
            </Stack>
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Split
            orientation={splitOrientation}
            variant='dotted'
            knobSize='xs'
            size='lg'
            style={{ flex: 1, minHeight: 0 }}
          >
            <Split.Pane
              minHeight='30%'
              initialHeight='50%'
              minWidth='30%'
              initialWidth='50%'
              style={{ zIndex: 1 }}
            >
              <View />
            </Split.Pane>
            <Split.Resizer m={0} size='md' bg='var(--app-shell-border-color)' />
            <Split.Pane grow minHeight='300px' minWidth='30%'>
              <FrameEdit />
            </Split.Pane>
          </Split>

          <Box p={0} style={{ borderTop: APP_BORDER_STYLE_WIDE }}>
            <Timeline />
          </Box>
        </AppShell.Main>
        <AppShell.Footer p='md' style={{ borderTop: APP_BORDER_STYLE_WIDE }}>
          Footer
        </AppShell.Footer>
      </AppShell>
    </Box>
  );
}
