import React from 'react';
import { Group } from '@mantine/core';
import MaterialSelect from './frameEdit/MaterialSelect';
import SliceEdit from './frameEdit/SliceEdit';
import SliceSlider from './frameEdit/SliceSlider';
import { useEditorStore } from '../store/useEditorStore';
import FrameTools from './frameEdit/FrameTools';

export default function FrameEdit() {
  const sliceIndex = useEditorStore((s) => s.currentSliceIndex);
  const setSliceIndex = useEditorStore((s) => s.setCurrentSliceIndex);
  const spriteDimensions = useEditorStore((s) => s.spriteData.dimensions);
  const aspect = useEditorStore((s) => s.aspect);

  return aspect === 'normal' ? (
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
      <FrameTools />
      <MaterialSelect />
      <SliceEdit />
      <SliceSlider />
    </Group>
  ) : (
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
      <FrameTools />
      <MaterialSelect />
      <SliceEdit />
      <SliceSlider />
    </Group>
  );
}
