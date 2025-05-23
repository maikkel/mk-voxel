import { Box, Group, Input, Select } from '@mantine/core';
import { APP_BORDER_STYLE } from '../utils/styles';
import FrameBrowser from './timeline/FrameBrowser';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import CompactButton from './input/CompactButton';
import { ComboboxItem, ComboboxLikeRenderOptionInput } from '@mantine/core/lib/components/Combobox';

export function Timeline() {
  const animatioonOption = ({ option, checked }: ComboboxLikeRenderOptionInput<ComboboxItem>) => (
    <Group w='100%' gap={3}>
      {checked && <IconCheck size={14} />}
      <Box style={{ flex: 1 }} size={'xs'}>
        {option.label}
      </Box>
      <CompactButton icon={<IconTrash size={14} />} color='red' size='xs' />
    </Group>
  );
  return (
    <Group>
      <Group p={'xs'} pr={'xs'} align='center' gap='sm' style={{ borderRight: APP_BORDER_STYLE }}>
        <Input.Label htmlFor='animation-select' size={'xs'}>
          Animation
        </Input.Label>
        <Select
          size='xs'
          id='animation-select'
          placeholder='Animation'
          data={['default', 'animation_1', 'animation_2']}
          defaultValue='default'
          renderOption={animatioonOption}
          comboboxProps={{ width: 250, position: 'bottom-start', size: 'sm' }}
          maw={120}
        />
      </Group>
      <Box>
        <Group>
          <Input.Label htmlFor='frame-control' size={'xs'}>
            Frames
          </Input.Label>
          <FrameBrowser />
        </Group>
      </Box>
    </Group>
  );
}
