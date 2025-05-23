import React from 'react';
import { AppShell, Box, Burger, Group, ScrollArea, Stack } from '@mantine/core';
import { useDebouncedValue, useDisclosure, useViewportSize } from '@mantine/hooks';
import '@gfazioli/mantine-split-pane/styles.css';
import Header from './components/Header';
import SpriteEdit from './components/SpriteEdit';
import PaletteEdit from './components/PaletteEdit';
import { Split } from '@gfazioli/mantine-split-pane';
import View from './components/View';
import { APP_BORDER_STYLE } from './utils/styles';
import FrameEdit from './components/FrameEdit';
import { Timeline } from './components/Timeline';
import { useEditorStore } from './store/useEditorStore';

export default function EditorApp() {
  const [opened, { toggle }] = useDisclosure();

  const layout = useEditorStore((s) => s.layout);

  const { width, height } = useViewportSize();
  const [debouncedAspect] = useDebouncedValue(width / height, 100);
  const isWide = debouncedAspect > 1.7;
  const splitOrientation = layout === 'auto' ? (isWide ? 'vertical' : 'horizontal') : layout;

  return (
    <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{ width: 350, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
        padding={0}
      >
        <AppShell.Header>
          <Group h='100%' px='xs'>
            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
            <Header />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p={0}>
          <ScrollArea p='xs' scrollbars='y'>
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
            <Split.Pane grow minHeight='10%'>
              <Stack gap={0} h='100%'>
                <Box style={{ flexGrow: 1, minHeight: 0 }}>
                  <Group h='100%'>
                    <Box h='100%' w={250} style={{ borderRight: APP_BORDER_STYLE }}>
                      <FrameEdit />
                    </Box>
                    <Box h='100%'>b</Box>
                  </Group>
                </Box>
              </Stack>
            </Split.Pane>
          </Split>

          <Box p={0} style={{ borderTop: APP_BORDER_STYLE }}>
            <Timeline />
          </Box>
        </AppShell.Main>
        <AppShell.Footer p='md'>Footer</AppShell.Footer>
      </AppShell>
    </Box>
  );
}
