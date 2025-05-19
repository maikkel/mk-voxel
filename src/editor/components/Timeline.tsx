import { Box, Group, Input, Pagination, Select } from '@mantine/core';
import { APP_BORDER_STYLE } from '../utils/styles';
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from '@tabler/icons-react';

export function Timeline() {
  return (
    <Box p={0} style={{ borderBottom: APP_BORDER_STYLE }}>
      <Group>
        <Group p={'xs'} pr={'xs'} align='center' gap='sm' style={{ borderRight: APP_BORDER_STYLE }}>
          <Input.Label htmlFor='animation-select' size={'xs'}>
            Animation
          </Input.Label>
          <Select
            size='xs'
            id='animation-select'
            placeholder='Animation'
            data={['default', 'animation_2']}
            defaultValue='default'
          />
        </Group>
        <Box>
          <Group>
            <Input.Label htmlFor='frame-control' size={'xs'}>
              Frames
            </Input.Label>
            <Pagination
              withEdges
              nextIcon={IconArrowRight}
              previousIcon={IconArrowLeft}
              firstIcon={IconArrowBarToLeft}
              lastIcon={IconArrowBarToRight}
              dotsIcon={IconGripHorizontal}
              total={6}
              defaultValue={1}
              size={'sm'}
              gap={2}
            />
          </Group>
        </Box>
      </Group>
    </Box>
  );
}
