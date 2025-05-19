import { createBasePalette } from './palette';
import { createEmptyAnimation } from './animation';
import type { SpriteData } from '../../types/SpriteData';

export function createEmptySprite(
  id: number,
  name: string,
  x: number,
  y: number,
  z: number,
  defaultAnimationName = 'default'
): SpriteData {
  return {
    id,
    name,
    palette: createBasePalette(),
    dimensions: { x, y, z },
    frameTime: 100,
    animations: {
      [defaultAnimationName]: createEmptyAnimation(x, y, z, defaultAnimationName),
    },
  };
}

export function resizeFrameVoxels(
  oldColors: (string | null)[][][],
  newX: number,
  newY: number,
  newZ: number
): (string | null)[][][] {
  const resized: (string | null)[][][] = [];
  for (let z = 0; z < newZ; z++) {
    const layer: (string | null)[][] = [];
    for (let y = 0; y < newY; y++) {
      const row: (string | null)[] = [];
      for (let x = 0; x < newX; x++) {
        row.push(oldColors[z]?.[y]?.[x] ?? 'r');
      }
      layer.push(row);
    }
    resized.push(layer);
  }
  return resized;
}
