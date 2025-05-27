import React, { useCallback, useRef } from 'react';
import styles from './sliceEdit.module.scss';
import { Box } from '@mantine/core';
import { useEditorStore } from '../../store/useEditorStore';
import { useAspectFit } from '../../hooks/useAspectFit';

export default function SliceEdit() {
  const palette = useEditorStore((s) => s.spriteData.palette);
  const spriteDimensions = useEditorStore((s) => s.spriteData.dimensions);
  const animationKey = useEditorStore((s) => s.currentAnimationKey);
  const frameIndex = useEditorStore((s) => s.currentFrameIndex);
  const sliceIndex = useEditorStore((s) => s.currentSliceIndex);
  const setSliceIndex = useEditorStore((s) => s.setCurrentSliceIndex);
  const frame = useEditorStore((s) => s.spriteData.animations[animationKey].frames[frameIndex]);
  const currentMaterialIndex = useEditorStore((s) => s.currentMaterialIndex);
  const addStroke = useEditorStore((s) => s.addStroke);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _voxelVersion = useEditorStore((s) => s.voxelVersion); // triggers re-render

  const gridRef = useRef<HTMLDivElement>(null);
  const aspectRatio = spriteDimensions.x / spriteDimensions.z;
  useAspectFit(gridRef, aspectRatio);

  const strokeBuffer = useRef<{ x: number; y: number; z: number; material: number }[]>([]);

  const isPainting = useRef(false);

  const handleMouseDown = () => {
    isPainting.current = true;
  };
  const handleMouseUp = useCallback(() => {
    isPainting.current = false;
    if (strokeBuffer.current.length > 0) {
      addStroke(animationKey, frameIndex, strokeBuffer.current);
      strokeBuffer.current = [];
    }
  }, [addStroke, animationKey, frameIndex]);

  React.useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return (
    <Box className={styles.sliceGrid}>
      <Box
        className={styles.gridContainer}
        ref={gridRef}
        style={{
          ['--cols' as never]: spriteDimensions.x,
          ['--rows' as never]: spriteDimensions.z,
        }}
        onMouseDown={handleMouseDown}
        onContextMenu={(e) => e.preventDefault()}
        onWheel={(e) => {
          const delta = -Math.sign(e.deltaY); // 1 = scroll down, -1 = scroll up
          const next = Math.max(0, Math.min(spriteDimensions.y - 1, sliceIndex + delta));

          if (next !== sliceIndex) {
            setSliceIndex(next);
          }
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
              data-x={x}
              data-z={z}
              key={i}
              className={styles.cell}
              style={{ background: color }}
              onMouseDown={(e) => {
                isPainting.current = true;
                const material = e.button === 2 ? 0 : currentMaterialIndex;
                (e.target as HTMLElement).style.background =
                  material === 0
                    ? `repeating-conic-gradient(#222 0% 25%, #444 0% 50%) 50% / 10px 10px`
                    : (palette[material]?.color ?? 'magenta');
                strokeBuffer.current.push({ x, y: sliceIndex, z, material });
              }}
              onMouseEnter={(e) => {
                if (isPainting.current && e.buttons) {
                  const isRightClick = (e.buttons & 2) === 2;
                  const material = isRightClick ? 0 : currentMaterialIndex;
                  (e.target as HTMLElement).style.background =
                    material === 0
                      ? `repeating-conic-gradient(#222 0% 25%, #444 0% 50%) 50% / 10px 10px`
                      : (palette[material]?.color ?? 'magenta');
                  strokeBuffer.current.push({ x, y: sliceIndex, z, material });
                }
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}
