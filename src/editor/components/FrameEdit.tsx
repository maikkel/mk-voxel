import React from 'react';
import { Box, Group } from '@mantine/core';
import { APP_BORDER_STYLE } from '../utils/styles';
import ColorSelect from './frameEdit/ColorSelect';
import SliceEdit from './frameEdit/SliceEdit';
import SliceSlider from './frameEdit/SliceSlider';
import { useEditorStore } from '../store/useEditorStore';

export default function FrameEdit() {
  const sliceIndex = useEditorStore((s) => s.currentSliceIndex);
  const setSliceIndex = useEditorStore((s) => s.setCurrentSliceIndex);
  const spriteDimensions = useEditorStore((s) => s.spriteData.dimensions);

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
      <Box h='100%' w={250} style={{ borderRight: APP_BORDER_STYLE }}>
        abc
      </Box>
      <ColorSelect />
      <SliceEdit />
      <SliceSlider />
    </Group>
  );
}
