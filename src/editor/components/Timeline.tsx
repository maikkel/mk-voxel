import { useState } from 'react';
import { Box, Group, Input, ScrollArea, Select, TextInput } from '@mantine/core';
import { IconCancel, IconCheck, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import CompactButton from './input/CompactButton';
import FrameBrowser from './timeline/FrameBrowser';
import { APP_BORDER_STYLE } from '../utils/styles';
import { useEditorStore } from '../store/useEditorStore';
import { ComboboxItem, ComboboxLikeRenderOptionInput } from '@mantine/core/lib/components/Combobox';

export function Timeline() {
  const animations = useEditorStore((s) => s.spriteData.animations);
  const currAnimKey = useEditorStore((s) => s.currentAnimationKey);
  const setCurrAnimKey = useEditorStore((s) => s.setCurrentAnimationKey);
  const addAnimation = useEditorStore((s) => s.addAnimation);
  const renameAnimation = useEditorStore((s) => s.renameAnimation);
  const removeAnimation = useEditorStore((s) => s.removeAnimation);

  const [mode, setMode] = useState<'select' | 'rename' | 'add'>('select');
  const [inputValue, setInputValue] = useState('');

  const animationOption = ({ option, checked }: ComboboxLikeRenderOptionInput<ComboboxItem>) => (
    <Group w='100%' gap={3}>
      {checked && <IconCheck size={14} />}
      <Box style={{ flex: 1 }} size='xs'>
        {option.label}
      </Box>
      {Object.keys(animations).length > 1 && !checked && (
        <CompactButton
          content={<IconTrash size={14} />}
          onClick={(e) => {
            e.stopPropagation();
            removeAnimation(option.value);
          }}
          color='red'
          size='xs'
        />
      )}
    </Group>
  );

  const apply = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (mode === 'rename') {
      renameAnimation(currAnimKey, trimmed);
    } else if (mode === 'add') {
      addAnimation(trimmed);
    }
    setCurrAnimKey(trimmed);

    setMode('select');
    setInputValue('');
  };

  return (
    <ScrollArea>
      <Group wrap={'nowrap'}>
        <Group
          p='xs'
          pr='xs'
          align='center'
          gap='sm'
          wrap={'nowrap'}
          style={{ borderRight: APP_BORDER_STYLE }}
        >
          <Input.Label htmlFor='animation-select' size='xs' style={{ textWrap: 'nowrap' }}>
            Animation
          </Input.Label>

          {mode === 'select' ? (
            <Select
              size='xs'
              id='animation-select'
              placeholder='Animation'
              value={currAnimKey}
              data={Object.keys(animations)}
              onChange={(value) => {
                if (value !== null) setCurrAnimKey(value);
              }}
              styles={{
                input: {
                  width: 120,
                },
              }}
              renderOption={animationOption}
              comboboxProps={{ width: 250, position: 'bottom-start', size: 'sm' }}
              maw={120}
            />
          ) : (
            <TextInput
              size='xs'
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') apply();
                if (e.key === 'Escape') setMode('select');
              }}
              maw={120}
              autoFocus
            />
          )}

          {mode === 'select' ? (
            <>
              <CompactButton
                tooltip='Rename Animation'
                content={<IconEdit size={14} />}
                onClick={() => {
                  setInputValue(currAnimKey);
                  setMode('rename');
                }}
                size='sm'
              />
              <CompactButton
                tooltip='Add Animation'
                content={<IconPlus size={14} />}
                onClick={() => {
                  setInputValue('');
                  setMode('add');
                }}
                size='sm'
              />
            </>
          ) : (
            <>
              <CompactButton
                tooltip='Apply'
                content={<IconCheck size={14} />}
                onClick={apply}
                size='sm'
                color='green'
              />
              <CompactButton
                tooltip='Cancel'
                content={<IconCancel size={14} />}
                onClick={() => {
                  setMode('select');
                  setInputValue('');
                }}
                size='sm'
                color='red'
              />
            </>
          )}
        </Group>

        <Box>
          <Group wrap={'nowrap'}>
            <Input.Label htmlFor='frame-control' size='xs' style={{ textWrap: 'nowrap' }}>
              Frames
            </Input.Label>
            <FrameBrowser />
          </Group>
        </Box>
      </Group>
    </ScrollArea>
  );
}
