import { Group, Stack } from '@mantine/core';
import { useEditorStore } from '../store/useEditorStore';
import { SafeNumberInput } from './input/SafeNumberInput';
import { SafeTextInput } from './input/SafeTextInput';
import { DimsEdit } from './spriteEdit/DimsEdit';

export function SpriteEdit() {
  const spriteData = useEditorStore((state) => state.spriteData);
  const setSpriteData = useEditorStore((state) => state.setSpriteData); // still used for frameTime

  if (!spriteData) return <div>No sprite loaded</div>;

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
      <DimsEdit />
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
