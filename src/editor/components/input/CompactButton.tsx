import {
  ActionIcon,
  type ActionIconVariant,
  type FloatingPosition,
  type MantineSize,
  Tooltip,
} from '@mantine/core';
import React from 'react';

type CompactButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
  tooltip?: string;
  tooltipPosition?: FloatingPosition;
  className?: string;
  size?: MantineSize;
  variant?: ActionIconVariant;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export default function CompactButton({
  icon,
  onClick,
  color,
  tooltip,
  tooltipPosition = 'top',
  className,
  size = 'sm',
  variant = 'filled',
  style,
  disabled = false,
}: CompactButtonProps) {
  const button = (
    <ActionIcon
      onClick={onClick}
      color={color}
      size={size}
      variant={variant}
      className={className}
      style={style}
      disabled={disabled}
    >
      {icon}
    </ActionIcon>
  );

  return tooltip ? (
    <Tooltip label={tooltip} position={tooltipPosition} openDelay={200}>
      {button}
    </Tooltip>
  ) : (
    button
  );
}
