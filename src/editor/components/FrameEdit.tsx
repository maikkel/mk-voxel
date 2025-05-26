import React from 'react';
import { Box, Group } from '@mantine/core';
import { APP_BORDER_STYLE } from '../utils/styles';
import { useEditorStore } from '../store/useEditorStore';
import CompactButton from './input/CompactButton';

export default function FrameEdit() {
  const palette = useEditorStore((s) => s.spriteData.palette);
  return (
    <Group h='100%' gap={0}>
      <Box h='100%' w={250} style={{ borderRight: APP_BORDER_STYLE }}>
        abc
      </Box>
      <Box
        p={'xs'}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column',
          height: '100%', // ← fixed height required for vertical fill
          width: 'fit-content',
          overflow: 'auto', // optional
          borderRight: APP_BORDER_STYLE,
        }}
      >
        {Object.values(palette).map((mat, i) => (
          <CompactButton
            key={i}
            size={'md'}
            color={mat.color ?? 'transparent'}
            style={{
              margin: 2,
            }}
          />
        ))}
      </Box>
    </Group>
  );
}
