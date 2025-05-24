import { Popover, Select } from '@mantine/core';
import React from 'react';
import CompactButton from '../input/CompactButton';
import { IconSettings } from '@tabler/icons-react';
import { type LayoutType, useEditorStore } from '../../store/useEditorStore';

export default function Settings() {
  const themeName = useEditorStore((s) => s.themeName);
  const setThemeName = useEditorStore((s) => s.setThemeName);
  const layout = useEditorStore((s) => s.layout);
  const setLayout = useEditorStore((s) => s.setLayout);

  return (
    <Popover position='bottom' withArrow shadow='md' trapFocus={false}>
      <Popover.Target>
        <CompactButton icon={<IconSettings size={20} />} size='lg' variant={'subtle'} />
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          label='Theme'
          value={themeName}
          onChange={(val) => val && setThemeName(val as 'blue' | 'black')}
          data={[
            { value: 'blue', label: 'Blue' },
            { value: 'grey', label: 'Grey' },
            { value: 'black', label: 'Black' },
          ]}
          comboboxProps={{ withinPortal: false }}
        />
        <Select
          label='Layout'
          value={layout}
          onChange={(val) => val && setLayout(val as LayoutType)}
          data={[
            { value: 'auto', label: 'Auto (by Aspect Ratio)' },
            { value: 'horizontal', label: 'Normal' },
            { value: 'vertical', label: 'Wide' },
          ]}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
