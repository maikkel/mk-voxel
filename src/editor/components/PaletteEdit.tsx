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
} from '@mantine/core';
import { IconPlus, IconTrash, IconSunLowFilled } from '@tabler/icons-react';
import type { MaterialKey, Palette } from '../../engine/types/SpriteData';

type PaletteEditorProps = {
  palette: Palette;
  onChange: (newPalette: Palette) => void;
};

export const PaletteEditor = ({ palette, onChange }: PaletteEditorProps) => {
  const keys = Object.keys(palette) as MaterialKey[];

  const updateColor = (key: MaterialKey, color: string) => {
    onChange({
      ...palette,
      [key]: { ...palette[key], color },
    });
  };

  const toggleGlow = (key: MaterialKey) => {
    onChange({
      ...palette,
      [key]: { ...palette[key], glow: !palette[key].glow },
    });
  };

  const addColor = () => {
    let newKey = `color${keys.length + 1}` as MaterialKey;
    while (palette[newKey]) {
      newKey = `color${Math.floor(Math.random() * 10000)}` as MaterialKey;
    }
    onChange({
      ...palette,
      [newKey]: { color: '#ffffff', glow: false },
    });
  };

  const removeColor = (key: MaterialKey) => {
    const updated = { ...palette };
    delete updated[key];
    onChange(updated);
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
        {keys.map((key) => (
          <Group
            key={key}
            align='center'
            wrap='nowrap'
            gap='xs'
            w='100%'
            style={{ flexWrap: 'nowrap' }}
          >
            <Text size='xs' fw={500} style={{ width: rem(64), flexShrink: 0 }}>
              {key}
            </Text>

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

            <Group gap='xs' wrap='nowrap'>
              <Tooltip label='Glow' withArrow>
                <ActionIcon
                  variant={palette[key].glow ? 'filled' : 'outline'}
                  color='blue'
                  size='sm'
                  onClick={() => toggleGlow(key)}
                >
                  <IconSunLowFilled size={14} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label='Remove color' withArrow>
                <ActionIcon variant='light' color='red' size='sm' onClick={() => removeColor(key)}>
                  <IconTrash size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        ))}
      </Stack>
    </Stack>
  );
};
