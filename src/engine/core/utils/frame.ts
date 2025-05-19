import { MaterialKey } from '../../types/SpriteData';

export function createEmptyFrame(x: number, y: number, z: number): (MaterialKey | null)[][][] {
  return Array(z)
    .fill(null)
    .map(() =>
      Array(y)
        .fill(null)
        .map(() => Array(x).fill('r'))
    );
}
