import { Box } from '@mantine/core';
import Settings from './header/Settings';

export default function Header() {
  return (
    <>
      <Box style={{ flex: 1 }}>mkVoxel</Box>
      <Settings />
    </>
  );
}
