import { Box, Group, Input, Stack } from '@mantine/core';
import { useEditorStore } from '../hooks/useEditorStore';
import { type Dimensions } from '../../engine/types/SpriteData';
import { SafeNumberInput } from './input/SafeNumberInput';
import { SafeTextInput } from './input/SafeTextInput';

export function SpriteEdit() {
  const spriteData = useEditorStore((state) => state.spriteData);
  const resizeSprite = useEditorStore((state) => state.resizeSprite);
  const setSpriteData = useEditorStore((state) => state.setSpriteData); // still used for frameTime

  if (!spriteData) return <div>No sprite loaded</div>;

  const updateDimension = (axis: 'x' | 'y' | 'z', value: number) => {
    if (value > 256) return;
    if (value < 1) return;
    const newDims: Dimensions = {
      ...spriteData.dimensions,
      [axis]: value as number,
    };
    if (newDims.x * newDims.y * newDims.z > 256 * 256 * 256) return;
    resizeSprite(newDims); // 🔁 store call
  };

  const updateName = (value: string) => {
    if (value === '') return;
    setSpriteData({
      ...spriteData,
      name: value,
    });
  };

  const updateFrameTime = (value: number) => {
    setSpriteData({
      ...spriteData,
      frameTime: value,
    });
  };

  return (
    <Stack>
      <Group grow gap='sm'>
        <SafeTextInput
          label='Sprite Name'
          value={spriteData.name}
          onChange={updateName}
          allowSpace={false}
          size={'xs'}
        />
      </Group>
      <Box>
        <Input.Label size={'xs'}>Sprite Dimensions</Input.Label>
        <Group grow gap='sm'>
          <SafeNumberInput
            leftSection={'X:'}
            value={spriteData.dimensions.x}
            onChange={(value) => updateDimension('x', value)}
            min={1}
            max={256}
            size={'xs'}
          />
          <SafeNumberInput
            leftSection={'Y:'}
            value={spriteData.dimensions.y}
            onChange={(value) => updateDimension('y', value)}
            min={1}
            max={256}
            size={'xs'}
          />
          <SafeNumberInput
            leftSection={'Z:'}
            value={spriteData.dimensions.z}
            onChange={(value) => updateDimension('z', value)}
            min={1}
            max={256}
            size={'xs'}
          />
        </Group>
      </Box>

      <SafeNumberInput
        label='Global Frame Time'
        value={spriteData.frameTime}
        onChange={updateFrameTime}
        min={1}
        rightSection={'ms'}
        size={'xs'}
      />
    </Stack>
  );
}
