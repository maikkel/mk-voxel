import {
  ActionIcon,
  Button,
  ColorInput,
  Divider,
  Group,
  Stack,
  Text,
  Tooltip,
  rem,
  TextInput,
  Box,
} from '@mantine/core';
import { IconPlus, IconTrash, IconSunLowFilled, IconEdit } from '@tabler/icons-react';
import { useEditorStore } from '../store/useEditorStore';
import type { MaterialIndex } from '../../engine/types/SpriteData';
import { logError } from '../../engine/core/utils/log';
import { useState } from 'react';
import styles from './paletteEdit.module.scss';

export default function PaletteEdit() {
  const palette = useEditorStore((s) => s.spriteData.palette);
  const updatePalette = useEditorStore((s) => s.updatePalette);

  const keys = Object.keys(palette).map(Number) as MaterialIndex[];

  const [editingKey, setEditingKey] = useState<MaterialIndex | null>(null);
  const [editingName, setEditingName] = useState('');
  const [latestAddedKey, setLatestAddedKey] = useState<MaterialIndex | null>(null);

  const updateColor = (index: MaterialIndex, color: string) => {
    updatePalette({
      ...palette,
      [index]: { ...palette[index], color },
    });
  };

  const startEditing = (key: MaterialIndex) => {
    setEditingKey(key);
    setEditingName(palette[key].name ?? '');
  };

  const saveNameEdit = () => {
    if (editingKey !== null) {
      updatePalette({
        ...palette,
        [editingKey]: {
          ...palette[editingKey],
          name: editingName.trim(),
        },
      });
    }
    setEditingKey(null);
  };

  const toggleGlow = (index: MaterialIndex) => {
    updatePalette({
      ...palette,
      [index]: { ...palette[index], glow: !palette[index].glow },
    });
  };

  const addColor = () => {
    const maxColors = 256;
    const used = new Set(keys);

    let newKey: MaterialIndex | undefined = undefined;
    for (let i = 1; i < maxColors; i++) {
      if (!used.has(i)) {
        newKey = i;
        break;
      }
    }

    if (newKey === undefined) {
      logError('Palette full (256 colors max)');
      return;
    }

    updatePalette({
      ...palette,
      [newKey]: { color: '#ffffff', glow: false, name: '' },
    });
    setLatestAddedKey(newKey);
  };

  const removeColor = (key: MaterialIndex) => {
    const updated = { ...palette };
    delete updated[key];
    updatePalette(updated);
  };

  return (
    <Stack gap='xs' w='100%'>
      <Group justify='space-between'>
        <Text fw={600} size='sm'>
          Palette Editor
        </Text>
        <Button size='xs' leftSection={<IconPlus size={14} />} onClick={addColor}>
          Add Color
        </Button>
      </Group>

      <Divider my={2} />

      <Stack gap='sm' w='100%'>
        {keys
          .filter((key) => key != 0)
          .map((key) => (
            <Group
              key={key}
              align='center'
              wrap='nowrap'
              gap='xs'
              w='100%'
              style={{ flexWrap: 'nowrap' }}
              className={latestAddedKey === key ? styles.newItem : ''}
            >
              <Text size='xs' fw={500} style={{ width: rem(12), flexShrink: 0 }}>
                {key}:
              </Text>

              <Box w={200}>
                {editingKey === key ? (
                  <TextInput
                    value={editingName}
                    onChange={(e) => setEditingName(e.currentTarget.value)}
                    onBlur={saveNameEdit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveNameEdit();
                      if (e.key === 'Escape') setEditingKey(null);
                    }}
                    size='xs'
                    autoFocus
                    w={'100%'}
                  />
                ) : (
                  <Group gap={4} w={'100%'}>
                    <Text
                      size='xs'
                      style={{
                        flex: 1,
                      }}
                    >
                      {palette[key].name ?? ''}
                    </Text>
                    <Tooltip label='Edit name' withArrow>
                      <ActionIcon variant='subtle' size='xs' onClick={() => startEditing(key)}>
                        <IconEdit size={12} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                )}
              </Box>

              {palette[key].color != null && (
                <ColorInput
                  value={palette[key].color}
                  onChangeEnd={(value) => updateColor(key, value)} // ← only fires when selection ends
                  format='hex'
                  size='xs'
                  withEyeDropper={false}
                  w='100%'
                  styles={{
                    input: {
                      width: '100%',
                      minWidth: rem(100),
                      fontSize: rem(12),
                      flexGrow: 1,
                    },
                  }}
                />
              )}

              <Group gap='xs' wrap='nowrap'>
                <Tooltip label='Glow' withArrow>
                  <ActionIcon
                    variant={palette[key].glow ? 'filled' : 'outline'}
                    size='sm'
                    onClick={() => toggleGlow(key)}
                  >
                    <IconSunLowFilled size={14} />
                  </ActionIcon>
                </Tooltip>

                <Tooltip label='Remove color' withArrow>
                  <ActionIcon
                    variant='light'
                    color='red'
                    size='sm'
                    onClick={() => removeColor(key)}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
          ))}
      </Stack>
    </Stack>
  );
}
