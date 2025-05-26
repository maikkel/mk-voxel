import {
  ActionIcon,
  Box,
  ColorInput,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconEdit, IconPlus, IconSunLowFilled, IconTrash } from '@tabler/icons-react';
import { useEditorStore } from '../store/useEditorStore';
import type { MaterialIndex } from '../../engine/types/SpriteData';
import { logError } from '../../engine/core/utils/log';
import { useState } from 'react';
import styles from './paletteEdit.module.scss';
import CompactButton from './input/CompactButton';

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
          Material Palette
        </Text>

        <CompactButton
          icon={<IconPlus size={14} />}
          tooltip={'Add Material'}
          size='md'
          onClick={addColor}
        />
      </Group>

      <Divider my={2} />

      <Stack gap='xs' w='100%'>
        {keys
          .filter((key) => key != 0)
          .map((key) => (
            <Group
              key={key}
              align='center'
              wrap='nowrap'
              gap='xs'
              w='100%'
              className={latestAddedKey === key ? styles.newItem : ''}
            >
              <Text size='xs' fw={500}>
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
                  onChangeEnd={(value) => updateColor(key, value)}
                  format='hex'
                  size='xs'
                  withEyeDropper={false}
                  w='100%'
                />
              )}

              <Group gap='xs' wrap='nowrap'>
                <CompactButton
                  icon={<IconSunLowFilled size={14} />}
                  tooltip={'Glow'}
                  variant={palette[key].glow ? 'filled' : 'outline'}
                  size='sm'
                  onClick={() => toggleGlow(key)}
                />

                <CompactButton
                  icon={<IconTrash size={14} />}
                  tooltip={'Remove color'}
                  variant='light'
                  color='red'
                  size='sm'
                  onClick={() => removeColor(key)}
                />
              </Group>
            </Group>
          ))}
      </Stack>
    </Stack>
  );
}
