import { createBasePalette } from './palette';
import { createAnimation } from './animation';
import type { Dimensions, MaterialIndex, SpriteData } from '../../types/SpriteData';

export function createSprite(
  name: string,
  dims: Dimensions,
  defaultAnimationName = 'default'
): SpriteData {
  return {
    name,
    palette: createBasePalette(),
    dimensions: dims,
    frameTime: 100,
    animations: {
      [defaultAnimationName]: createAnimation(dims, defaultAnimationName),
    },
  };
}

export function resizeFrameVoxels(
  oldVoxels: Uint8Array,
  oldDims: Dimensions,
  newDims: Dimensions,
  fill: MaterialIndex = 0
): Uint8Array {
  const newVoxels = new Uint8Array(newDims.x * newDims.y * newDims.z).fill(fill);

  const minX = Math.min(oldDims.x, newDims.x);
  const minY = Math.min(oldDims.y, newDims.y);
  const minZ = Math.min(oldDims.z, newDims.z);

  for (let z = 0; z < minZ; z++) {
    for (let y = 0; y < minY; y++) {
      for (let x = 0; x < minX; x++) {
        const oldIndex = x + y * oldDims.x + z * oldDims.x * oldDims.y;
        const newIndex = x + y * newDims.x + z * newDims.x * newDims.y;
        newVoxels[newIndex] = oldVoxels[oldIndex];
      }
    }
  }

  return newVoxels;
}
