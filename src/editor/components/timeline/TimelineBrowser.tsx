import React, { useRef, useState } from 'react';
import { ActionIcon, Pagination, Portal } from '@mantine/core';
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

import './timelineBrowser.scss';

function TimelineBrowser() {
  const [opened, setOpened] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isOverTrigger = useRef<boolean>(false);
  const isOverTooltip = useRef<boolean>(false);

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

  return (
    <>
      {opened && (
        <Portal target={document.body}>
          <div
            id={'timeline-tooltip'}
            onMouseEnter={onTooltipEnter}
            onMouseLeave={onTooltipLeave}
            style={{ top: pos.y, left: pos.x, position: 'absolute' }}
          >
            <div className={'left'}>
              <ActionIcon className={'frameAction'} variant={'filled'} color='blue' size='sm'>
                <IconCopy size={16} />
              </ActionIcon>
              <ActionIcon className={'frameAction'} variant={'filled'} color='blue' size='sm'>
                <IconPlus size={16} />
              </ActionIcon>
              <div className={'pointer'}></div>
            </div>
            <div className={'right'}>
              <ActionIcon className={'frameAction'} variant={'filled'} color='blue' size='sm'>
                <IconCopy size={16} />
              </ActionIcon>
              <ActionIcon className={'frameAction'} variant={'filled'} color='blue' size='sm'>
                <IconPlus size={16} />
              </ActionIcon>
              <div className={'pointer'}></div>
            </div>

            <ActionIcon className={'frameAction delete'} variant={'filled'} color='red' size='sm'>
              <IconTrash size={16} />
            </ActionIcon>
          </div>
        </Portal>
      )}

      <Pagination
        withEdges
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
        total={6}
        defaultValue={1}
        size='md'
        gap={2}
        getItemProps={(page) => ({
          style: { position: 'relative' },
          onMouseLeave: onTriggerLeave,
          onMouseOver: onTriggerEnter,
        })}
      />
    </>
  );
}

export default TimelineBrowser;
