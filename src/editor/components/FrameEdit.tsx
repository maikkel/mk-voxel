import React from 'react';
import { Box, Group, Input, Stack, Text } from '@mantine/core';
import { APP_BORDER_STYLE } from '../utils/styles';
import MaterialSelect from './frameEdit/MaterialSelect';
import SliceEdit from './frameEdit/SliceEdit';
import SliceSlider from './frameEdit/SliceSlider';
import { useEditorStore } from '../store/useEditorStore';
import SafeNumberInput from './input/SafeNumberInput';
import CompactButton from './input/CompactButton';

export default function FrameEdit() {
  const sliceIndex = useEditorStore((s) => s.currentSliceIndex);
  const setSliceIndex = useEditorStore((s) => s.setCurrentSliceIndex);
  const spriteDimensions = useEditorStore((s) => s.spriteData.dimensions);
  const animationKey = useEditorStore((s) => s.currentAnimationKey);
  const frameIndex = useEditorStore((s) => s.currentFrameIndex);
  const spriteFrameTime = useEditorStore(
    (s) => s.spriteData.animations[animationKey].frames[frameIndex].time
  );
  const setSpriteFrameTime = useEditorStore((s) => s.setFrameTime);

  return (
    <Group
      h='100%'
      gap={0}
      preventGrowOverflow={true}
      onWheel={(e) => {
        const delta = -Math.sign(e.deltaY); // 1 = scroll down, -1 = scroll up
        const next = Math.max(0, Math.min(spriteDimensions.y - 1, sliceIndex + delta));

        if (next !== sliceIndex) {
          setSliceIndex(next);
        }
      }}
    >
      <Box h='100%' p='xs' style={{ borderRight: APP_BORDER_STYLE }}>
        <Stack>
          <SafeNumberInput
            label='Frame Time'
            description='overrides the global Frame Time'
            value={spriteFrameTime}
            onChange={(value) => setSpriteFrameTime(animationKey, frameIndex, value)}
            min={1}
            suffix={' ms'}
            size={'xs'}
            __clearable={true}
          />
          <Box>
            <Input.Label size={'xs'}>Nudge Frame</Input.Label>
            <Group gap={2}>
              <Box>
                <CompactButton content={<Text size={'xs'}>-X</Text>} size={'md'} />
              </Box>
              <Stack gap={2}>
                <CompactButton content={<Text size={'xs'}>+Z</Text>} size={'md'} />
                <CompactButton content={<Text size={'xs'}>-Z</Text>} size={'md'} />
              </Stack>
              <Box>
                <CompactButton content={<Text size={'xs'}>+X</Text>} size={'md'} />
              </Box>
              <Stack pl='xs' gap={2}>
                <CompactButton content={<Text size={'xs'}>+Y</Text>} size={'md'} />
                <CompactButton content={<Text size={'xs'}>-Y</Text>} size={'md'} />
              </Stack>
            </Group>
          </Box>
        </Stack>
      </Box>
      <MaterialSelect />
      <SliceEdit />
      <SliceSlider />
    </Group>
  );
}
