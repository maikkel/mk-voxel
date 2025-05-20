import { ActionIcon, type FloatingPosition, Tooltip } from '@mantine/core';
import React from 'react';

type CompactButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
  tooltip?: string;
  tooltipPosition?: FloatingPosition;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'filled' | 'outline' | 'light' | 'default' | 'subtle' | 'transparent';
};

export default function CompactButton({
  icon,
  onClick,
  color = 'blue',
  tooltip,
  tooltipPosition = 'top',
  className,
  size = 'sm',
  variant = 'filled',
}: CompactButtonProps) {
  const button = (
    <ActionIcon onClick={onClick} color={color} size={size} variant={variant} className={className}>
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
