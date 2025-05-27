import {
  ActionIcon,
  type ActionIconVariant,
  type FloatingPosition,
  type MantineSize,
  Tooltip,
} from '@mantine/core';
import React from 'react';

type CompactButtonProps = {
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  tooltip?: string;
  tooltipPosition?: FloatingPosition;
  className?: string;
  size?: MantineSize;
  variant?: ActionIconVariant;
  style?: React.CSSProperties;
  disabled?: boolean;
  title?: string;
};

// Use forwardRef to pass ref to ActionIcon
const CompactButton = React.forwardRef<HTMLButtonElement, CompactButtonProps>(
  (
    {
      content,
      onClick,
      color,
      tooltip,
      tooltipPosition = 'top',
      className,
      size = 'sm',
      variant = 'filled',
      style,
      disabled = false,
      title,
    },
    ref
  ) => {
    const button = (
      <ActionIcon
        ref={ref}
        onClick={onClick}
        color={color}
        size={size}
        variant={variant}
        className={className}
        style={style}
        disabled={disabled}
        title={title}
      >
        {content}
      </ActionIcon>
    );

    return tooltip ? (
      <Tooltip label={tooltip} position={tooltipPosition} openDelay={200}>
        {/* div here breaks ref passing, wrap Tooltip instead */}
        <span>{button}</span>
      </Tooltip>
    ) : (
      button
    );
  }
);

export default CompactButton;
