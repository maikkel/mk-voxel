import { useEffect, useRef } from 'react';
import { initEditorScene } from './initEditorScene';
import { useEditorStore } from './hooks/useEditorStore';
import { AppShell, Burger, Divider, Group, Box, ScrollArea, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Split } from '@gfazioli/mantine-split-pane';
import '@gfazioli/mantine-split-pane/styles.css';
import View from './components/View';
import { SpriteEdit } from './components/SpriteEdit';
import { PaletteEditor } from './components/PaletteEdit';
import { Timeline } from './components/Timeline';

export default function EditorApp() {
  const spriteData = useEditorStore((state) => state.spriteData ?? undefined);
  const setSpriteData = useEditorStore((state) => state.setSpriteData);
  const updatePalette = useEditorStore((state) => state.updatePalette);

  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 350, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding={0}
    >
      <AppShell.Header>
        <Group h='100%' px='xs'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p={0}>
        <ScrollArea p='xs' scrollbars='y'>
          <Stack bg='var(--mantine-color-body)' align='stretch' justify='flex-start' gap='md'>
            <SpriteEdit />
            <Divider my='md' />
            {spriteData && <PaletteEditor palette={spriteData.palette} onChange={updatePalette} />}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>
      <AppShell.Main h='100vh' style={{ display: 'flex', flexDirection: 'column' }}>
        <Split
          orientation='horizontal'
          variant='dotted'
          knobSize='xs'
          size='lg'
          style={{ height: '100%', width: '100%' }}
        >
          <Split.Pane minHeight='30%' initialHeight='50%' style={{ zIndex: 1 }}>
            <View />
          </Split.Pane>
          <Split.Resizer m={0} size='md' bg='var(--app-shell-border-color)' />
          <Split.Pane grow minHeight='10%' style={{ zIndex: 2 }}>
            <Timeline />
          </Split.Pane>
        </Split>
        <Box>
          [Sprite Editor with palette color selector, vertical slider to select layers and
          dynamically sized button grid to set materials]
        </Box>
      </AppShell.Main>
      <AppShell.Footer p='md'>Footer</AppShell.Footer>
    </AppShell>
  );
}
