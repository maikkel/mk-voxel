import { Group, Stack } from '@mantine/core';
import { useEditorStore } from '../store/useEditorStore';
import SafeNumberInput from './input/SafeNumberInput';
import SafeTextInput from './input/SafeTextInput';
import DimsEdit from './spriteEdit/DimsEdit';

import styles from './spriteEdit.module.scss';

export default function SpriteEdit() {
  const spriteData = useEditorStore((state) => state.spriteData);
  const setSpriteData = useEditorStore((state) => state.setSpriteData);

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
  console.log('update');
  return (
    <Stack>
      <Group gap='sm' w={'100%'}>
        <SafeTextInput
          className={styles.spriteNameInput}
          label='Sprite Name'
          value={spriteData.name}
          onChange={updateName}
          allowSpace={false}
          size={'xs'}
          w={100}
          style={{
            flex: 1,
          }}
          fw={900}
          inputSize={'lg'}
        />
        <SafeNumberInput
          label='Global Frame Time'
          value={spriteData.frameTime}
          onChange={updateFrameTime}
          min={1}
          rightSection={'ms'}
          size={'xs'}
          w={120}
        />
      </Group>
      <DimsEdit />
    </Stack>
  );
}
