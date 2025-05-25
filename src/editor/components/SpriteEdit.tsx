import { Group, Stack } from '@mantine/core';
import { useEditorStore } from '../store/useEditorStore';
import SafeNumberInput from './input/SafeNumberInput';
import SafeTextInput from './input/SafeTextInput';
import DimsEdit from './spriteEdit/DimsEdit';

import styles from './spriteEdit.module.scss';

export default function SpriteEdit() {
  const spriteName = useEditorStore((s) => s.spriteData.name);
  const setSpriteName = useEditorStore((s) => s.setSpriteName);
  const spriteFrameTime = useEditorStore((s) => s.spriteData.frameTime);
  const setSpriteFrameTime = useEditorStore((s) => s.setSpriteFrameTime);

  return (
    <Stack>
      <Group gap='sm' w={'100%'}>
        <SafeTextInput
          className={styles.spriteNameInput}
          label='Sprite Name'
          value={spriteName}
          onChange={setSpriteName}
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
          value={spriteFrameTime}
          onChange={setSpriteFrameTime}
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
