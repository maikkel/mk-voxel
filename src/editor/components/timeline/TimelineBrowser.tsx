import React, { useRef, useState } from 'react';
import { ActionIcon, Pagination, Portal, Tooltip } from '@mantine/core';
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
import CompactButton from '../input/CompactButton';

function TimelineBrowser() {
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
  const handleAdd = () => {
    console.log('add', page.current);
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
                icon={<IconPlus size={16} />}
                tooltip='Add Empty Frame'
                tooltipPosition='left'
                onClick={handleAdd}
              />
              <CompactButton
                icon={<IconCopy size={16} />}
                tooltip='Duplicate Frame'
                tooltipPosition='left'
                onClick={handleDuplicate}
              />
              <div className={'pointer'}></div>
            </div>
            <div className={'right'}>
              <CompactButton
                icon={<IconPlus size={16} />}
                tooltip='Add Empty Frame'
                tooltipPosition='right'
                onClick={handleAdd}
              />
              <CompactButton
                icon={<IconCopy size={16} />}
                tooltip='Duplicate Frame'
                tooltipPosition='right'
                onClick={handleDuplicate}
              />
              <div className={'pointer'}></div>
            </div>

            <CompactButton
              icon={<IconTrash size={16} />}
              tooltip='Delete Frame'
              tooltipPosition='bottom'
              color='red'
              className={'delete'}
              onClick={handleDelete}
            />
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

export default TimelineBrowser;
