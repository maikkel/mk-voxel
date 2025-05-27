import React, { useRef, useState } from 'react';
import { Pagination, Portal } from '@mantine/core';
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconCopy,
  IconGripHorizontal,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useTimeout } from '@mantine/hooks';

import './frameBrowser.scss';
import CompactButton from '../input/CompactButton';
import { useEditorStore } from '../../store/useEditorStore';

export default function FrameBrowser() {
  const animationKey = useEditorStore((s) => s.currentAnimationKey);
  const animation = useEditorStore((s) => s.spriteData.animations[animationKey]);
  const frameIndex = useEditorStore((s) => s.currentFrameIndex);
  const setFrameIndex = useEditorStore((s) => s.setCurrentFrameIndex);
  const addFrame = useEditorStore((s) => s.addFrame);

  const [opened, setOpened] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isOverTrigger = useRef<boolean>(false);
  const isOverTooltip = useRef<boolean>(false);
  const page = useRef<number>(1);

  const { start: startTooltipTimeout, clear: clearTooltipTimeout } = useTimeout(() => {
    setOpened(isOverTrigger.current || isOverTooltip.current);
  }, 600);

  const onTriggerEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elPos = e.currentTarget.getBoundingClientRect();
    setPos({ x: elPos.left, y: elPos.top - 60 });
    clearTooltipTimeout();
    setOpened(true);
    isOverTrigger.current = true;
  };

  const onTriggerLeave = () => {
    startTooltipTimeout();
    isOverTrigger.current = false;
  };

  const onTooltipEnter = () => {
    clearTooltipTimeout();
    setOpened(true);
    isOverTooltip.current = true;
  };

  const onTooltipLeave = () => {
    startTooltipTimeout();
    isOverTooltip.current = false;
  };

  const handleDuplicate = () => {
    console.log('duplicate', page.current);
  };
  const handleAdd = (pos: number) => {
    console.log('add', pos);
    addFrame(animationKey, pos);
  };
  const handleDelete = () => {
    console.log('delete', page.current);
  };

  return (
    <>
      {opened && (
        <Portal target={document.body}>
          <div
            id={'timeline-tooltip'}
            onMouseEnter={onTooltipEnter}
            onMouseLeave={onTooltipLeave}
            style={{ top: pos.y, left: pos.x }}
          >
            <div className={'left'}>
              <CompactButton
                content={<IconPlus size={16} />}
                tooltip='Add Empty Frame'
                tooltipPosition='left'
                onClick={() => handleAdd(page.current - 1)}
              />
              <CompactButton
                content={<IconCopy size={16} />}
                tooltip='Duplicate Frame'
                tooltipPosition='left'
                onClick={handleDuplicate}
              />
              <div className={'pointer'}></div>
            </div>
            <div className={'right'}>
              <CompactButton
                content={<IconPlus size={16} />}
                tooltip='Add Empty Frame b'
                tooltipPosition='right'
                onClick={() => handleAdd(page.current)}
              />
              <CompactButton
                content={<IconCopy size={16} />}
                tooltip='Duplicate Frame'
                tooltipPosition='right'
                onClick={handleDuplicate}
              />
              <div className={'pointer'}></div>
            </div>

            <CompactButton
              content={<IconTrash size={16} />}
              color='red'
              className={'delete'}
              onClick={handleDelete}
            />
          </div>
        </Portal>
      )}

      <Pagination
        className={'pagination'}
        withEdges
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
        total={animation.frames.length}
        value={frameIndex + 1}
        size='md'
        gap={2}
        boundaries={100}
        siblings={100}
        onChange={(value) => {
          setFrameIndex(value - 1);
        }}
        getItemProps={(hoverPage) => ({
          style: { position: 'relative' },
          onMouseLeave: onTriggerLeave,
          onMouseOver: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            page.current = hoverPage;
            onTriggerEnter(e);
          },
        })}
      />
    </>
  );
}
