import React, { useRef } from 'react';
import styles from '../frameEdit.module.scss';
import { Box } from '@mantine/core';
import { useEditorStore } from '../../store/useEditorStore';
import { useAspectFit } from '../../hooks/useAspectFit';

export default function SliceEdit() {
  const palette = useEditorStore((s) => s.spriteData.palette);
  const spriteDimensions = useEditorStore((s) => s.spriteData.dimensions);
  const animationKey = useEditorStore((s) => s.currentAnimationKey);
  const frameIndex = useEditorStore((s) => s.currentFrameIndex);
  const sliceIndex = useEditorStore((s) => s.currentSliceIndex);
  const frame = useEditorStore((s) => s.spriteData.animations[animationKey].frames[frameIndex]);

  const gridRef = useRef<HTMLDivElement>(null);
  const aspectRatio = spriteDimensions.x / spriteDimensions.z;
  useAspectFit(gridRef, aspectRatio);

  return (
    <Box className={styles.sliceGrid}>
      <Box
        className={styles.gridContainer}
        ref={gridRef}
        style={{
          ['--cols' as never]: spriteDimensions.x,
          ['--rows' as never]: spriteDimensions.z,
        }}
      >
        {Array.from({ length: spriteDimensions.x * spriteDimensions.z }).map((_, i) => {
          const x = i % spriteDimensions.x;
          const z = Math.floor(i / spriteDimensions.x);
          const voxelIndex =
            x + sliceIndex * spriteDimensions.x + z * spriteDimensions.x * spriteDimensions.y;
          const materialIndex = frame.voxels[voxelIndex];
          const color =
            materialIndex === 0
              ? `repeating-conic-gradient(#222 0% 25%, #444 0% 50%) 50% / 10px 10px`
              : (palette[materialIndex]?.color ?? 'magenta');

          return (
            <Box
              key={i}
              className={styles.cell}
              style={{
                background: color,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
