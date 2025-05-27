import React from 'react';
import { APP_BORDER_STYLE } from '../../utils/styles';
import CompactButton from '../input/CompactButton';
import { Box } from '@mantine/core';
import { useEditorStore } from '../../store/useEditorStore';

export default function ColorSelect() {
  const palette = useEditorStore((s) => s.spriteData.palette);

  return (
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
  );
}
