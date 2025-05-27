import React from 'react';
import { Box } from '@mantine/core';
import { useEditorStore } from '../../store/useEditorStore';
import { APP_BORDER_STYLE } from '../../utils/styles';

import styles from './sliceSlider.module.scss';

export default function SliceSlider() {
  const sliceIndex = useEditorStore((s) => s.currentSliceIndex);
  const setSliceIndex = useEditorStore((s) => s.setCurrentSliceIndex);
  const spriteDimensions = useEditorStore((s) => s.spriteData.dimensions);

  return (
    <Box
      w={30}
      h={'100%'}
      p={'xs'}
      className={styles.sliderBox}
      style={{
        borderRight: APP_BORDER_STYLE,
      }}
    >
      <label>Y</label>
      <input
        type='range'
        min={0}
        max={spriteDimensions.y - 1}
        value={sliceIndex}
        onChange={(e) => setSliceIndex(Number(e.target.value))}
        style={{
          writingMode: 'vertical-lr',
          direction: 'rtl', // ← flips 0 to bottom
          height: '100%',
        }}
      />
      <label>{sliceIndex}</label>
    </Box>
  );
}
