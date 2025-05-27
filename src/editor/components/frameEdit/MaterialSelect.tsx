import React from 'react';
import { APP_BORDER_STYLE } from '../../utils/styles';
import CompactButton from '../input/CompactButton';
import { Box } from '@mantine/core';
import { useEditorStore } from '../../store/useEditorStore';

import styles from './materialSelect.module.scss';
import clsx from 'clsx';

export default function MaterialSelect() {
  const palette = useEditorStore((s) => s.spriteData.palette);
  const materialIndex = useEditorStore((s) => s.currentMaterialIndex);
  const setMaterialIndex = useEditorStore((s) => s.setCurrentMaterialIndex);

  return (
    <Box
      p={'xs'}
      h='100%'
      className={styles.colorSelectBox}
      style={{
        borderRight: APP_BORDER_STYLE,
      }}
    >
      {Object.entries(palette)
        .filter(([key]) => Number(key) !== 0)
        .map(([key, mat]) => {
          const materialKey = Number(key);

          return (
            <CompactButton
              key={materialKey}
              title={mat.name || materialKey.toString()}
              tooltipPosition={'right'}
              size='md'
              color={mat.color ?? 'transparent'}
              onClick={() => setMaterialIndex(materialKey)}
              className={clsx(styles.colorButton, materialKey === materialIndex && styles.active)}
            />
          );
        })}
    </Box>
  );
}
