import React from 'react';
import { Box, Group } from '@mantine/core';
import { useEditorStore } from '../../store/useEditorStore';
import { APP_BORDER_STYLE } from '../../utils/styles';

import styles from './sliceSlider.module.scss';
import { drawSlicePreview } from '../../utils/drawSlicePreview';

export default function SliceSlider() {
  const sliceIndex = useEditorStore((s) => s.currentSliceIndex);
  const setSliceIndex = useEditorStore((s) => s.setCurrentSliceIndex);
  const spriteDimensions = useEditorStore((s) => s.spriteData.dimensions);
  const animationKey = useEditorStore((s) => s.currentAnimationKey);
  const frameIndex = useEditorStore((s) => s.currentFrameIndex);
  const frame = useEditorStore((s) => s.spriteData.animations[animationKey].frames[frameIndex]);
  const palette = useEditorStore((s) => s.spriteData.palette);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _voxelVersion = useEditorStore((s) => s.voxelVersion); // triggers re-render

  const previewSize = (spriteDimensions.y * spriteDimensions.z) / 300;

  const thresholds = [
    { max: 0.15, scale: 5 },
    { max: 0.2, scale: 4 },
    { max: 0.275, scale: 3 },
    { max: 0.38, scale: 2 },
    { max: 0.65, scale: 1 },
  ];

  const previewScale = thresholds.find((t) => previewSize <= t.max)?.scale ?? 0;

  return (
    <>
      <Box
        // w={130}
        h={'100%'}
        p={'xs'}
        pt={'20'}
        className={styles.sliderBox}
        style={{
          borderLeft: APP_BORDER_STYLE,
        }}
      >
        <Group grow h={'100%'}>
          <Box
            h={'100%'}
            p={(spriteDimensions.z / 2) * previewScale - 10}
            className={styles.sliderInputBox}
          >
            <input
              type='range'
              min={0}
              max={spriteDimensions.y - 1}
              value={sliceIndex}
              onChange={(e) => setSliceIndex(Number(e.target.value))}
              list='markers'
              style={{
                writingMode: 'vertical-lr',
                direction: 'rtl', // ← flips 0 to bottom
                height: '100%',
                flex: 1,
              }}
            />
            <datalist id='markers'>
              {Array.from({ length: spriteDimensions.y }).map((_, i) => (
                <option key={i} value={i.toString()} />
              ))}
            </datalist>
          </Box>
          {previewScale > 0 && (
            <Box h={'100%'} className={styles.canvasBox}>
              {Array.from({ length: spriteDimensions.y }).map((_, i) => {
                const index = spriteDimensions.y - 1 - i;
                return (
                  <canvas
                    className={styles.slicePreview}
                    key={index}
                    height={spriteDimensions.z}
                    width={spriteDimensions.x}
                    onClick={() => setSliceIndex(index)}
                    style={{
                      outline: '2px solid var(--app-shell-border-color)',
                      outlineColor:
                        index == sliceIndex
                          ? 'var(--mantine-primary-color-filled)'
                          : 'var(--app-shell-border-color)',
                    }}
                    ref={(el) =>
                      drawSlicePreview(el, spriteDimensions, frame, index, palette, previewScale)
                    }
                  />
                );
              })}
            </Box>
          )}
        </Group>
        <Box fz={12} mt={5} ta={'left'}>
          Y: {sliceIndex}
        </Box>
      </Box>
    </>
  );
}
