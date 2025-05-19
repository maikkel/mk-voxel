import { Animation } from '../../types/SpriteData';
import { createEmptyFrame } from './frame';

export function createEmptyAnimation(x: number, y: number, z: number, name: string): Animation {
  return {
    name: name,
    frameTime: 100,
    frames: [{ voxels: createEmptyFrame(x, y, z) }],
  };
}
