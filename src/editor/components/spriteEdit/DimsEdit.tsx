import { Box, Group, Input, Text } from '@mantine/core';
import { IconCheck, IconRestore } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import SafeNumberInput from '../input/SafeNumberInput';
import CompactButton from '../input/CompactButton';

export default function DimsEdit() {
  const spriteData = useEditorStore((state) => state.spriteData);
  const resizeSprite = useEditorStore((state) => state.resizeSprite);

  const [localDims, setLocalDims] = useState(spriteData.dimensions);

  const isDirty = useMemo(
    () =>
      localDims.x !== spriteData.dimensions.x ||
      localDims.y !== spriteData.dimensions.y ||
      localDims.z !== spriteData.dimensions.z,
    [localDims, spriteData.dimensions]
  );

  const totalVoxels = localDims.x * localDims.y * localDims.z;

  return (
    <Box>
      <Input.Label size={'xs'}>
        Sprite Dimensions{isDirty && <span style={{ color: 'orange' }}> (Edits Pending)</span>}
      </Input.Label>
      <Group gap='xs'>
        <SafeNumberInput
          leftSection={'X:'}
          value={localDims.x}
          onChange={(value) => setLocalDims((d) => ({ ...d, x: value }))}
          min={1}
          max={256}
          size={'xs'}
          style={{
            flex: 1,
            outline: localDims.x !== spriteData.dimensions.x ? '1px dashed orange' : undefined,
          }}
        />
        <SafeNumberInput
          leftSection={'Y:'}
          value={localDims.y}
          onChange={(value) => setLocalDims((d) => ({ ...d, y: value }))}
          min={1}
          max={256}
          size={'xs'}
          style={{
            flex: 1,
            outline: localDims.y !== spriteData.dimensions.y ? '1px dashed orange' : undefined,
          }}
        />
        <SafeNumberInput
          leftSection={'Z:'}
          value={localDims.z}
          onChange={(value) => setLocalDims((d) => ({ ...d, z: value }))}
          min={1}
          max={256}
          size={'xs'}
          style={{
            flex: 1,
            outline: localDims.z !== spriteData.dimensions.z ? '1px dashed orange' : undefined,
          }}
        />
        <CompactButton
          tooltip='Reset'
          icon={<IconRestore size={14} />}
          size='md'
          disabled={!isDirty}
          onClick={() => setLocalDims(spriteData.dimensions)}
        />

        <CompactButton
          tooltip='Apply'
          icon={<IconCheck size={14} />}
          color='green'
          size='md'
          disabled={!isDirty}
          onClick={() => resizeSprite(localDims)}
        />
      </Group>
      <Text size='xs' c={'#999'}>
        Voxels Per Frame: <span style={{ color: isDirty ? 'orange' : 'white' }}>{totalVoxels}</span>
      </Text>
    </Box>
  );
}
