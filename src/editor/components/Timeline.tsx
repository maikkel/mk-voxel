import { Box, Group, Input, Select } from '@mantine/core';
import { APP_BORDER_STYLE } from '../utils/styles';
import TimelineBrowser from './timeline/TimelineBrowser';

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
            <TimelineBrowser />
          </Group>
        </Box>
      </Group>
    </Box>
  );
}
