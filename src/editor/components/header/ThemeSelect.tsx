import { Input, Select } from '@mantine/core';
import { useEditorStore } from '../../store/useEditorStore';

export function ThemeSelect() {
  const themeName = useEditorStore((s) => s.themeName);
  const setThemeName = useEditorStore((s) => s.setThemeName);

  return (
    <>
      <Input.Label htmlFor='animation-select' size={'xs'}>
        Theme
      </Input.Label>
      <Select
        value={themeName}
        onChange={(val) => val && setThemeName(val as 'blue' | 'black')}
        data={[
          { value: 'blue', label: 'Blue' },
          { value: 'black', label: 'Black' },
        ]}
        maw={100}
      />
    </>
  );
}
