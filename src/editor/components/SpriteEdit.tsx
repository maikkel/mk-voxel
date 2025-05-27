import { Group, Stack } from '@mantine/core';
import { useEditorStore } from '../store/useEditorStore';
import SafeNumberInput from './input/SafeNumberInput';
import SafeTextInput from './input/SafeTextInput';
import DimsEdit from './spriteEdit/DimsEdit';

import styles from './spriteEdit.module.scss';
import { APP_BORDER_STYLE } from '../utils/styles';

export default function SpriteEdit() {
  const spriteName = useEditorStore((s) => s.spriteData.name);
  const setSpriteName = useEditorStore((s) => s.setSpriteName);
  const spriteFrameTime = useEditorStore((s) => s.spriteData.frameTime);
  const setSpriteFrameTime = useEditorStore((s) => s.setSpriteFrameTime);

  return (
    <Stack p='xs' style={{ borderBottom: APP_BORDER_STYLE }}>
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
          suffix={' ms'}
          size={'xs'}
          w={120}
        />
      </Group>
      <DimsEdit />
    </Stack>
  );
}
