import React, { useState } from 'react';
import { APP_BORDER_STYLE } from '../../utils/styles';
import { Box, Group, Input, SegmentedControl, Stack, Text } from '@mantine/core';
import SafeNumberInput from '../input/SafeNumberInput';
import CompactButton from '../input/CompactButton';
import { useEditorStore } from '../../store/useEditorStore';

export default function FrameTools() {
  const [nudgeTarget, setNudgeTarget] = useState<'Frame' | 'Animation'>('Frame');

  const animationKey = useEditorStore((s) => s.currentAnimationKey);
  const frameIndex = useEditorStore((s) => s.currentFrameIndex);
  const frame = useEditorStore((s) => s.spriteData.animations[animationKey].frames[frameIndex]);

  const spriteFrameTime = useEditorStore(
    (s) => s.spriteData.animations[animationKey].frames[frameIndex].time
  );
  const setSpriteFrameTime = useEditorStore((s) => s.setFrameTime);

  const nudgeFrame = useEditorStore((s) => s.nudgeFrame);
  const nudgeAnimation = useEditorStore((s) => s.nudgeAnimation);

  const handleNudge = (dx: number, dy: number, dz: number) => {
    if (nudgeTarget === 'Frame') {
      nudgeFrame(frame, dx, dy, dz);
    } else {
      nudgeAnimation(animationKey, dx, dy, dz);
    }
  };

  return (
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
          <Input.Label size={'xs'}>
            Nudge{' '}
            <SegmentedControl
              size='xs'
              data={['Frame', 'Animation']}
              value={nudgeTarget}
              onChange={(val) => setNudgeTarget(val as 'Frame' | 'Animation')}
              color='var(--mantine-primary-color-filled)'
            />
          </Input.Label>
          <Group gap={2} pt={'xs'}>
            <Box>
              <CompactButton
                content={<Text size={'xs'}>-X</Text>}
                size={'md'}
                onClick={() => handleNudge(-1, 0, 0)}
              />
            </Box>
            <Stack gap={2}>
              <CompactButton
                content={<Text size={'xs'}>-Z</Text>}
                size={'md'}
                onClick={() => handleNudge(0, 0, -1)}
              />
              <CompactButton
                content={<Text size={'xs'}>+Z</Text>}
                size={'md'}
                onClick={() => handleNudge(0, 0, 1)}
              />
            </Stack>
            <Box>
              <CompactButton
                content={<Text size={'xs'}>+X</Text>}
                size={'md'}
                onClick={() => handleNudge(1, 0, 0)}
              />
            </Box>
            <Stack pl='xs' gap={2}>
              <CompactButton
                content={<Text size={'xs'}>+Y</Text>}
                size={'md'}
                onClick={() => handleNudge(0, 1, 0)}
              />
              <CompactButton
                content={<Text size={'xs'}>-Y</Text>}
                size={'md'}
                onClick={() => handleNudge(0, -1, 0)}
              />
            </Stack>
          </Group>
        </Box>
      </Stack>
    </Box>
  );
}
