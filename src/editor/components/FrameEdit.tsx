import React from 'react';
import { Box, Group } from '@mantine/core';
import { APP_BORDER_STYLE } from '../utils/styles';
import ColorSelect from './frameEdit/ColorSelect';
import SliceEdit from './frameEdit/SliceEdit';

export default function FrameEdit() {
  return (
    <Group h='100%' gap={0} preventGrowOverflow={true}>
      <Box h='100%' w={250} style={{ borderRight: APP_BORDER_STYLE }}>
        abc
      </Box>
      <ColorSelect />
      <SliceEdit />
    </Group>
  );
}
