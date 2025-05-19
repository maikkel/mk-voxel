import { Box, Input, Text } from '@mantine/core';
import type { PropsWithChildren } from 'react';

interface FakeLabelProps {
  label: string;
}

export function FakeLabel({ label, children }: PropsWithChildren<FakeLabelProps>) {
  return (
    <Box>
      <Input.Label>{label}</Input.Label>
      {children}
    </Box>
  );
}
